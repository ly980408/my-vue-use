// import { defineComponent, reactive, h } from 'vue-demi'
// import { useCountDown } from '.'

// export const UseCountDown = defineComponent({
//   name: 'UseCountDown',
//   props: ['time'],
//   emits: ['change', 'finish'],
//   setup(props, { slots, emit }) {
//     const data = reactive(
//       useCountDown(props.time, {
//         onChange: time => {
//           emit('change', time)
//         },
//         onFinish: () => {
//           emit('finish')
//         }
//       })
//     )

//     return () => {
//       if (slots.default) {
//         return h('div', [slots.default(data), h('button', { onclick: data.start }, 'start')])
//       }
//     }
//   }
// })
