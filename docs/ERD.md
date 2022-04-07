- [Project Root로 돌아가기](../../README.md)

<br><br>

# ERD

[ERDCloud에서 보기](https://www.erdcloud.com/d/896iJQQkcoes3PjQv)

<br>

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ad6e1e27-a549-4d96-9019-5f980b63d00f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220407T175841Z&X-Amz-Expires=86400&X-Amz-Signature=1d85192ca318918ace1f00b6815a5afe8a18e8fd499e62ba22a1daf3adbb1f03&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)



![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/229b4224-3b59-4d97-9291-0b5adc1a662a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220407T175944Z&X-Amz-Expires=86400&X-Amz-Signature=36d2655f6c4b000bf875119fbeab748039dcd5dd48415a2ed86e43cb6477c1db&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

<br><br>

### 테이블 정보

- User 
    - u_seq : 유저 고유번호
    - create_date : 생성일
    - u_email : 유저 이메일
    - u_id : 유저 아이디
    - u_nickname : 유저 닉네임
    - u_pw : 유저 비밀번호
    - u_type : 유저 타입
- Survey1
    - s_id  : 설문조사1 고유번호
    - u_seq : 설문조사 작성자  고유번호
    - s_title : 설문조사 제목
    - create_date : 생성일
    - gender : 성별
    - mood : 분위기
    - season : 계절
    - time : 낮/밤
    - tpo :  상황
- Survey2
    - s_id  : 설문조사2 고유번호
    - u_seq : 설문조사 작성자  고유번호
    - s_title : 설문조사 제목
    - p_id :  사용해본 향수 고유번호
    - create_date : 생성일
- Survey3
    - s_id  : 설문조사3고유번호
    - u_seq : 설문조사 작성자  고유번호
    - s_title : 설문조사 제목
    - c_url :  옷 이미지 url
    - st_id : 스타일 고유번호
    - create_date : 생성일
- Style
    - st_id : 스타일 고유번호
    - gender : 성별
    - mood : 분위기
    - season : 계절
    - time : 낮/밤
    - tpo : 상황
- LikePerfume
    - p_id : 향수 고유 번호
    - u_seq : 좋아요 작성자  고유번호
- Review
    - p_id : 향수 고유 번호
    - u_seq : 좋아요 작성자  고유번호
    - create_date : 생성일
    - r_cotent : 리뷰 내용
    - r_score : 리뷰 평점
- Perfume
    - p_id : 향수 고유 번호
    - p_group : 향수 그룹
    - p_url : 향수 이미지 URL
    - like_cnt : 좋아요 개수
    - review_cnt : 리뷰 개수
    - note1 :  향수 메인노트1
    - note2 : 향수 메인노트2
    - note3 : 향수 메인노트3
    - p_brand : 향수 브랜드  고유번호
    - p_name : 향수 이름
    - p_score : 향수 평점 평균
    - gender : 성별
    - mood : 분위기
    - season : 계절
    - time : 밤/낮
    - tpo :  상황

- Brand
  - b_name : 향수 브랜드 이름
  - kor_name : 브랜드 한글 이름