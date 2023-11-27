import { Moon, Sun } from "phosphor-react";
import { useEffect, useState } from "react";

export const ThemeController = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsDark(isDark);
  }, []);

  const handleThemeChange = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    setIsDark(!isDark);
  };

  return (
    <label className="flex cursor-pointer gap-2">
      <Sun weight="bold" size={20} />
      <input
        id="themeController"
        type="checkbox"
        value="synthwave"
        checked={isDark}
        onChange={() => handleThemeChange()}
        className="toggle theme-controller"
      />
      <Moon weight="bold" size={20} />
    </label>
  );
};
