import { PostCard } from "@/pages/blog/posts/page/components/PostCard"
import { Link } from "react-router-dom";

const Posts = () => {
  const dummyData = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="flex flex-col items-center mx-3 mb-5">
      <h1 className="inline-block uppercase max-w-[800px] w-full text-3xl font-medium text-sky-700 
      mt-[60px] mb-[20px] text-left">
        Recently published
      </h1>
      <div className="flex flex-col items-center gap-[70px]">
        {
          dummyData.map((_, index) => (
            <Link to='/blog/post' key={index}>
              <PostCard key={index} className="" />
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Posts;
