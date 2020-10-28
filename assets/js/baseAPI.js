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
})