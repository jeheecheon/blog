import { Link } from "react-router-dom";
import MusicController from "@/blog/_components/MusicController";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer
            className={`border-t-[1px] border-t-default-8 dark:border-t-default-8-dark
            flex flex-col items-center pt-[30px] pb-[30px] 
            ${className}`}
        >
            <MusicController className="mb-[20px]" />

            <p className="mt-7 italic text-xs md:text-sm text-default-18-dark dark:text-default-6">
                개발개발개발🐶
            </p>
            <div className="flex items-end">
                <span className="text-xs md:text-base font-semibold dark:font-bold text-gray-500 dark:text-default-6 italic">
                    BLOG
                </span>
                <span className="text:xs md:text-lg text-orange-400 mx-[2px] font-extrabold italic">
                    :
                </span>
                <span className="text-xl md:text-2xl text-orange-400 font-medium dark:font-bold italic underline md:underline-offset-2">
                    jeheecheon
                </span>
            </div>

            <div className="flex mt-4 text-xs md:text-sm">
                <p className="text-default-18-dark dark:text-default-6">All designed and developed by&#160;</p>
                <Link
                    to="/blog/post/edit"
                    className="cursor-text animate-blur-in-out text-orange-400 font-bold"
                >
                    "나, 천제희"
                </Link>
            </div>

            <p className="text-default-18 dark:text-default-16-dark text-xs md:text-sm">
                © 2024-present Jehee Cheon. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
