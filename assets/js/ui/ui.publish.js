/*-------------------------------------------------------------------
	분류순서
	- @ Publish	    : 레이아웃
	- @ Init	    : 초기실행
-------------------------------------------------------------------*/

function setPublishInclude(){
	$(".header").load("../../html/layout/include_header.html", function(){
			setStatusInit();
	});
	$(".footer").load("../../html/layout/include_footer.html", function(){
			setStatusInit();
	});
}

$(function(){
	/* Setting Init */
	setPublishInclude(); // 인크루드
});
