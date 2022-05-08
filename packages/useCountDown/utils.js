var SECOND = 1000
var MINUTE = 60 * SECOND
var HOUR = 60 * MINUTE
var DAY = 24 * HOUR
export function parseTimeData(time) {
  var days = Math.floor(time / DAY)
  var hours = Math.floor((time % DAY) / HOUR)
  var minutes = Math.floor((time % HOUR) / MINUTE)
  var seconds = Math.floor((time % MINUTE) / SECOND)
  var milliseconds = Math.floor(time % SECOND)
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  }
}
function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2
  }

  var str = num + ''

  while (str.length < targetLength) {
    str = '0' + str
  }

  return str
}
/* 
  格式	说明
  DD	天数
  HH	小时
  mm	分钟
  ss	秒数
  S	毫秒（1 位）
  SS	毫秒（2 位）
  SSS	毫秒（3 位）
*/
export function parseFormat(format, timeData) {
  var days = timeData.days
  var hours = timeData.hours,
    minutes = timeData.minutes,
    seconds = timeData.seconds,
    milliseconds = timeData.milliseconds

  if (format.indexOf('DD') === -1) {
    hours += days * 24
  } else {
    format = format.replace('DD', padZero(days))
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60
  } else {
    format = format.replace('HH', padZero(hours))
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60
  } else {
    format = format.replace('mm', padZero(minutes))
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000
  } else {
    format = format.replace('ss', padZero(seconds))
  }

  if (format.indexOf('S') !== -1) {
    var ms = padZero(milliseconds, 3)

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms)
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2))
    } else {
      format = format.replace('S', ms.charAt(0))
    }
  }

  return format
}
export function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}
