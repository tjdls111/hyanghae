# 기획

# 주제

---

- 향수 추천 서비스

# 서비스 명

---

- 향해
- 뜻 : “향”수를 “해”석하다 / 향수 고수를 “향해” 가다
- 이유 : 사용자의 향수 취향을 해석한다 / 향린이에서 향수 고수를 향해 간다

# 페르소나

---

- 이름 : Woody
- 나이 : 28
- 특징 : 향수 초보
- 계기 : 이번 주말에 소개팅이 있는데 어떤 향수를 써야할 지 모르겠음 But, 향수를 한번도 써보지 않음

![토이스토리_우디_색칠공부](/uploads/4c8dfc19a803d32725b95d4b9590679d/토이스토리_우디_색칠공부.png)

# 서비스 내용

---

1. 향수 뿌리는 방법, 서비스 이용 방법 제공 (메인페이지)
2. 향수 추천 : 데이트용/데일리용/면접용 등등
    - 옷에 따라 향수 추천
    - 설문에 따라 향수 추천- 종류 2가지
        - 설문 1 : 가격대, 데일리용/데이트용/면접용, 성별 등 선택 → 취향에 맞는 향수 추천
        - 설문 2 : 사용해본 향수 선택 → (비슷한 향수 추천, 새로운 내가 되는 향기)
3. 구매 링크 제공 (네이버 검색 API)
4. 커스텀 향수 클래스 → 결제 시스템

## 필수 기능

---

1. 향수 추천 기능
    - 옷에 어울리는 향수 추천 : 옷 사진 업로드 후 향수 추천 [https://yg-dad.tistory.com/164](https://yg-dad.tistory.com/164)
    - 추천 결과 페이지 : 감성적인 문구 + 향수 결과를 (5~10)개 렌더링
2. 회원 관련 기능
    - 회원가입, 소셜 로그인, 로그인, 로그아웃, 회원탈퇴
    - 마이페이지 : 회원정보 수정, 리뷰, 좋아요한 향수 조회 페이지
    - 나를 위한 추천 향수 페이지
3. 향수 정보 조회 기능
    - 카테고리별 향수 조회
    - 향수 정보 페이지(별점, 리뷰, 좋아요, 구매처 링크)

## 추가 기능

---

- 커스텀 향수 - 조향사 일일 클래스(더미) 결제 시스템
- 향수 테스트 결과 공유하기 - 카톡 링크 복사하기
- 워드 클라우드로 리뷰 보여주기
- 향수 중개 기능 - 구매 링크 제공

## 시간이 넘치면

---

- 가까운 향수 시향, 판매점 추천 (위치서비스)
- WEB-RTC로 조향사와 user를 연결 (채팅, qna)
- 향수 커뮤니티 - 자유 게시판, 태그 (질문, 추천, 문의, 할인 정보, 홍보..)

### 추가 페이지 구성

---

- 메인 페이지
    - 서비스 소개(여러 기능들)
    - 예시
    
    [Website Design - The Leader in Website Design - Squarespace](https://www.squarespace.com/website-design?channel=display_nonprogrammatic&subchannel=dribbble&campaign=tiaadeola-video-15_4x3&subcampaign=loggedout&source=us_loggedout&utm_source=ros&utm_medium=display_nonprogrammatic&utm_campaign=2022_us_eng_tiaadeola-video-15&utm_term=loggedout&utm_content=video)
    
    - 마우스 휠 내리면, 적절한 다음 위치에 딱 가서 멈추는 기능

## 유사 사이트

---

- [https://paffem.me/about.html](https://paffem.me/about.html)

# 기능별 환경

---

- MariaDB
    - 유저 테이블
        - 소셜 로그인 : 아이디는 이메일
        - 로그인 : 아이디는 이메일 X (소셜 로그인과 로그인 둘 다 가능하게 하기 위해)
    - 향수 테이블
    - 리뷰 테이블
- 배포
    - AWS EC2
    - Jenkins
    - Docker
	
# Git 컨벤션

<aside>
💡 참고 페이지

</aside>

[Git 관련 모든 컨벤션](https://www.notion.so/Git-73fddb8a4a074b9cb467d4a069dfca83)

- Git 커밋 메세지 템플릿 설정하기
    
    [https://velog.io/@bky373/Git-커밋-메시지-템플릿](https://velog.io/@bky373/Git-%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80-%ED%85%9C%ED%94%8C%EB%A6%BF)
    

# Git 작업 전체적인 약속

1. **소스코드 작성 및 Git 작업을 시작하기 전에 JIRA 이슈 생성하기**
2. 서로 공유하는 commit 그래프는 함부로 변경하지 않기
3. **리뷰어에게 꼭 코드리뷰 받기!**
4. 자신의 pull request는 스스로 merge하기
5. 이슈넘버는 Jira 이슈넘버로 통일!

# Branch 명명 규칙

---

`master` → `develop` → `FE/기능이름`, `BE/기능이름`, `fix/FE/이슈이름`

- Ex) `master` → `develop` →  `FE/Jira이슈번호/login`, `BE/Jira이슈번호/login`
- 브랜치 이름은 Jira Story를 기준으로, 영문으로 소문자로 작성한다.

```jsx
ex. 
FE/#S06P21D104-4/login
BE/#S04P12A202-26/logout
```

# Commit 메시지

---

- `git commit -m "<타입> #JiraIssuNum: <제목>"`
- Ex) `git commit -m "feat #S202045992-2: 로그인 폼 추가"`

```jsx
// 제목

Jira Sub-task 타이틀과 일치

// 타입

feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
chore : 그 외 자잘한 작업
test : 테스트 코드
build : 시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm, gulp, yarn 레벨)
ci : CI관련 설정
style : 코드 의미에 영향을 주지 않는 변경사항 (포맷, 세미콜론 누락, 공백 등)
refactor : 성능 개선
remove: 파일 삭제만 했을 때
rename: 브래이름만 바꿨을때
```

- Jira issue 해당이 없으면 생략 가능하다. (chore, style 등 코드 정리를 하는 경우)
- 내용은 `.` 사용 금지 ex) 로그인 폼 추가 (O), 로그인 폼 추가.(X)

