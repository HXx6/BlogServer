//定义我们的格式化好的会返回给客户端的数据的类

class BlogModel {
    constructor(data, message) {
        if (typeof data == "string") {
            this.data = message;
        } else {
            this.data = data;
            this.message = message;
        }
    }
}


class SuccessModel extends BlogModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}


class FailModel extends BlogModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}


module.exports = { SuccessModel, FailModel }