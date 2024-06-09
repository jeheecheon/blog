import { Link } from "react-router-dom";
import MusicController from "@/blog/_components/MusicController";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer
            className={`border-t-[1px] border-t-default-8 dark:border-t-default-8-dark
            flex flex-col items-center pt-[30px] pb-[20px] 
            ${className}`}
        >
            <MusicController />
            
            <Link to="/blog" className="flex items-end mt-8">
                <span className="text-xs md:text-base font-semibold dark:font-bold text-gray-500/80 dark:text-default-6 italic">
                    BLOG
                </span>
                <span className="text:xs md:text-lg text-orange-400 mx-[2px] font-extrabold italic">
                    :
                </span>
                <span className="text-xl md:text-2xl text-orange-400 font-medium dark:font-bold italic underline md:underline-offset-2">
                    jeheecheon
                </span>
            </Link>

            <div className="flex mt-3 text-xs md:text-sm">
                <p className="text-gray-500/85 dark:text-default-6">All designed and developed by&#160;</p>
                <Link
                    to="/blog/post/edit"
                    className="cursor-text text-orange-400 font-bold"
                >
                    "jeheecheon"
                </Link>
            </div>

            <p className="text-gray-500/45 dark:text-default-16-dark text-xs md:text-sm">
                © 2024-present Jehee Cheon. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
