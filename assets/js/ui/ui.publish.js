/*-------------------------------------------------------------------
	분류순서
	- @ Publish	    : 레이아웃
	- @ Init	    : 초기실행
-------------------------------------------------------------------*/

function setPublishInclude(){
	$(".header").each(function(){
		var path = "/html/layout/";
		var filename = "include_header.html";
		$(this).load(path + filename, function(){
				console.log("Init Header Functions");
		});
	})
	$(".footer").each(function(){
		var path = "/html/layout/";
		var filename = "include_footer.html";
		$(this).load(path + filename, function(){
				console.log("Init Footer Functions");
		});
	})
}

$(function(){
	/* Setting Init */
	setPublishInclude(); // 인크루드
});
