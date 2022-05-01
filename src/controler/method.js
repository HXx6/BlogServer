//在这里定义了我们的blog的一些方法
const { execSQL } = require("../db/mysql");




// 获取为POST类型的请求的请求数据
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        //判断是否为POST请求
        if (req.method != "POST") {
            resolve({});
        }
        //判断请求体中数据是否为JSON格式的数据集
        if (req.headers["content-type"] != "application/json") {
            resolve({});
        }
        const PostData = [];
        req.on("data", (chunck) => {
            PostData.push(chunck);
        })
        req.on("end", () => {
            resolve(JSON.stringify(Buffer.from(PostData).toString()));
        })
    })
}




const getBlogList = (author, keyword) => {
    //根据传进来的参数到数据库进行查询，返回查询到的数据
    let sql = "select * from blogs where 1=1";
    if (author) {
        sql += ` and author='${author}'`;
    }
    if (keyword) {
        sql += ` and title like '%${keyword}%'`
    }
    console.log(sql);
    return execSQL(sql).then(result => {
        return result;
    })

}




const getBlogDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`;

    return execSQL(sql).then(rows => {
        return rows[0];
    })
}



const createBlog = (postdata) => {
    const title = postdata.title;
    const content = postdata.content;
    const author = postdata.author;
    const createAt = Date.now();

    const sql = `insert into blogs (title,content,author,createAt) values ('${title}','${content}','${author}','${createAt}')`;

    return execSQL(sql).then(insetResult => {
        return {
            id: insetResult.insertid
        }
    })
}




const updateBlog = (id, postdata) => {
    const title = postdata.title;
    const content = postdata.content;

    const sql = `update blogs set title='${title},content='${content}' where id='${id}'`;
    return execSQL(sql).then(updataResult => {
        if (updataResult.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    })
}



const deleteBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}'`;
    return execSQL(sql).then(deleteResult => {
        if (deleteResult.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    })
}

module.exports = {
    getPostData,
    getBlogList,
    getBlogDetail,
    createBlog,
    updateBlog,
    deleteBlog
}