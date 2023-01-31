import * as moment from 'moment';

export const formattedPrice = (price: number) => {
  return price.toLocaleString('ko-KR')
}

export const convertDateToSimple = (date: string | undefined) => {
  if (moment().diff(moment.utc(date), 'minute') < 2) {
    return '방금 전'
  } else if (moment().diff(moment.utc(date), 'day') >= 1) {
    return `${moment().diff(moment.utc(date), 'day')}일 전`
  } else if (moment().diff(moment.utc(date), 'hour') >= 1) {
    return `${moment().diff(moment.utc(date), 'hour')}시간 전`
  } else {
    return `${moment().diff(moment.utc(date), 'minute')}분 전`
  }
}

export const pad = (num: number, size: number): string => {
  let s = num + ''
  while (s.length < size) s = '0' + s
  return s
}
