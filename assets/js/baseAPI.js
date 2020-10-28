// 开发环境地址
var userURL = 'http://ajax.frontend.itheima.net'





$.ajaxPrefilter(function (params) {
    params.url = userURL + params.url
})