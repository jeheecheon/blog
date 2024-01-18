import { PostCard } from "@posts/page/components/PostCard"

export const Posts = () => {
  const dummyData = Array.from({ length: 50 }, (_, index) => index);

  return (<>
    <div className="mt-7 px-3">
      <h1 className="inline-block w-full text-3xl font-medium text-slate-700 mb-5 text-center">
        Latest Content
      </h1>

      <div>
        {
          dummyData.map((_, index) => (
            <PostCard key={index} />
          ))
        }
      </div>

    </div>
  </>
  )
}
