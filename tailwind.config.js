/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pt-serif": ["var(--font-pt-serif)", "sans-serif"], // ✅ benar
      },
      fontSize: {
        // Mobile first approach
        "heading-1": ["48px", { lineHeight: "110%", letterSpacing: "-2px" }],
        "heading-2": ["40px", { lineHeight: "110%", letterSpacing: "-2px" }],
        "heading-3": ["24px", { lineHeight: "130%", letterSpacing: "-0.8px" }],
      },
    },
  },
  plugins: [],
};
