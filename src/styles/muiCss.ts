export const globalCss = {
  widgetCardContainer: {
    boxShadow: "5px 4px 9px 1px rgba(147, 203, 255, 0.14)",
    border: "1px solid  rgba(147, 203, 255, 0.14)",
    height: "100%",
  },
  cardBorderColorCss: {
    boxShadow: "15px 20px 40px -32px rgba(208,242,254,1)",
    border: "1px solid #d0f2fe",
  },
  hideScrollBarCss: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
    },

    scrollbarWidth: "thin", // For Firefox
    scrollbarColor: "transparent transparent",
  },
};
