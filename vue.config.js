// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require("path");
let root;
if (process.env.NODE_ENV === "production") {
  //生产环境 (如需代理，可在下面配置，如不需要，屏蔽下面配置)
  root = "http://172.19.0.24:9522/api";
} else {
  // root = 'http://10.241.94.208:30099'
  root = "http://172.19.0.24:9522/api";
}

module.exports = {
  // 基本路径
  publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
      console.log(config)
    // config.resolve.alias.set("@", resolve("src"));
    config.entry("app").add("@babel/polyfill");
    config.module

      .rule("md")

      .test(/\.md$/)

      .use("html-loader")

      .loader("html-loader")

      .end()

      .use("markdown-loader")

      .loader("markdown-loader")

      .end()
    // config.entry("app").add("@babel/polyfill");
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV !== "production") return;
    return {
      plugins: [
        // new PrerenderSPAPlugin({
        //     // 生成文件的路径，也可以与webpakc打包的一致。
        //     // 下面这句话非常重要！！！
        //     // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        //     staticDir: path.join(__dirname,'dist'),
        //     // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        //     routes: ['/', '/search','/anitSearch'],
        //     // 这个很重要，如果没有配置这段，也不会进行预编译
        //     renderer: new Renderer({
        //         inject: {
        //             foo: 'bar'
        //         },
        //         headless: false,
        //         // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
        //         renderAfterDocumentEvent: 'render-event'
        //     })
        // }),
      ],
    };
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    overlay: {
      errors: true, //webpack在编译的时候如果出现了错误，可以在网页上显示
    },
    hot: true, //热加载
    open: true, //配置自动启动浏览器
    host: "127.0.0.1",
    port: 6688, // 端口号
    https: false,
    hotOnly: false, // https:{type:Boolean}
    // proxy: null,                                // 设置代理
    // proxy: 'http://172.19.0.24:9522',         // 配置跨域处理,只有一个代理
    // eslint-disable-next-line no-dupe-keys
    proxy: {
      // 配置多个代理
      "/api": {
        //设置你调用的接口域名和端口号 别忘了加http
        target: root,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/", //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，
          //直接写‘/api/user/add’即可
        },
      },
    },
    // eslint-disable-next-line no-unused-vars
    before: (app) => {},
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
};
