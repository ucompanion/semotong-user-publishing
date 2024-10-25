/*-------------------------------------------------------------------
	분류순서
	- @ Init		: 초기실행
	- @ Settings	: 기본설정
	- @ Layout		: 컴포넌트
	- @ Contents	: 컨텐츠전체
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
	@ Init
-------------------------------------------------------------------*/
function initUI() {
	/* Setting Init */
	setDeviceStatus(); // 디바이스 설정
	setScrollStatus(); // 스크롤 상태 설정
}

document.addEventListener('DOMContentLoaded', function () {
	initUI();
});

/*-------------------------------------------------------------------
	@ Settings
-------------------------------------------------------------------*/
/* 디바이스 설정 */
function setDeviceStatus() {
	// 플랫폼 정보 가져오기
	var os = platform.os.family;  // 운영체제 정보
	var browserName = platform.name;  // 브라우저 이름
	var browserVersion = platform.version;  // 브라우저 버전
	var isMobile = platform.mobile;  // 모바일 여부

	// OS에 따른 클래스 추가
	var osClasses = {
		'iOS': 'os-ios',
		'Android': 'os-android',
		'Windows': 'os-windows',
		'macOS': 'os-macos',
		'Linux': 'os-linux'
	};
	document.documentElement.classList.add(osClasses[os] || 'os-unknown');

	// 브라우저 이름에 따른 클래스 추가
	var browserClasses = {
		'Chrome': 'browser-chrome',
		'Firefox': 'browser-firefox',
		'Safari': 'browser-safari',
		'Edge': 'browser-edge',
		'IE': 'browser-ie'
	};
	document.documentElement.classList.add(browserClasses[browserName] || 'browser-unknown');

	// 모바일 여부에 따른 클래스 추가
	document.documentElement.classList.add(isMobile ? 'is-mobile' : 'is-desktop');
}

/* 스크롤 상태 설정 */
function setScrollStatus() {
	var scrollEndTime;
	var oldScrTop = window.scrollY; // 초기 스크롤 위치 설정
	var isScrFirst = oldScrTop === 0; // 스크롤이 처음인지 확인
	var isScrLast = oldScrTop + window.innerHeight === document.documentElement.scrollHeight; // 스크롤이 끝인지 확인

	// 처음과 마지막 스크롤 상태 설정
	document.body.classList.toggle('is-scroll-first', isScrFirst);
	document.body.classList.toggle('is-scroll-last', isScrLast);

	// 스크롤 이벤트 처리
	window.removeEventListener('scroll', handleScroll); // 기존 이벤트 제거
	window.addEventListener('scroll', handleScroll);

	function handleScroll() {
		var curScrTop = window.scrollY;

		// 스크롤 방향 처리
		if (oldScrTop > curScrTop) {
			document.body.classList.add('is-scroll-up');
			document.body.classList.remove('is-scroll-down');
			window.dispatchEvent(new Event('scrollUp'));
		} else if (oldScrTop < curScrTop) {
			document.body.classList.add('is-scroll-down');
			document.body.classList.remove('is-scroll-up');
			window.dispatchEvent(new Event('scrollDown'));
		}
		oldScrTop = curScrTop;

		// 스크롤 종료 처리
		clearTimeout(scrollEndTime);
		scrollEndTime = setTimeout(function () {
			window.dispatchEvent(new Event('scrollEnd'));
		}, 100);

		// 스크롤 상태 업데이트
		isScrFirst = curScrTop === 0;
		isScrLast = curScrTop + window.innerHeight >= document.documentElement.scrollHeight;
		document.body.classList.toggle('is-scroll-first', isScrFirst);
		document.body.classList.toggle('is-scroll-last', isScrLast);
	}
}

// Resized 이벤트 설정
function setResized() {
	// Resized
	var resizeEndTime;
	window.removeEventListener('resize', handleResize); // 기존 이벤트 제거
	window.addEventListener('resize', handleResize);

	function handleResize() {
		clearTimeout(resizeEndTime);
		resizeEndTime = setTimeout(function () {
			window.dispatchEvent(new Event('resizeEnd'));
		}, 100);
	}
}

/*-------------------------------------------------------------------
	@ Layout
-------------------------------------------------------------------*/
// Floating Menu
function floatingMenuHandler(layerid, btnId){
	var layer = document.getElementById(layerid);
	var btn = document.getElementById(btnId);

	layer.classList.toggle("show");
	btn.setAttribute("aria-expanded", btn.getAttribute("aria-expanded") === "false" ? "true" : "false");
}

/*-------------------------------------------------------------------
	@ Contents
-------------------------------------------------------------------*/
// Input Clear
function InputClearHandler(id) {
	var inputElement = document.querySelector(id);
	if (inputElement) {
		inputElement.value = '';
		inputElement.focus();
	}
}