# mini-vite
mini-vite

## 总结
```js

参考: https://juejin.cn/post/6994224541312483336

1 Commonjs 和 Es Module 有什么区别 ？
2 Commonjs 如何解决的循环引用问题 ？
3 既然有了 exports，为何又出了 module.exports? 既生瑜，何生亮 ？
4 require 模块查找机制 ？
5 Es Module 如何解决循环引用问题 ？
6 exports = {} 这种写法为何无效 ？
7 关于 import() 的动态引入 ？
8 Es Module 如何改变模块下的私有变量 ？

目前 commonjs 广泛应用于以下几个场景：
  Node 是 CommonJS 在服务器端一个具有代表性的实现；
  Browserify 是 CommonJS 在浏览器中的一种实现；
  webpack 打包工具对 CommonJS 的支持和转换；也就是前端应用也可以在编译之前，尽情使用 CommonJS 进行开发。


1.vite 用的esmodule 模块方式, 其开了一个文件服务器.每个<scrpit type='module'>加载都会发起一个请求.
  而webpack 是从入口就开始分析每个文件的模块依赖,生成依赖图.然后在自运行模块模拟加载require, eval执行文件.(在 Commonjs 规范下模块中，会形成一个包装函数，我们写的代码将作为包装函数的执行上下文，使用的 require ，exports ，module 本质上是通过形参的方式传递到包装函数中的。)
2. commjs imports 导出是值的拷贝,而 esmodule 的expot 导出的是 值的引用 ,不能修改improt 导入的属性
3. 
4. 借助 Es Module 的静态导入导出的优势，实现了 tree shaking
5. Es Module 还可以 import() 懒加载方式实现代码分割。
6. 动态导入
const promise = import('module')
import('module')，动态导入返回一个 Promise。为了支持这种方式，需要在 webpack 中做相应的配置处理

7.ES6 module 一些重要特性。1 静态语法 2.不能修改import导入的属性 

8 Commonjs 总结

Commonjs 的特性如下：

CommonJS 模块由 JS 运行时实现。
CommonJs 是单个值导出，本质上导出的就是 exports 属性。
CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
CommonJS 模块同步加载并执行模块文件。
es module 总结

Es module 的特性如下：

ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时。
ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
ES6 模块提前加载并执行模块文件，
ES6 Module 导入模块在严格模式下。
ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。

```