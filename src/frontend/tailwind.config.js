/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

import plugin from "tailwindcss/plugin";

// ! Check if removing the other module.exports made sense
module.exports = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}",
  ],
  safelist: [
    "bg-status-blue",
    "bg-status-green",
    "bg-status-red",
    "bg-status-yellow",
  ],
  important: true,
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'my-size': '1800px',
        'my-size-lg': '2200px'
      },
      colors: {
        "search-input": "var(--search-input)",
        "background-new": "var(--background-new)",
        "prompt-description": "var(--text-prompt)",
        "background-prompt": "var(--background-prompt)",
        "text-answer": "var(--text-answer)",
        "header-icon": "var(--header-icon)",
        "nav-hover": "var(--nav-hover)",
        "background-tip": "var(--background-tip)",
        "background-tip-darkhover": "var(--background-tip-darkhover)",
        "background-main-content": "var(--background-main-content)",
        "background-main": "var(--background-main)",
        "button": "var(--button)",
        "login-input": "var(--login-input)",
        "tx-color": "var(--text-color)",
        "background-login": "var(--background-login)",
        "background-dark": "var(--background)",
        "component-icon": "var(--component-icon)",
        "flow-icon": "var(--flow-icon)",
        "low-indigo": "var(--low-indigo)",
        "chat-send": "var(--chat-send)",
        connection: "var(--connection)",
        "almost-dark-gray": "var(--almost-dark-gray)",
        "almost-light-blue": "var(--almost-light-blue)",
        "almost-medium-blue": "var(--almost-medium-blue)",
        "almost-medium-gray": "var(--almost-medium-gray)",
        "almost-medium-green": "var(--almost-medium-green)",
        "almost-medium-red": "var(--almost-medium-red)",
        "btn-shadow": "var(--round-btn-shadow)",
        "build-trigger": "var(--build-trigger)",
        "chat-trigger": "var(--chat-trigger)",
        "chat-trigger-disabled": "var(--chat-trigger-disabled)",
        "blur-shared": "var(--blur-shared)",
        "dark-blue": "var(--dark-blue)",
        "dark-gray": "var(--dark-gray)",
        "dark-red": "var(--dark-red)",
        "error-background": "var(--error-background)",
        "error-foreground": "var(--error-foreground)",
        "high-dark-gray": "var(--high-dark-gray)",
        "high-indigo": "var(--high-indigo)",
        "high-light-gray": "var(--high-light-gray)",
        "info-background": "var(--info-background)",
        "info-foreground": "var(--info-foreground)",
        "light-blue": "var(--light-blue)",
        "light-gray": "var(--light-gray)",
        "light-slate": "var(--light-slate)",
        "medium-blue": "var(--medium-blue)",
        "status-blue": "var(--status-blue)",
        "medium-dark-gray": "var(--medium-dark-gray)",
        "medium-dark-green": "var(--medium-dark-green)",
        "medium-dark-red": "var(--medium-dark-red)",
        "medium-emerald": "var(--medium-emerald)",
        "medium-gray": "var(--medium-gray)",
        "medium-high-indigo": "var(--medium-high-indigo)",
        "medium-indigo": "var(--medium-indigo)",
        "medium-low-gray": "var(--medium-low-gray)",
        "status-green": "var(--status-green)",
        "status-red": "var(--status-red)",
        "status-yellow": "var(--status-yellow)",
        "success-background": "var(--success-background)",
        "success-foreground": "var(--success-foreground)",
        "beta-background": "var(--beta-background)",
        "beta-foreground": "var(--beta-foreground)",
        "chat-bot-icon": "var(--chat-bot-icon)",
        "chat-user-icon": "var(--chat-user-icon)",
        "black-button": "hsl(var(--black-button))",
        white: "var(--white)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input)/0.15)",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".truncate-multiline": {
          display: "-webkit-box",
          "-webkit-line-clamp":
            "3" /* Change this number to the number of lines you want to show */,
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          "text-overflow": "ellipsis",
        },
        ".truncate-doubleline": {
          display: "-webkit-box",
          "-webkit-line-clamp":
            "2" /* Change this number to the number of lines you want to show */,
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          "text-overflow": "ellipsis",
        },
        ".word-break-break-word": {
          wordBreak: "break-word",
        },
        ".arrow-hide": {
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
        ".password": {
          "-webkit-text-security": "disc",
          "font-family": "text-security-disc",
        },
        ".stop": {
          "-webkit-animation-play-state": "paused",
          "-moz-animation-play-state": "paused",
          "animation-play-state": "paused",
        },
        ".custom-scroll": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "999px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bbb",
          },
          cursor: "auto",
        },
        ".dark .theme-attribution .react-flow__attribution": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "0px 5px",
        },
        ".dark .theme-attribution .react-flow__attribution a": {
          color: "black",
        },
        ".text-align-last-left": {
          "text-align-last": "left",
        },
        ".text-align-last-right": {
          "text-align-last": "right",
        },
      });
    }),
    require("@tailwindcss/typography")
  ],
};
