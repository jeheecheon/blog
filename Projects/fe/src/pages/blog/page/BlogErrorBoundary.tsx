import { useNavigate } from "react-router-dom";

import Layout from "./components/Layout";
import Button from "@/common/components/Button";
import ErrorBoundary from "@/common/components/ErrorBoundary";

// import poohImage from '@/common/assets/images/default/pooh.jpg'

const BlogErrorBoundary = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center relative -top-[90vh]">
                <ErrorBoundary />

                <div className="flex flex-col justify-center items-center mb-3 w">
                    <span>오류났다니까요?</span>
                    <span>뒤로 가세요!</span>
                </div>
                <Button onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}>
                    뒤로 가기✌️
                </Button>
            </div>
        </Layout>
    );
}

export default BlogErrorBoundary;
