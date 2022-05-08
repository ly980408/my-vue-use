<script setup>
  import { useCountDown } from '.'
  const { formattedTime, start, pause, reset } = useCountDown(10000, {
    onChange: time => {
      console.log('count down', time)
    },
    onFinish: () => {
      console.log('finish')
    }
  })
</script>

<template>
  <h3>useCountDown</h3>
  <div>{{ formattedTime }}</div>
  <button @click="start">start</button>
  <button @click="pause">pause</button>
  <button @click="reset">reset</button>
</template>
