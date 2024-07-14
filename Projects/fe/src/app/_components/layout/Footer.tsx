import { Link } from "react-router-dom";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer
            className={`border-t-[0.0625rem] border-t-default-8 dark:border-t-default-8-dark
            flex flex-col items-center pt-[1.875rem] pb-[1.875rem]
            ${className}`}
        >
            <Link to="/" className="flex items-end">
                <span className="text-xs md:text-sm font-semibold dark:font-bold text-gray-500/80 dark:text-default-6 italic">
                    BLOG
                </span>
                <span className="text:xs md:text-lg text-orange-400/70 dark:text-orange-400 mx-[0.125rem] font-extrabold italic">
                    :
                </span>
                <span className="text-xl md:text-2xl text-orange-400/70 dark:text-orange-400 font-bold dark:font-bold italic md:underline-offset-2">
                    jeheecheon
                </span>
            </Link>

            <div className="flex mt-7 text-xs">
                <p className="text-gray-500/85 dark:text-default-6">
                    All designed and developed by&#160;
                </p>
                <Link
                    to="/post/edit"
                    className="cursor-text text-orange-400/70 dark:text-orange-400 font-bold"
                >
                    "jeheecheon"
                </Link>
            </div>

            <p className="mt-1 text-gray-500/45 dark:text-default-16-dark text-xs">
                © 2024-present Jehee Cheon. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
