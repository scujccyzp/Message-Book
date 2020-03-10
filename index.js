//点赞
$(".praise").click(function () {
  if ($(this).text() == "赞") {
    $(this).text("取消赞");
    $(this).next().text("我和" + $(this).next().text());
  } else {
    $(this).text("赞");
    $(this).next().text($(this).next().text().substr(2));
  }
})

//评论输入框
$(".write-comment").focus(function () {
  var len = $(this).val().length;
  $(this).css("height", "70px");
  $(this).attr("placeholder", "");
  $(this).next().css("display", "block");
  $(this).next().next().css("display", "inline");
  if (len == 0) {
    $(this).next().addClass("btn-off");
  }
})

$(".write-comment").blur(function () {
  var len = $(this).val().length;
  if (len == 0) {
    $(this).css("height", "25px");
    $(this).attr("placeholder", "评论···");
    $(this).next().css("display", "none");
    $(this).next().next().css("display", "none");
  }
})

$(".write-comment").keyup(function () {
  var len = $(this).val().length;
  $(this).next().next().text(len + "/140");
  if (len == 0) {
    $(this).next().addClass("btn-off");
  } else {
    $(this).next().removeClass("btn-off");
  }
})

//点击回复生成评论
$(".btn").click(function () {
  var $text = $(this).prev().val();
  var $li = $(`
    <li class="comment clearfix">
      <img src="image/10.jpg" class="my-avator">
      <div class="comment-content">
        <p class="comment-text"><a href="" class="user">我 ：</a>${$text}</p>
        <p class="comment-time">
          <span class="time">${fomate()}</span>
          <a href="javascript:;" class="comment-praise" total="0" my="0">赞</a>
          <a href="javascript:;" class="comment-del">删除</a>
        </p>
      </div>
    </li>
    `);
  $(this).prev().prev().append($li);
  $(this).prev().css("height", "25px");
  $(this).prev().val("");
  $(this).prev().attr("placeholder", "评论···");
  $(this).next().text("0/140");
  $(this).next().css("display", "none");
  $(this).css("display", "none");

})

//生成时间
function fomate() {
  var d = new Date();
  var y = d.getFullYear();
  var m = (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1);
  var t = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  var h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  var mi = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  return y + "-" + m + "-" + t + " " + h + ":" + mi;
}

//在父级设置点击事件
$(".comments").click(function (e) {
  if (e.target.className.indexOf("comment-praise") > -1) {
    if ($(e.target).attr("my") == 0) {
      $(e.target).attr("total", parseInt($(e.target).attr("total")) + 1);
      $(e.target).text($(e.target).attr("total") + "取消赞");
      $(e.target).attr("my", 1);
    } else {
      $(e.target).attr("total", parseInt($(e.target).attr("total")) - 1);
      if ($(e.target).attr("total") == 0) {
        $(e.target).text("赞");
      } else {
        $(e.target).text($(e.target).attr("total") + "赞");
      }
      $(e.target).attr("my", 0);
    }
  }
  if (e.target.className.indexOf("comment-del") > -1) {
    $(e.target).parent().parent().parent().remove();
  }
  if (e.target.className.indexOf("reply") > -1) {
    var $user = $(e.target).parent().prev().find(".user").text();
    var $textarea = $(e.target).parent().parent().parent().parent().next()
    $textarea.val("回复" + $user);
    $textarea.css("height", "70px");
    $textarea.focus();
  }
})

//删除
$(".del-all").click(function () {
  $(this).parent().remove();
})