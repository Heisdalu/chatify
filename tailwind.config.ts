import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "976px", xl: "1440px" },
    container: {
      // padding: {
      //   DEFAULT: "1rem",
      //   sm: "1rem",
      //   lg: "4rem",
      //   xl: "5rem",
      //   "2xl": "6rem",
      // },
    },

    extend: {
      borderColor: {
        1: "#000",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
