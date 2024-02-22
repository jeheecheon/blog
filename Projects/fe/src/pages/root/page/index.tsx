import Button from "@/common/components/Button";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-7">
        <div>
          페이지 공사중...
        </div>
        <div>
          포트폴리오 요약 페이지
        </div>
        <Button className="dark:text-default-3-dark">
          <Link to="/blog/recent-posts/pages/1">
            블로그로 가기
          </Link>
        </Button>
      </div>

      <Outlet />
    </>
  )
}

export default Root;
