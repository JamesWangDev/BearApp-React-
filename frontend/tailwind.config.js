module.exports = {
  theme: {
    extend: {
      spacing: {
        "600": "600px",
      },
      colors: {
        modal: "rbga(0, 0, 0, 0.6)",
      },
      inset: {
        "-16": "-4rem",
      },
    },
  },
  variants: {
    opacity: ["responsive", "group-hover", "hover", "focus"],
  },
  plugins: [],
};
