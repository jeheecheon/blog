# 개인 블로그
*BLOG URL* : [https://blog.jeheecheon.com](https://blog.jeheecheon.com) 🔥⚡  
Personal blog where I upload tech-related posts.

Built with 
- ![Static Badge](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=black&style=flat-square) for the client-side App,
- ![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?logo=.net&logoColor=white&style=flat-square) for the back-end API,
- ![psql](https://img.shields.io/badge/psql-003B57?logo=postgresql&logoColor=white&style=flat-square) postgreSQL for the database.  
<br />

# 🛠️기술스택
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

# 💾DB Architecture
![1a4b125a-eac6-47c2-8082-b4d1597246ab](https://github.com/jeheecheon/jeheecheon-blog/assets/62019774/22b95786-5eb3-4ace-8930-83399b44c170)
위는 개발과정에서 구성했던 DB 다이어그램이다.  

좋아요 수나 댓글 수가 내 웹사이트에 굳이 필요한 기능은 아니었지만 요즘 웬만한 SNS에는 기본적으로 있는 필수 기능들인 것 같아 넣어보았다.  
그러나 좋아요 후에 취소가 가능해야 했기 때문에 무작정 count수만 올리는 방식으로 해서는 안 될 것 같은 느낌이 들었다. 이후 구현에 막혀서 Stack overflow에서 디자인 정보를 얻어 왔고 최종적으로 Udemy에서 강의도 하나 완강해야 했다.

이왕 만드는거 "내가" 사용할 것이니까 설계, 성능, 코드 품질등 모두 제대로 챙겨보고 싶었다. 특히 DB 디자인은 대규모 데이터나 트래픽을 받을 곳은 아니지만 그래도 이왕 잘 만들어 보고 싶은 욕심이 많이 앞섰던 것 같다.
