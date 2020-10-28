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
    var layer = layui.layer
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                // alert(res.message)
                layer.msg("恭喜您，注册成功！")

                $('#link_login').click()
                $('#form-reg')[0].reset()
            }
        })
    })

    // 登录功能
    $('#form-login').submit (function (e) {
        e.preventDefault()

        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                layer.msg("恭喜您，登录成功！")

                localStorage.setItem('token', res.token)

                location.href="/index.html"
            }
        })
    })


})