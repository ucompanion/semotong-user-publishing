/*-------------------------------------------------------------------
	분류순서
	- @ Publish	    : 레이아웃
	- @ Init	    : 초기실행
-------------------------------------------------------------------*/

function setPublishInclude(){
	$("[data-include]").each(function(){
		var path = "/html/_layout/";
		var filename = $(this).data('include');
		$(this).load(
			path + filename,
			function(){
				// 공통
				$(this).children().unwrap();

				// 헤더일때
				if (filename === "_include_header.html") {
					// Init Functions
					console.log("Init Header Functions");
				}

				// 푸터일때
				if (filename === "_include_footer.html") {
					// Init Functions
					console.log("Init Footer Functions");
				}
			}
		);
	})
}

$(function(){
	/* Setting Init */
	setPublishInclude(); // 인크루드
});
