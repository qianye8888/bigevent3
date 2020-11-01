$(function () {
    // 定义时间过滤器到最顶端
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //  在个位数的左侧填充 0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // q 查询的意思
    var q = {
        pagenum: 1,    //页码值
        pagesize: 2,    //每页显示多少条数据
        cate_id: "",   //每章分类的的 Id
        state: "",   // 文章发布状态
    }

    // 初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)

                // 分页
                renderPage(res.total)
            }
        })
    }
    // 初始化分类
    var layer = layui.layer
    var form = layui.form
    initCate()

    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                // 赋值渲染form
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)

                form.render()
            }
        })
    }

    // 筛选
    $('#search-form').on('submit', function (e) {
        e.preventDefault()

        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()

        q.state = state
        q.cate_id = cate_id

        initTable()
    })

    // 定义渲染分页的方法
    var laypage = layui.laypage
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,     //数据总数，从服务端得到
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum,   // 设置默认被选中的分页
            // 分页模块设置，显示那些模块
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10, 15],
            // 分页发生切换时， 触发 jump 回调
            // 触发jump : 分页初始化的时候，页码改变的时候
            jump: function (obj, first) {
                // obj: 所有参数所在的对象； first :是否是第一次初始化分页
                // 改变当前页
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 判断，不是第一次触发初始化页面，才能重新调用初始化文章列表
                if (!first) {
                    // 初始化文章列表
                    initTable()
                }
            }
        });
    }
    // 用代理的方式，为删除按钮绑定一个点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 页面汇总删除按钮个数等于1， 页码大于1
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) {
                        q.pagenum--
                    }

                    initTable()
                    layer.msg("恭喜您，文章删除成功")
                }

            })
            layer.close(index);
        });

    })
})