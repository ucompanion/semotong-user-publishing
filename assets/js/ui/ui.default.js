/*-------------------------------------------------------------------
	분류순서
	- @ Variables	: 전역변수
	- @ Settings	: 기본설정
	- @ Utility		: 유틸기능
	- @ Layout		: 레이아웃
	- @ Init		: 초기실행
-------------------------------------------------------------------*/
/*-------------------------------------------------------------------
	@ Variables
-------------------------------------------------------------------*/
// Elements
var	$window			= null,
	$document		= null,
	$html			= null,
	$body			= null,
	$html_body		= null,
	$wrapper		= null,
	$header			= null,
	$activeFocus	= null,
_;

// Device 확인예시
// console.log(platform.name); // 'Safari'
// console.log(platform.version); // '5.1'
// console.log(platform.product); // 'iPad'
// console.log(platform.manufacturer); // 'Apple'
// console.log(platform.layout); // 'WebKit'
// console.log(platform.os); // 'iOS 5.0'
// console.log(platform.description); // 'Safari 5.1 on Apple iPad (iOS 5.0)'

// Devices
var isIOS			= platform.os.family == 'iOS',
	isAND			= platform.os.family == 'Android',
	isMOBILE		= browser.mobile == true,
	isPC			= browser.mobile == false,
_;

// Scrolls
var scrTop			= null,		// 스크롤 현재위치
	scrTopStart		= null,		// 스크롤 시작위치
	scrTopEnd		= null,		// 스크롤 종료위치
	isScrFirst		= null,		// 스크롤 처음여부
	isScrLast		= null,		// 스크롤 마지막여부
_;


/*-------------------------------------------------------------------
	@ Settings
-------------------------------------------------------------------*/
/* 엘리먼트 설정 */
function setElementInit(){
	$window		= $(window);
	$document	= $(document);
	$html		= $('html');
	$body		= $('body');
	$html_body	= $('html, body');
	$wrapper	= $('.wrapper');
	$header		= $('.header');
	$document.off('focusin.eleEvent click.eleEvent').on('focusin.eleEvent click.eleEvent', function(e){
		$activeFocus = $(e.target);
	})
}

/* 디바이스 설정 */
function setDeviceInit(){
	var DUI = {};

	DUI.check = {
		siteCode : window.LOCALE ? window.LOCALE : '',
		browser : (function () {
			var agent = navigator.userAgent;
			var browserList = {
				'ie7' : agent.match(/msie 7.0/i),
				'ie8' : agent.match(/msie 8.0/i),
				'ie9' : agent.match(/msie 9.0/i),
				'ie10' : agent.match(/msie 10.0/i),
				'ie11' : agent.match(/rv:11.0/i),
				'edge' : agent.match(/edge/i),
				'chrome' : agent.match(/chrome/i),
				'safari' : agent.match(/safari/i),
				'firefox' : agent.match(/firefox/i),
				'opera' : agent.match(/opera/i)
			};

			for (prop in browserList) {
				if (browserList[prop]) { // agent.match()
					return prop;
				}
			}

		})(),
		os : (function () {
			var agent = navigator.userAgent;
			var osList = {
				'mac' : agent.match(/macintosh/i),
				'window' : agent.match(/windows/i),
			};

			for (prop in osList) {
				if (osList[prop]) {
					return prop;
				}
			}

		})(),
		ieua : (function () {

			var UA = navigator.userAgent.toLowerCase();

			// IE7 에는 브라우저 엔진명인 Trident 가 없고 IE11 에는 MSIE 란 문자열이 없으므로 두 가지 경우를 모두 체크
			if (UA.indexOf('msie') != -1 || UA.indexOf('trident') != -1) {

				var version = 11;
				UA = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(UA);

				if (UA) {
					version = parseInt(UA[1]);
				}

				var classNames = '';

				// IE 10 이하에 html 클래스를 추가한다.
				if(version <= 11) {

					// IE11 이하에사 사용할 ie 공통 클래스도 추가
					classNames += 'ie';

					// 현재 버전 표시를 추가
					classNames += ' ie' + version;

				}

				// IE10이하 에서 lt-ie 버전에 대한 멀티 클래스를 추가
				for (var i = version + 1; i <= 11; i++) {
					classNames += ' lt-ie' + i;
				}

				// 위 코드에서 체크한 클래스를 html 태그에  추가한다.
				document.getElementsByTagName('html')[0].className += classNames;

			}

		})()
	};

	if(DUI.check.browser == 'ie10') {
		console.log('ie10 입니다. 해당 버전에서의 실행 로직을 작성하세요!');
	}
}

/* 상태 설정 */
function setStatusInit(){
	scrTop = scrTopStart = $window.scrollTop(); // 스크롤 현재상태
	setPosition(scrTop); // 스크롤 현재상태 설정
	setScrolled(); // 스크롤 진행상태 설정
	setResized(); // 리사이징 진행상태 설정
}
function setPosition(val){
	// 스크롤 처음확인
	if (val == 0){
		isScrFirst = true;
		$body.addClass('is-scroll-first');
	} else {
		isScrFirst = false;
		$body.removeClass('is-scroll-first');
	}
	// 스크롤 마지막확인
	if (val + $window.outerHeight() == $document.height()){
		isScrLast = true;
		$body.addClass('is-scroll-last');
	} else {
		isScrLast = false;
		$body.removeClass('is-scroll-last');
	}
}
function setScrolled(){
	var scrollEndTime;
	var isScrolled = false;
	var oldScrTop = scrTop;
	$window.off('scroll.customEvent').on('scroll.customEvent', function(){
		var curScrTop = $window.scrollTop();

		// 스크롤 방향
		if (oldScrTop > curScrTop){
			$window.trigger('scrollUp');
			$body.addClass('is-scroll-up').removeClass('is-scroll-down');
		} else if (oldScrTop < curScrTop){
			$window.trigger('scrollDown');
			$body.addClass('is-scroll-down').removeClass('is-scroll-up');
		}
		oldScrTop = curScrTop;

		// 스크롤 종료
		clearTimeout(scrollEndTime);
		scrollEndTime = setTimeout(function(){
			isScrolled = false;
			scrTop = scrTopEnd = curScrTop;
			$window.trigger('scrollEnd');
		}, 100);

		setPosition(curScrTop);
	});
}
function setResized(){
	// Resized
	var resizeEndTime;
	$window.off('resize.customEvent').on('resize.customEvent', function(){
		clearTimeout(resizeEndTime);
		resizeEndTime = setTimeout(function(){
			$window.trigger('resizeEnd');
		}, 100);
	});
}

/*-------------------------------------------------------------------
	@ Init
-------------------------------------------------------------------*/
$(function(){
	/* Setting Init */
	setElementInit(); // 엘리먼트 설정
	setDeviceInit(); // 디바이스 설정
	setStatusInit(); // 상태 설정
});
