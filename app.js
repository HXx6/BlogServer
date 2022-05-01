//在这里面写服务器的业务处理代码
//一般我们会把一个逻辑的处理交给一个模块去进行，即一个函数一个动作或者说是一个类
//在这个文件中我们主要完成的是参数的配置功能
const handleBlogRoute = require("./src/routes/blog");
const querystring = require("querystring");
const { getPostData } = require("./src/controler/method");

const serverHandler = (req, res) => {
    //在响应头中设置我们的响应体的数据类型
    res.setHeader("content-type", "application/json");

    //将请求的路由作为属性设置到请求对象中
    req.path = req.url.split("?")[0];
    //将请求的参数作为属性设置到请求对象中
    req.query = querystring.parse(req.url.split("?")[1]);

    //在获得到了所有的POST数据之后再进行路由的设置
    getPostData(req).then(PostDate => {
        req.PostDate = PostDate;
        const blogDataPromise = handleBlogRoute(req, res);
        if (blogDataPromise) {
            blogDataPromise.then(blogData => {
                res.end(JSON.stringify(blogData));
            })
        } else {
            res.status = 404;
            res.setHeader("content-type", "text/plain");
            res.end("404 Not Found");
        }
    })

}

module.exports = serverHandler;