//在这个文件里面创建服务器
//在这里面写服务器的相关代码
const http = require("http");
const serverHandler = require("../app.js");
const PORT = 8080;


const server = http.createServer(serverHandler);


server.listen(PORT, () => {
    console.log("server Running at PORT 8080");
})