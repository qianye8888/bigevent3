// 开发环境地址
var userURL = 'http://ajax.frontend.itheima.net'
// 测试环境地址
// var userURL = 'http://ajax.frontend.itheima.net'
// 生产环境地址
// var userURL = 'http://ajax.frontend.itheima.net'




$.ajaxPrefilter(function (params) {
    params.url = userURL + params.url


    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }


    params.complete =function(res) {
        console.log(res.responseJSON)
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = "/login.html"
        }
    }
})