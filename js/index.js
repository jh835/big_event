$(function() {
    // 当我们点击了小li，此时不需要执行页面滚动事件里面的小 li 的背景选择。
    // 使用节流阀的方法，设置一个flag标识
    var flag = true;
    // 1. 显示隐藏电梯导航
    // 直到滚动条滚动到今日推荐的部分，就显示电梯导航
    var toolTop = $(".recom").offset().top;
    toggleTool();
    // 显示和隐藏电梯导航的功能，在页面加载的时候调用一次
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    // 在页面滚动的时候再调用一次
    $(window).scroll(function() {
        toggleTool();
        // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(i);  i表示当前内容区的索引号
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
                }
            });
        }
    });
    // 2. 点击电梯导航页面可以滚动到相应的内容区域
    $('.fixedtool li').click(function() {
        flag = false;
        // console.log($(this).index());
        // 点击之后让当前的小li添加背景颜色，兄弟元素清除样式
        $(this).addClass('current');
        $(this).siblings().removeClass('current');
        // 当每次点击小li，就需要计算出页面要去往的位置
        // 选出对应索引号的内容区的盒子，计算它的.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            // 当点击小li，执行页面滚动动画完成之后，打开节流阀
            flag = true;
        });
    });
})