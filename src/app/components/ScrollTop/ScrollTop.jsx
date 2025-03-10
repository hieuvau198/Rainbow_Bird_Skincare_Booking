// ScrollTop.jsx
import React, { useState, useEffect } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";

export default function ScrollTop({ scrollContainerRef }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (scrollContainerRef.current) {
            if (scrollContainerRef.current.scrollTop > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
    };

    const scrollToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", toggleVisibility);
            return () => container.removeEventListener("scroll", toggleVisibility);
        }
    }, [scrollContainerRef]);

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed w-[55px] h-[55px] bottom-6 right-7 bg-lime-500 text-white 
                        p-3 rounded-full shadow-xl transition duration-300 
                        hover:bg-lime-600 dark:bg-gray-600 dark:border dark:border-white 
                        dark:hover:bg-slate-600 dark:hover:text-white"
                >
                    <IoMdArrowRoundUp className="w-full h-full" />
                </button>
            )}
        </div>
    );
}