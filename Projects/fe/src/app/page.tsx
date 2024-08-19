import WelcomeCanvas from "./_components/r3f/WelcomeCanvas";
import Github from "@/_assets/images/github.svg?react";
import Gmail from "@/_assets/images/gmail.svg?react";

import { useEffect, useState } from "react";

const Blog = () => {
    const [, setTriggerRender] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setTriggerRender((prev) => !prev);
        });
    }, []);

    const fontSize = window.getComputedStyle(document.documentElement).fontSize;

    return (
        <div className="h-full flex flex-col bg-body dark:bg-[#101010] font-['Pretendard']">
            <div className="min-h-[100svh] w-full flex flex-col sm:flex-row mx-auto my-auto gap-3 justify-center max-w-[90rem]">
                <div
                    className="max-w-full sm:w-1/2 sm:h-full sm:max-h-full px-3 sm:px-0 my-auto"
                    style={{
                        height: `${
                            parseInt(fontSize) * 40 > innerWidth
                                ? outerHeight * 0.3
                                : innerHeight
                        }px`,
                    }}
                >
                    <WelcomeCanvas />
                </div>

                <div
                    className="sm:w-1/2 sm:max-h-none sm:my-auto px-4 sm:px-0 pb-10 sm:pb-0
                    flex flex-col justify-center"
                >
                    <article
                        className="text-base sm:text-xl font-light dark:font-extralight whitespace-pre-wrap text-pretty sm:leading-7
                        text-default-13-dark dark:text-default-5"
                    >
                        <Blog.Introduction />
                    </article>

                    {/* Buttons */}
                    <div className="space-x-4 mt-5">
                        <a
                            title="Github"
                            target="_blank"
                            href="https://github.com/jeheecheon"
                            className="w-9 inline-block"
                        >
                            <Github className="rounded-lg shadow-lg fill-gray-700 dark:fill-gray-800" />
                        </a>

                        <a
                            title="Github"
                            href="mailto:jeheecheon@gmail.com"
                            className="w-9 inline-block text-stone-300/30 rounded-lg shadow-lg dark:text-stone-100"
                        >
                            <Gmail />
                        </a>

                        <a
                            href="https://blog.jeheecheon.com"
                            className="underline underline-offset-2 text-sm text-orange-400/80 decoration-[0.01rem]"
                            target="_blank"
                        >
                            블로그 바로가기
                        </a>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

Blog.Introduction = () => {
    return (
        <>
            <div className="flex">
                <p>안녕하세요?</p>
                <div className="animate-wave">👋</div>
            </div>

            <p className="h-4" />

            <div className="">
                <p className="inline underline decoration-[0.1rem] decoration-orange-400 underline-offset-4">{`'코드의 깊이'`}</p>
                <p className="inline">{` 를 중시하는 프론트엔드 개발자 천제희입니다.`}</p>
                <p>
                    {`단순한 기능구현을 넘어서, 동작원리를 파헤치고 이해하는 것을 사랑하는 사람입니다.😍`}
                </p>
            </div>

            <p className="h-4" />

            <p>
                웹쟁이 개발자로서, 웹에 관한 전반적인 지식을 공유하고 있습니다.
            </p>
        </>
    );
};

export default Blog;
