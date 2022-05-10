import { ref, computed } from "vue";
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function parseTimeData(time) {
  var days = Math.floor(time / DAY);
  var hours = Math.floor(time % DAY / HOUR);
  var minutes = Math.floor(time % HOUR / MINUTE);
  var seconds = Math.floor(time % MINUTE / SECOND);
  var milliseconds = Math.floor(time % SECOND);
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }
  var str = num + "";
  while (str.length < targetLength) {
    str = "0" + str;
  }
  return str;
}
function parseFormat(format, timeData) {
  var days = timeData.days;
  var hours = timeData.hours, minutes = timeData.minutes, seconds = timeData.seconds, milliseconds = timeData.milliseconds;
  if (format.indexOf("DD") === -1) {
    hours += days * 24;
  } else {
    format = format.replace("DD", padZero(days));
  }
  if (format.indexOf("HH") === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace("HH", padZero(hours));
  }
  if (format.indexOf("mm") === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace("mm", padZero(minutes));
  }
  if (format.indexOf("ss") === -1) {
    milliseconds += seconds * 1e3;
  } else {
    format = format.replace("ss", padZero(seconds));
  }
  if (format.indexOf("S") !== -1) {
    var ms = padZero(milliseconds, 3);
    if (format.indexOf("SSS") !== -1) {
      format = format.replace("SSS", ms);
    } else if (format.indexOf("SS") !== -1) {
      format = format.replace("SS", ms.slice(0, 2));
    } else {
      format = format.replace("S", ms.charAt(0));
    }
  }
  return format;
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
}
function useCountDown(time, options = {}) {
  const { format = "HH:mm:ss", autoStart = false, onChange = () => {
  }, onFinish = () => {
  } } = options || {};
  const remain = ref(+time);
  let counting = false;
  let endTime = 0;
  let rafId = null;
  const currentTime = computed(() => parseTimeData(remain.value));
  const formattedTime = computed(() => parseFormat(format, currentTime.value));
  const start = () => {
    if (counting) {
      return;
    }
    counting = true;
    endTime = Date.now() + remain.value;
    tick();
  };
  const pause = () => {
    counting = false;
    cancelAnimationFrame(rafId);
  };
  const reset = (newTime) => {
    pause();
    remain.value = +newTime || +time;
    if (autoStart) {
      start();
    }
  };
  const tick = () => {
    rafId = requestAnimationFrame(() => {
      if (!counting) {
        return;
      }
      const newRemain = Math.max(endTime - Date.now(), 0);
      if (!isSameSecond(newRemain, remain.value) || newRemain === 0) {
        updateRemain(newRemain);
      }
      if (remain.value > 0) {
        tick();
      }
    });
  };
  const updateRemain = (newRemain) => {
    remain.value = newRemain;
    onChange(currentTime.value);
    if (remain === 0) {
      pause();
      onFinish();
    }
  };
  if (autoStart) {
    start();
  }
  return {
    start,
    pause,
    reset,
    currentTime,
    formattedTime
  };
}
export { useCountDown };
