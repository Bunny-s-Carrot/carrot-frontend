import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { convertUTMKToWgs84 } from '@carrot/util/coords';
import {
  convertAreaToDistance,
  convertAreaToLevel,
} from '../../infra/location/convertArea';

import SGISApi from '../../api/sgis';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userApi from '../../api/user';
import useJwtDecode from '../../hooks/auth/useJwtDecode';
import useMap from '../../hooks/map/useMap';
import theme from '@carrot/core/style/theme';
import {
  getArea1,
  getArea2,
  setActiveLocation,
  setActiveLocationId,
  setAdmCodes,
  setArea2,
} from '../../infra/location/locationData';

interface IPath {
  0: any
  1: any
  2: any
  3: any
}

const useSetLocationViewModel = () => {
  const [activeLocationAsNumber, setActiveLocationAsNumber] = useState(0);
  const [area, setArea] = useState(
    activeLocationAsNumber === 0 ? getArea1() : getArea2(),
  );
  const [count, setCount] = useState(0);
  const [paths, setPaths] = useState<IPath>({
    0: null,
    1: null,
    2: null,
    3: null,
  })
  const [coordsToRender, setCoordsToRender] = useState<IPath>({
    0: null,
    1: null,
    2: null,
    3: null,
  });
  const polygonRef = useRef<any>(null)
  const navigate = useNavigate();
  const { getId } = useJwtDecode();
  const queryClient = useQueryClient();

  const { map, drawMap, destroyMap, rendered } = useMap();

  const user_id = useMemo(() => getId(), [getId]);

  const updateArea = (e: StorageEvent) => {
    setArea(parseInt(e.newValue!));
  };

  useEffect(() => {
    window.addEventListener('storage', updateArea);

    return () => {
      window.removeEventListener('storage', updateArea);
    };
  }, []);

  const { data, isSuccess } = useQuery([`user/${user_id}/location`], () =>
    userApi.getLocationById(user_id),
  );

  const locationData = useMemo(() => data?.payload, [data]);
  const locationInfo = locationData?.location_info;
  const locationInfo2 = locationData?.location_info2;

  const updateActiveLocation = useMutation(userApi.updateActiveLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries([`user/${user_id}/location`]);
    },
  });

  const updateLocation = useMutation(userApi.updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries([`user/${user_id}/location`]);
    },
  });

  const deleteLocation = useMutation(userApi.deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries([`user/${user_id}/location`]);
    },
  });

  const handleClickBoxLeft = () => {
    if (locationData?.active_location === 1) {
      setActiveLocation(locationInfo!.addr_name);
      setActiveLocationAsNumber(0);
      setActiveLocationId(locationInfo!.location_id);
      setArea(getArea1());
      updateActiveLocation.mutate({
        user_id,
        bit: 0,
      });
    }
  };

  const handleClickBoxRight = () => {
    if (locationData?.active_location === 0) {
      setActiveLocation(locationInfo2!.addr_name);
      setActiveLocationAsNumber(1);
      setActiveLocationId(locationInfo2!.location_id);
      setArea(getArea2());
      updateActiveLocation.mutate({
        user_id,
        bit: 1,
      });
    }
  };

  const handleClickAddLocation = () => {
    setActiveLocationAsNumber(1);
    if (!locationData?.location_info2) {
      setArea2(0);
      navigate('/findlocation', { state: { from: 'setlocation' } });
    }
  };

  const handleClickDeleteLocation = (isLeft: boolean) => {
    if (isLeft) {
      if (!locationInfo2) {
      } else {
        setActiveLocation(locationInfo2!.addr_name);
        setActiveLocationId(locationInfo2!.location_id);
        setActiveLocationAsNumber(0);
        updateLocation.mutate({
          user_id,
          location: locationInfo2.location_id,
          key: 1,
        });

        updateActiveLocation.mutate({
          user_id,
          bit: 0,
        });

        deleteLocation.mutate({
          user_id,
          key: 2,
        });
      }
    } else {
      setActiveLocation(locationInfo!.addr_name);
      setActiveLocationId(locationInfo!.location_id);
      setActiveLocationAsNumber(0);
      updateActiveLocation.mutate({
        user_id,
        bit: 0,
      });

      deleteLocation.mutate({
        user_id,
        key: 2,
      });
    }
  };

  const selectCoords = useCallback((): number[] => {
    let xCoord =
      locationData?.active_location === 0
        ? locationData?.location_info?.x_coord
        : locationData?.location_info2?.x_coord;
    let yCoord =
      locationData?.active_location === 0
        ? locationData?.location_info?.y_coord
        : locationData?.location_info2?.y_coord;

    return [xCoord!, yCoord!];
  }, [
    locationData?.active_location,
    locationData?.location_info?.x_coord,
    locationData?.location_info?.y_coord,
    locationData?.location_info2?.x_coord,
    locationData?.location_info2?.y_coord,
  ]);

  const handlePaths = useCallback(async (area: number) => {
    if (paths[area as keyof IPath]) {
      return paths[area as keyof IPath]
    }
    const [xCoord, yCoord] = selectCoords();
    const minX = String(xCoord - convertAreaToDistance(area));
    const maxX = String(xCoord + convertAreaToDistance(area));
    const minY = String(yCoord - convertAreaToDistance(area));
    const maxY = String(yCoord + convertAreaToDistance(area));

    try {
      const accessToken = (await SGISApi.getAccessToken()).data.result
        .accessToken;
      const response = await SGISApi.getBoundaryInArea(
        minX,
        minY,
        maxX,
        maxY,
        accessToken,
      );
      const pathList = response?.data.features.map((item: any) => {
        return item;
      });
      setPaths((prev: any) => {return { ...prev, [area]: pathList}})
      setCount(pathList.length);
      return pathList
    } catch (e: any) {
      throw Error(e)
    }
  }, [paths, selectCoords])

  const getArray = async (area: number) => {
      if (coordsToRender[area as keyof IPath]) {
        return coordsToRender[area as keyof IPath]
      }
      const array: any = [];
      const admCodes: string[] = [];
      const pathList = await handlePaths(area)
      pathList.map((item: any) => {
        admCodes.push("'" + item.properties?.adm_cd + "'");
    
        array.push(
          item.geometry.coordinates.map((coordList: any) =>
            coordList.map((coords: any) => {
              coords[0] = coords[0].length > 1 ? coords[0][0] : coords[0];
              coords[1] = coords[1].length > 1 ? coords[1][1] : coords[1];
              const [lng, lat] = convertUTMKToWgs84(
                parseFloat(coords[0].toFixed(6)),
                parseFloat(coords[1].toFixed(6)),
              );
              return [lng, lat];
            }),
          ),
        );
        setCoordsToRender((prev) => ({ ...prev, [area]: array }))
        return array
      });
      setAdmCodes(admCodes);
      return array
  };

  useLayoutEffect(() => {
    if (area === 0 || area === 1 || area === 2 || area === 3) {
      destroyMap()
      const coords: any =
        isSuccess && convertUTMKToWgs84(selectCoords()[0], selectCoords()[1]);
      drawMap(coords[1], coords[0], convertAreaToLevel(area), false);

    }
  }, [area, destroyMap, drawMap, isSuccess, selectCoords])

  useLayoutEffect(() => {
    if (area === 0 || area === 1 || area === 2 || area === 3) {
      polygonRef.current = null
      if (rendered && !polygonRef.current) {
        const paths: any[] = []
        getArray(area)?.then((array) => {
          for (const item of array) {
            for (const path of item) {
              paths.push(path)
            }
          }
          polygonRef.current = new window.naver.maps.Polygon({
              map: map.current,
              paths,
              fillColor: theme.colors.carrot,
              fillOpacity: 0.4,
              strokeOpacity: 0,
            });
        })
        
      } 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, isSuccess, map, rendered]);

  return {
    locationData,
    isSuccess,
    activeLocationAsNumber,
    count,
    area,
    handleClickBoxLeft,
    handleClickBoxRight,
    handleClickAddLocation,
    handleClickDeleteLocation,
  };
};

export default useSetLocationViewModel;
