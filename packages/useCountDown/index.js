import { ref, computed } from 'vue-demi'
import { isSameSecond, parseTimeData, parseFormat } from './utils.js'

export function useCountDown(time, options = {}) {
  const { format = 'HH:mm:ss', autoStart = false, onChange = () => {}, onFinish = () => {} } = options || {}

  const remain = ref(+time)
  let counting = false
  let endTime = 0
  let rafId = null

  const currentTime = computed(() => parseTimeData(remain.value))
  const formattedTime = computed(() => parseFormat(format, currentTime.value))

  const start = () => {
    if (counting) {
      return
    }
    counting = true
    endTime = Date.now() + remain.value
    tick()
  }
  const pause = () => {
    counting = false
    cancelAnimationFrame(rafId)
  }
  const reset = newTime => {
    pause()
    remain.value = +newTime || +time
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

      if (!isSameSecond(newRemain, remain.value) || newRemain === 0) {
        updateRemain(newRemain)
      }

      if (remain.value > 0) {
        tick()
      }
    })
  }
  const updateRemain = newRemain => {
    remain.value = newRemain
    onChange(currentTime.value)
    if (remain === 0) {
      pause()
      onFinish()
    }
  }

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
