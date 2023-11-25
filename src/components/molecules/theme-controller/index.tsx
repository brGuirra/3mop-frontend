import { Moon, Sun } from "phosphor-react";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

export const ThemeController = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    themeChange(false);

    const theme = localStorage.getItem("theme");

    document.documentElement.setAttribute("data-theme", theme || "light");

    setIsDark(theme === "dark");
  }, []);

  const handleThemeChange = () => {
    themeChange(true);

    setIsDark(!isDark);
  };

  return (
    <label className="flex cursor-pointer gap-2">
      <Sun weight="bold" size={20} />
      <input
        type="checkbox"
        value="synthwave"
        checked={isDark}
        onChange={() => handleThemeChange()}
        data-toggle-theme="light,dark"
        className="toggle theme-controller"
      />
      <Moon weight="bold" size={20} />
    </label>
  );
};
