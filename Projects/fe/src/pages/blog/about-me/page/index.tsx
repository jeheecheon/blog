import { Article } from '@/common/components/Article'
import { ArticleLayout } from '@/common/components/ArticleLayout'
import React from 'react'

export const AboutMe = () => {
  return (
    <ArticleLayout>
      <Article publisedDate='2024-01-21' categories={['About me']}>
{
`안녕하세요! 저에요...제 소개 페이지!

제가 그렇게 원하던 블로그 드디어 개설했어요! 사실 옛날부터 네이버 블로그, 티스토리, 다음 같은 곳에서 포스팅 시작해보고 싶었는데, 뭔가 나중에 나이들어서(?)도 제가 써놓은 글들 끝까지 간직하고 싶은 욕구가 있어서... 내가 직접 만들어 봐야지 하면서 미뤄오다 4년이나 지나서야 만들어보네요!!

근데 사실! 이렇게 블로그 만들어본 게 처음은 아니란 사실... 사실 몇년 전에 Jekyll이랑 CI/CD로 정정 블로그 구축했었는데 그 당시 아는 지식이 없어서 힘겹게 만든거기도 하고...
css로 지저분하게 저질러놔서(?) 마음에 안 드는 디자인 새로 뒤엎는 게 엄두가 안 났네요.. 게다가 "정적" 웹사이트라는 점 때문에 재밌는 기능 넣는 거에 한계를 줬고, 매번 익혀지지도 않는 markdown 문법으로 포스팅 하는 데에 너무 지쳤었어요...
`
}

<a target='_blank' className='underline text-blue-500' href='https://jeheecheon.github.io/'>폐기해버렸던 Jekyll로 만든 블로그...</a>

{
`

그래서 이 블로그 "탄생"! 근데 사실 디자인 껍데기만 완성해놓고 지금 이 글 쓰고 있는 거랍니다.. 너무 들떴다...... 아직 글 쓸 때 사용할 html 편집기로 어떤 거를 써야할 지도 못 정했고 백엔드에서는 이걸 어떻게 sanitize 해줘야 하는지 잘 모르겠네요. 그리고 나중에 DB에 저장한 글 내용을 다시 react 프론트에서 보여줄 때 html을 다시 jsx안에서 어떻게 출력시켜준담...

여하튼 지금 이 글 보고 계시는 여러분들, 저의 피땀 눈물 섞인 노력과, 시행착오가 있었다는 걸 알아봐주시기 바랍니다. 저 이거 만들 때 고생 많이 한 거 제발 알아주세요. 1년간의 공백기간(여행가서 놀다 옴..)이 있었음에도 열심히 공부해왔다는 것!
`
}
<a target='_blank' className='underline text-blue-500' href='https://github.com/jeheecheon/jeheecheon-blog'>이 블로그 깃허브 링크</a>
{`

공부!
`}
      </Article>
    </ArticleLayout>

  )
}
