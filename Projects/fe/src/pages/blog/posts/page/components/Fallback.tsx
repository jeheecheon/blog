import Skeleton from 'react-loading-skeleton'

const Fallback = () => {
  const PostSkeleton = () => (
    <div className="border-b-2" >
      <div className="flex flex-col">
        <Skeleton containerClassName="w-[100px]" />
        <Skeleton containerClassName="w-1/3" />
        <Skeleton count={3} />
        <div className="flex flex-row mt-3 justify-between">
          <div className="w-1/6">
            <Skeleton containerClassName="w-full" />
          </div>
          <div className="w-1/6">
            <Skeleton containerClassName="w-full" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    Array.from({ length: 3 }).map((_, idx) => {
      return <PostSkeleton key={idx} />
    })
  )
}

export default Fallback