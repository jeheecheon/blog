import { Link } from "react-router-dom";
import MusicController from "@/blog/_components/MusicController";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <section
            className={`border-t-[1px] border-t-default-8 dark:border-t-default-8-dark 
            flex flex-col items-center pt-[30px] pb-[60px]
            ${className}`}
        >
            <MusicController className="mb-[20px]" />

            <div className="mt-7 flex flex-col items-center">
                <span className="flex items-end italic">
                    <span className="text-base font-semibold text-default-16-dark dark:text-default-6 dark:font-bold">
                        BLOG
                    </span>
                    <span className="text-lg text-orange-400 mx-[2px] font-extrabold">
                        :
                    </span>
                    <span className="text-2xl text-orange-400 font-medium dark:font-bold">jeheecheon</span>
                </span>

                <span className="mt-1 italic text-default-16-dark dark:text-default-6">
                    백엔드 개발을 주로 다루는 블로그입니다.
                </span>

                <span className="mt-6 text-sm">
                    All designed and developed by&#160;
                    <span className="text-orange-400 font-bold">
                        <Link
                            to="/blog/post/edit"
                            className="cursor-text animate-blur-in-out"
                        >
                            "나, 천제희"
                        </Link>
                    </span>
                </span>

                <span className="mt-1 text-default-18 dark:text-default-16-dark text-sm">
                    © 2024-present Jehee Cheon. All Rights Reserved.
                </span>
            </div>
        </section>
    );
};

export default Footer;
