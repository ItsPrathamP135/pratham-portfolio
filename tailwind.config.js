export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false, // ✅ Disable Tailwind reset
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
