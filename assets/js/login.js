$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 自定义验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,"密码必须6-16位，且不能输入空字格"
        ],
        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val()
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    })

    // 注册功能
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }
                alert(res.message)
            }
        })
    })
})