// import { str } from "./moduleA.js"

// console.log('str--',str)


// 支持第三库
// 不是一个路径,vue 是个包名 浏览器找不到.
// Uncaught TypeError: Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".
// 
// 所以 我们重新拼写路径 类似 '/@module/vue' 以 / 开头
import { createApp , h} from 'vue'
const app = {
      render(){
          return h(
            "div",null,[
              h("div",null,String('hellw vite '))
            ]
          )
      }
}


createApp(app).mount('#app')