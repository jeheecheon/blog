# 개인 블로그
*BLOG URL* : [https://blog.jeheecheon.com](https://blog.jeheecheon.com) 🔥⚡  
Personal blog where I upload tech-related posts.

Built with 
- ![Static Badge](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=black&style=flat-square) for the client-side App,
- ![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?logo=.net&logoColor=white&style=flat-square) for the back-end API,
- ![psql](https://img.shields.io/badge/psql-003B57?logo=postgresql&logoColor=white&style=flat-square) postgreSQL for the database.  
<br />
<br />

## 🥁개발 배경
Jekyll로 만들었던 정적 블로그는 버리고 지금 이 블로그로 이전한 상태이다.  
Jekyll 블로그 Github Repository: <a href="https://github.com/jeheecheon/jeheecheon.github.io">링크 클릭</a>  

이유는 항상 Markdown 문법으로 글을 써야하는 게 너무 불편했다. 포스트에 이미지 추가할 때는 일일이 이미지 복사한 후에 글 사이에 url과 함께 이미지 태그넣어줘야 했던 게 굉장히 거슬렸다. 그래서 야심차게(?) 만들었다가 제대로 써보지도 않고 말끔히 폐기했던 내 생에 첫 웹사이트가 돼버렸다.  

지금 이 블로그는 포스트 업로드, 수정 등 곧바로 html 편집기로 변경하고 적용되도록 만들었다. 이미지 업로드도 aws의 s3를 통해서 빠르게 붙혀넣을 수 있는 상태이다. 아무튼 몇 년전 고정된 데이터만 보여주던 Jekyll 블로그를 만들던 당시 나중에 이런 류의 동적 웹사이트로 만들어보자고 생각만 하던 게 실현돼서 좀 뿌듯하다!
<br />
<br />

## 🔨개발 기간
2024-01-12 ~ 2024-02-12  
~ 유지보수 중
<br />
<br />

## 😗개발 인원
1인 개발
<br />
<br />

## 🛠️기술스택
사용된 기술스택은 다음과 같다.  
### 🎨프론트:
- React
- Typescript
- Tailwindcss
- Quill( html 편집기 )
- isomorphic-dompurify(sanitizing tool)
- etc...

### 🖥️백엔드:
- ASP.NET Core web api
- Entity Framework Core
- HtmlSanitizer (string sanitizing tool)
- etc...

### 🕸️인프라:
- EC2
- RDS
- S3
<br />
<br />

## 💾DB Architecture
![1a4b125a-eac6-47c2-8082-b4d1597246ab](https://github.com/jeheecheon/jeheecheon-blog/assets/62019774/22b95786-5eb3-4ace-8930-83399b44c170)
위는 개발과정에서 구성했던 DB 다이어그램이다.  
좋아요 수나 댓글 수가 내 웹사이트에 굳이 필요한 기능은 아니었지만 요즘 웬만한 SNS에는 기본적으로 있는 필수 기능들인 것 같아 넣어보았다.  

그런데 좋아요는 좋아요 후에 취소가 가능해야 했기 때문에 무작정 count수만 올리는 방식으로 해서는 안 될 것 같은 느낌이 들었다. 이후 구현에 막혀서 Stack overflow에서 디자인 정보를 많이 얻어 왔고 최종적으로 Udemy에서 강의도 하나 완강해야 했다.  

이왕 만드는거 "내가" 사용할 것이니까 설계, 성능, 코드 품질등 모두 제대로 챙겨보고 싶었다. 특히 DB 디자인은 대규모 데이터나 트래픽을 받을 곳은 아니지만 그래도 이왕 잘 만들어 보고 싶은 욕심이 많이 앞섰던 것 같다.
<br />
<br />

## ✍️배포 구조
![80e46f63-142d-4aeb-99d5-f307c1804bed](https://github.com/jeheecheon/blog/assets/62019774/568efcd5-dab2-4464-a401-a31153393458)
- 프론트: EC2의 Nginx를 통해 react 정적 파일 배포를 해주고 있다.
- 백엔드: nginx를 통해 백엔드 엔드포인트 url로 들어오는 요청들은 도커 컨테이너와 프록시 시켜주고 있는 상태이다.
- 데이터베이스: 내부 DB는 RDS를 사용해서 postgreSQL을 활용하고 있고 외부인터넷과 연결을 차단하여 ec2와만 연결이 되도록 설정해놓은 상태이다.

도메인 비용 이외 과금 없이 돌리는 게 목적이었지만 S3와 VPC(내부망)은 사용량만큼 비용이 발생해서 그렇게 하지는 못했다.
<br/>
<br/>

## 😵SEO 최적화
google analytics, 네이버 등에서 필요로 하는 최적화는 일부러 해놓지 않은 상태이다. sitemap도 세팅하지 않았다.  
굳이 외부에 적극적으로(?) 노출시켜 비용 지출을 높일 필요가 있을까.  
나중에 토이 프로젝트들 호스팅 할 미니PC라도 구해본 뒤에 생각해봐야겠다.  
<br/>
<br/>

## 유데미 수료증
![asd393f81d0-c3ec-40e1-a5f1-755e0b57243c](https://github.com/jeheecheon/blog/assets/62019774/010f925a-0e54-44c7-912c-255d04b1076d)

