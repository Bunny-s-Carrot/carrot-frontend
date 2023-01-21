import { fileApi } from "../../infra/api"

type ImageType = {
  image: File[]
}

const postImages = async ({ image }: ImageType) => {
  try {
    const response = await fileApi.post(`images/upload`,
      image,
    )

    return response;
  } catch (e: any) {
    throw Error(e);
  }
}

export { postImages }