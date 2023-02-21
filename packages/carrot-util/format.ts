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

export const convertLocalStringToSimple = (date: string) => {
  let arry = date.split('. ');
  let timearry = arry[3].split(' ')[1].split(':');
  let hour;
  
  if (arry[3].split(' ')[0] === '오후') {
    hour = parseInt(timearry[0]) + 12;
  } else {
    hour = timearry[0];
  }

  const DateTime = `${arry[0]}-${arry[1]}-${arry[2]} ${hour}:${timearry[1]}:${timearry[2]}`

  return DateTime;
}

export const chatDateToSimple = (date:string) => {
  const recenttime = moment(convertLocalStringToSimple(date));
  const timenow = moment(convertLocalStringToSimple(new Date().toLocaleString()));
  const result = moment.duration(timenow.diff(recenttime))['_data'];
  
  if (result.years >= 1) {
    return `${result.years}년 전`
  } else if (result.months >= 1) {
    return `${result.months}달 전`
  } else if (result.days >= 1) {
    return `${result.days}일 전`
  } else if (result.hours >= 1) {
    return `${result.hours}시간 전`
  } else if (result.minutes >= 1) {
    return `${result.minutes}분 전`
  } else {
    return '1분 전'
  }
}