import React, { useState, useEffect } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";

export default function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);
    const scrollContainer = document.querySelector(".custom-scrollbar");

    const toggleVisibility = () => {
        if (scrollContainer) {
            setIsVisible(scrollContainer.scrollTop > 100);
        } else {
            setIsVisible(window.scrollY > 100);
        }
    };

    const scrollToTop = () => {
        if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", toggleVisibility);
            return () => scrollContainer.removeEventListener("scroll", toggleVisibility);
        } else {
            window.addEventListener("scroll", toggleVisibility);
            return () => window.removeEventListener("scroll", toggleVisibility);
        }
    }, []);

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed w-[55px] h-[55px] bottom-10 right-7 bg-lime-500 text-white 
                        p-3 rounded-[15px] shadow-xl transition duration-300 
                        hover:bg-lime-600 dark:bg-gray-600 dark:border dark:border-white 
                        dark:hover:bg-slate-600 dark:hover:text-white"
                >
                    <IoMdArrowRoundUp className="w-full h-full" />
                </button>
            )}
        </div>
    );
}