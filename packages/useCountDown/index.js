import { ref } from 'vue-demi'
import { isSameSecond, parseTimeData, parseFormat } from './utils.js'

export function useCountDown(time, options = {}) {
  const { format = 'HH:mm:ss', autoStart = false, onChange = () => {}, onFinish = () => {} } = options || {}

  let counting = false
  let remain = +time
  let endTime = 0
  let rafId = null

  const currentTime = ref({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
  const formattedTime = ref('')

  const start = () => {
    if (counting) {
      return
    }
    counting = true
    endTime = Date.now() + remain
    tick()
  }
  const pause = () => {
    counting = false
    cancelAnimationFrame(rafId)
  }
  const reset = newTime => {
    pause()
    remain = +newTime || +time
    updateTime()
    if (autoStart) {
      start()
    }
  }

  const tick = () => {
    rafId = requestAnimationFrame(() => {
      if (!counting) {
        return
      }
      const newRemain = Math.max(endTime - Date.now(), 0)

      if (!isSameSecond(newRemain, remain) || newRemain === 0) {
        updateRemain(newRemain)
      }

      if (remain > 0) {
        tick()
      }
    })
  }
  const updateRemain = newRemain => {
    remain = newRemain
    updateTime()
    onChange(currentTime.value)
    if (remain === 0) {
      pause()
      onFinish()
    }
  }
  const updateTime = () => {
    currentTime.value = parseTimeData(remain)
    formattedTime.value = parseFormat(format, currentTime.value)
  }

  updateTime()
  if (autoStart) {
    start()
  }

  return {
    start,
    pause,
    reset,
    currentTime,
    formattedTime
  }
}
