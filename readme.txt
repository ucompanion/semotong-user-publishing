##규칙

#페이지 단위
- 페이지단위 전체 클래스 : [화면아이디]-page

#섹션 단위
- 최상위 컨텐츠 : [컨텐츠]-sec
- 하위 컨텐츠 : sec-

#컨텐츠 컴포넌트 (섹션 구조를 제외한 실질적 최종 컨텐츠)
- 최상위 컨텐츠 : [컨텐츠]-[형태]
- 하위 컨텐츠 : [형태]-

#공용 컴포넌트
- 최상위 컨텐츠 : ui-[형태]
- 하위 컨텐츠 : [형태]-

#요약
- 공용 컴포넌트는 ui- 로 시작합니다.
- 하위 컨텐츠는 [컨텐츠]- 를 생략합니다.
- 공용 컴포넌트를 제외하고 최상위 컨텐츠를 따라갑니다.
