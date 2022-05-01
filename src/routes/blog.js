// 在这里对我们的路由来进行处理然后暴露给我们的逻辑处理代码
//在这个方法里面初始化路由
const { getBlogList, getBlogDetail, createBlog, updateBlog, deleteBlog } = require("../controler/method");
const { SuccessModel, FailModel } = require("../model/model");


const handleBlogRoute = (req, res) => {
    const author = req.query.author;
    const keyword = req.query.keyword;
    const id = req.query.id;
    const postdata = req.PostData;
    if (req.method == "GET" && req.path == "/api/blog/list") {
        //获取列表数据
        const listDataPromise = getBlogList(author, keyword).then(listData => {
            return new SuccessModel(listData);
        });
        return listDataPromise;

    }

    if (req.method == "GET" && req.path == "/api/blog/detail") {
        const detailDataPromise = getBlogDetail(id).then(detailData => {
            return new SuccessModel(detailData);
        });

        return detailDataPromise;
    }

    if (req.method == "POST" && req.path == "/api/blog/new") {
        const author = "Hfour9";
        req.postdata.author = author;

        const createBlogPromise = createBlog(req.postdata).then(createBlogData => {
            return new SuccessModel(createBlogData);
        });
        return createBlogPromise;
    }

    if (req.method == "POST" && req.path == "/api/blog/update") {
        const updateBlogDataPromise = updateBlog(id, postdata)

        return updateBlogDataPromise.then(updateBlogData => {
            if (updateBlogData) {
                return new SuccessModel("更新成功辣！")
            } else {
                return new FailModel("更新失败，所更新博客不存在")
            }
        });
    }

    if (req.method == "POST" && req.path == "/api/blog/delete") {
        const author = "Hfour9"
        const deleteBlogDataPromise = deleteBlog(id, author);

        return deleteBlogDataPromise.then(deleteBlogData => {
            if (deleteBlogData) {
                return new SuccessModel("删除成功辣！")
            } else {
                return new FailModel("删除失败，所删除博客不存在")
            }
        });
    }
}


module.exports = handleBlogRoute;