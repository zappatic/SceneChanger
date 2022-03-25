module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-in-top": {
          "0%": { transform: "translateY(-1000px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-out-top": {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "100%": { transform: "translateY(-1000px)", opacity: 0 },
        },
      },
      animation: {
        "slide-in-top": "slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-out-top": "slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
      },
      colors: {
        twitch: {
          0: "#6441a5",
        },
      },
    },
  },
  plugins: [],
};
