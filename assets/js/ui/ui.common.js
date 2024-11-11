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

// Dropdown Select
function setDropdown(button) {
	const dropdown = button.closest(".ui-dropdown");
	const items = dropdown.querySelectorAll(".dropdown-item");

	items.forEach((item) => {
		item.onclick = (event) => {
			button.textContent = event.target.textContent;
		};
	});
}

// Spy Scroll
function setSpyScroll() {
	const tabPanes = document.querySelectorAll(".tab-pane");
	const navLinks = document.querySelectorAll("#spyScrollTab .nav-link");
	const tabHeight = document.querySelector("#spyScrollTab").offsetHeight; // 탭 높이

	// 스크롤 시 active 클래스 변경
	window.addEventListener("scroll", () => {
		let scrollPosition = window.scrollY || document.documentElement.scrollTop;

		tabPanes.forEach((section, index) => {
			const sectionTop = section.offsetTop - tabHeight; // 탭 높이를 빼줌
			const sectionHeight = section.clientHeight;

			if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
				navLinks.forEach(link => link.classList.remove("active"));
				navLinks[index].classList.add("active");
			}
		});
	});

	// 클릭 시 active 클래스 변경 및 스크롤 조정
	navLinks.forEach((link, index) => {
		link.addEventListener("click", (e) => {
			e.preventDefault(); // 기본 클릭 동작 방지
			navLinks.forEach(link => link.classList.remove("active"));
			link.classList.add("active");

			// 스크롤 애니메이션
			const targetId = link.getAttribute("href");
			const targetSection = document.querySelector(targetId);
			const targetPosition = targetSection.offsetTop - tabHeight; // 탭 높이를 빼줌
			window.scrollTo({ top: targetPosition, behavior: "smooth" });
		});
	});
}

// Card Expand
function cardExpand(id, button) {
	const $expand = document.querySelector(id);
	const isExpanded = button.getAttribute('aria-expanded') === 'true';
	$expand.classList.toggle('is-expanded');
	button.setAttribute('aria-expanded', !isExpanded);
}

// Popover
function setPopover(selector){
	// Boottsrap Popover
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => {
		return new bootstrap.Popover(popoverTriggerEl, {
			customClass: selector,
		});
	});

	// 문서 클릭 시 모든 Popover 닫기
	document.addEventListener('click', () => {
		popoverList.forEach(popover => popover.hide());
	});
}

// Select Valued
function setSelectValued(buttonId, option){
	var button = document.querySelector(buttonId);
	var buttonSpan = document.querySelector(buttonId + '>span');

    // option 요소에 is-selected 클래스 추가
    option.classList.add('is-selected');
    button.classList.remove('is-placeholder');

    // 다른 형제 요소들에서 is-selected 클래스 제거
    Array.from(option.parentNode.children).forEach(sibling => {
        if (sibling !== option) {
            sibling.classList.remove('is-selected');
        }
    });

    // buttonSpan의 텍스트를 선택된 option의 텍스트로 설정
    buttonSpan.textContent = option.textContent;
}

// Radio Selected
function setRadioSelected(radioName, className) {
    // 모든 라디오 버튼의 부모 <label> 요소에서 is-selected 제거
    var radios = document.getElementsByName(radioName);
    radios.forEach((radio) => {
        radio.closest(className).classList.remove('is-selected');
    });

    // 선택된 라디오 버튼에 is-selected 추가
    var selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
    if (selectedRadio) {
        selectedRadio.closest(className).classList.add('is-selected');
    }
}

// Rating Selected
function setRating(button) {
	// 모든 별 버튼을 가져옵니다.
	const stars = document.querySelectorAll('.rating-star .ui-btn');
	const ratingStarContainer = document.querySelector('.rating-star');
	let isActive = true; // 클릭한 버튼까지 활성화하기 위한 플래그
	let rating = 0; // 선택된 별의 수 (점수)

	// 버튼을 반복하여 `is-selected` 및 `aria-selected` 속성을 설정/초기화
	stars.forEach((star, index) => {
		if (isActive) {
			star.classList.add('is-selected'); // 선택된 별에는 `is-selected` 클래스 추가
			star.setAttribute('aria-selected', 'true'); // aria-selected를 true로 설정
			rating = index + 1; // 클릭된 별의 수를 계산 (0부터 시작하므로 +1)
		} else {
			star.classList.remove('is-selected'); // 선택되지 않은 별에는 클래스 제거
			star.setAttribute('aria-selected', 'false'); // aria-selected를 false로 설정
		}

		// 현재 별이 클릭된 버튼인 경우 플래그를 false로 설정하여 이후 별들은 초기화
		if (star === button) {
			isActive = false;
		}
	});

	// aria-label을 점수에 맞게 업데이트
	ratingStarContainer.setAttribute('aria-label', '평점: '+rating+'점');
}