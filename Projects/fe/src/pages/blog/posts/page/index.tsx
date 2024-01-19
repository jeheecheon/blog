import { PostCard } from "@/pages/blog/posts/page/components/PostCard"

export const Posts = () => {
  const dummyData = Array.from({ length: 50 }, (_, index) => index);

  return (
    <div className="flex flex-col items-center mx-3">
      <h1 className="inline-block uppercase max-w-[800px] w-full text-3xl font-medium text-sky-700 
      mt-[60px] mb-[20px] text-left">
        Recently published
      </h1>
      <div className="flex flex-col items-center gap-[50px]">
        {
          dummyData.map((_, index) => (
            <PostCard key={index} className="" />
          ))
        }
      </div>
    </div>
  )
}
