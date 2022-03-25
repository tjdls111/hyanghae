# CI/CD

### ❌Docker 사용했을 때

---

[CI/CD (Docker 사용)](https://www.notion.so/CI-CD-Docker-4697527e141f4a0e8521a49922856b04)

### 📍참고사이트

---

[[Jenkins] Docker를 활용한 Spring boot 프로젝트 CI & CD](https://skyblue300a.tistory.com/14)

# 💡EC2 포트

- Jenkins : 8081
- REST API (Spring Boot) : 8080
- MariaDB : 3306
- 웹서버 기본 포트(nginx) : 80

# ↗️SSH 접속

---

```java
ssh -i J6D104T.pem ubuntu@j6d104.p.ssafy.io
```

![ssh 접속](./images/CICD_1.png)

# 🔶Jenkins

---

[](http://j6d104.p.ssafy.io:8081/)

- id : ssafy
- pw : ssafy

# Gitlab Webhook

---

[SSAFY](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22D104/-/hooks)

# Jenkins 빌드 시 npm install 에러

---

```powershell
# nodejs를 nvm으로 설치
nvm install 16.13.0
```

### 에러 목록

- /usr/bin/env 에서 node 를 찾는 문제 발생

![npm 에러1](./images/CICD_2.png)

 

### 해결 방법

- node가 깔린 위치를 심볼릭 링크로 생성

```powershell
ln -s /hone/ubuntu/.nvm/versions/node/v16.13.0/bin/node /usr/local/bin/node
```

![npm 에러2](./images/CICD_3.png)

# Jenkins 설치

---

1. Jenkins 리포지토리 키를 다운로드하여 설치
   
    ![젠킨스 설치1](./images/CICD_4.png)
    
2. apt 데이터베이스에 공식 젠킨스 리포지토리 추가
   
    ![젠킨스 설치2](./images/CICD_5.png)
    
3. apt-get 최신버전으로 업데이트
   
    ![젠킨스 설치3](./images/CICD_6.png)
    
4. Jenkins 설치
   
    ![젠킨스 설치4](./images/CICD_7.png)
    
5. Jenkins는 기본 8080 포트를 사용하기 때문에 톰캣과 겹친다. 그러므로 Jenkins의 포트 8081를 변경한다.
   
    ![젠킨스 설치5](./images/CICD_8.png)
    
    ![젠킨스 설치6](./images/CICD_9.png)
    
6. Jenkins를 사용하려면 Java를 설치해야한다. 이 프로젝트에서는 11을 사용하므로 11을 설치한다.
   
    ![젠킨스 설치7](./images/CICD_10.png)
    

![젠킨스 설치8](./images/CICD_11.png)

1. Jenkins 실행
   
    ![젠킨스 설치9](./images/CICD_12.png)
    

# Jenkins, GitLab 설정

---

1. 도메인:8181 주소로 접속
   
    ![젠킨스깃랩 설정1](./images/CICD_13.png)
    
2. Jenkins 초기 패스워드 확인
   
    ![젠킨스깃랩 설정2](./images/CICD_14.png)
    
3. Jekins 관리 → Global Tool Configuration(EC2에 있는 Java, Git 설정)
   
    ![젠킨스깃랩 설정3](./images/CICD_15.png)
    
    ![젠킨스깃랩 설정4](./images/CICD_16.png)
    
4. Jenkins sudo 사용 권한 부여

![젠킨스깃랩 설정5](./images/CICD_17.png)

![젠킨스깃랩 설정6](./images/CICD_18.png)

![젠킨스깃랩 설정7](./images/CICD_19.png)

1. Jenkins 관리 → Configure Global Security → Allow anonymous read access 체크

![젠킨스깃랩 설정8](./images/CICD_20.png)

1. Jenkins 관리 → Gitlab, Post build task, MatterMost Nontification 설치

![젠킨스깃랩 설정9](./images/CICD_21.png)

![젠킨스깃랩 설정10](./images/CICD_22.png)

![젠킨스깃랩 설정11](./images/CICD_23.png)

1. 생성한 프로젝트 → 구성
   
    ![젠킨스깃랩 설정12](./images/CICD_24.png)
    
    ![젠킨스깃랩 설정13](./images/CICD_25.png)
    
    - Repositroy URL : Gitlab 레포지토리 주소
    - Credential → Add 클릭
        - Username : Gitlab 아이디
        - password : Gitlab 패스워드
        - ID : Jenkins의 내의 Credential 구분하기 위한 식별자
    - Branch는 원하는 브랜치로 변경
    
    ![젠킨스깃랩 설정14](./images/CICD_26.png)
    
    - Build only if new commits ... 체크 해제
    - Accepted Merge ... 체크

![젠킨스깃랩 설정15](./images/CICD_27.png)

- Build는 프로젝트 마다 자율적으로 설정

![젠킨스깃랩 설정16](./images/CICD_28.png)

- 빌드 후 조치 또한 Post build task로 프로젝트에 따라 자율적으로 작성

# Nginx 설치, 설정

---

1. Nginx 설치
   
    ![엔진엑스 설치1](./images/CICD_29.png)
    
2. default 파일 설정
   
    ![엔진엑스 설치2](./images/CICD_30.png)
    
    ![엔진엑스 설치3](./images/CICD_31.png)
    
3. Nginx 재시작
   
    ![엔진엑스 설치4](./images/CICD_32.png)
    

# Pm2 설치

---

![엔진엑스 설치5](./images/CICD_33.png)

- Next.js를 백그라운드로 돌리기 위해 사용

# HTTPS 적용

---

1. Certbot 설치
    - 레포지토리 등록
      
        ![HTTPS 적용1](./images/CICD_34.png)
        
    - Certbot 설치
      
        ![HTTPS 적용2](./images/CICD_35.png)
        

1. SSL 인증서 발급
    - 인증서 발급
      
        ![HTTPS 적용3](./images/CICD_36.png)
        
    - 이메일 등록과 약관에 동의하면 기존 http 연결을 어떻게 설정할 것인가에 대한 질문이 나온다.
        - 1 : http 연결을 https로 리다이렉트 하지 않는다.
        - 2 : http 연결을 https로 리다이렉트 시킨다.
    - 1 or 2를 입력하고 엔터를 누르면, 구성이 업데이트 되고 Nginx 서버가 재시작된다.
    - 터미널에 다음과 같은 메세지가 나오는지 확인!
      
        ![HTTPS 적용4](./images/CICD_37.png)
