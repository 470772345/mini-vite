const Koa = require("Koa")
const fs = require("fs")
const path = require("path")
const app = new Koa()
// vite 起一个静态文件服务器
// 控制台查看,esmodule方式每次请求 都会有一个请求
// 参考 https://www.bilibili.com/video/BV1Df4y1n777?p=2&spm_id_from=pageDriver
// 解决 引入第三库问题
// 解决 css 加载问题
// 
app.use(async (ctx)=> {
  // console.log('ctx-->',ctx)
  const { url , query} = ctx.request
  console.log("url==>",url)
  console.log("query",query)
  // index.html
  if(url === "/"){
    ctx.type = "text/html"
    // TOFIXED: 用vscode 调试的 出现路径错误 ???
    // 在ming64 终端打开正常   ???
    const entryP = path.resolve(__dirname,'index.html')
    let content1 =  fs.readFileSync(entryP,"utf-8")
    content1 = content1.replace('<script',`
      <script >
      window.process ={ 
        env: { 
        NODE_ENV : 'dev'
      }
      }
      </script>
      <script `
  )
    ctx.body =  content1
  }
  // *.js
  else if (url.endsWith('.js')){
     const p = path.resolve(__dirname,url.slice(1)) 
     // 绝对路径
    
     console.log("js path-->",p)
     const content = fs.readFileSync(p,"utf-8")
     ctx.type = "application/javascript"
     ctx.body =  rewriteImport(content)
  }
  // 第三库支持
  else if(url.startsWith('/@modules')){

    // @module_nodules/vue => 代码的位置/node_modules/vue/  的es模块入口
    //   "module": "dist/vue.runtime.esm-bundler.js",
    // 读取package.json  入口 
    console.log('__dirname,',__dirname)
    // windows下  要转下 
    // const dirname = __dirname.replace(/\\/g,'/')
    // console.log(dirname,'dirname')
    // let  url = "/@modules/vue"
    let moduleP = url.replace('/@modules/',"")
    console.log('moduleP-->',moduleP)
    const prefix = path.resolve(
      __dirname,
      'node_modules',
      moduleP)
      console.log("prefix -->",prefix)
    // vue 模块的 module 属性
    const module = require(prefix+'/package.json').module
    // const module = require('D:/Apro/socket/vite/node_modules/vue/package.json').module
    // D:\Apro\socket\vite\node_modules\vue\package.json
    console.log(module,'module')
    const p = path.resolve(prefix,module)
    console.log("vue-- path-->",p)
    let ret = fs.readFileSync(p,'utf-8')
    ctx.type = "application/javascript"
    ret =  rewriteImport(ret)
    ctx.body =  ret
    // (process.env.NODE_ENV !== 'production') 报错,因为没有process
    // process 
  }

  function rewriteImport(content){
      return content.replace(/ from ['|"]([^'"]+)['|"]/g ,function($0,$1){
         console.log('$0--->',$0)
         console.log('$1--->',$1)
         // 是 ./ ../ / 路径吗
      
         if($1[0] !== "." && $1[1] !== "/"){
             return `from '/@modules/${$1}'`
         }else {
           return $0
         }
      })
  }



})

app.listen(3333,()=>{
  console.log("vite listen on 3333")
})