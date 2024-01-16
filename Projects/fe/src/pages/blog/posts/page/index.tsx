import { PostCard } from "@posts/page/components/PostCard"

export const Posts = () => {
  return (<>
    <div className="mt-7 px-3">
      <h1 className="text-3xl">
        Latest Content
      </h1>
      <div>
        <PostCard />
      </div>

    </div>
  </>
  )
}
