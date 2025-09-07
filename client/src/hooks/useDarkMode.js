// src/hooks/useDarkMode.js
import { useState, useEffect, useCallback } from "react";

export default function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle("dark", next);
            localStorage.setItem("theme", next ? "dark" : "light");
            return next;
        });
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    return { isDarkMode, toggleDarkMode };
}
