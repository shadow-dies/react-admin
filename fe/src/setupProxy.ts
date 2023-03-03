import { createProxyMiddleware } from "http-proxy-middleware";
module.exports = function (app: any) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3001", // 后台服务地址以及端口号
            changeOrigin: true, // 是否开启代理
            pathRewrite: {
                "/api": "", // 代理名称
            },
        })
    );
}