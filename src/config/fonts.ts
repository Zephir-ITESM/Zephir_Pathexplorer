import localFont from "next/font/local"

// Load Graphik as a local font with all available weights and styles
export const fontSans = localFont({
  src: [
    // Thin
    {
      path: "../../public/fonts/Graphik-Thin-Trial.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-ThinItalic-Trial.otf",
      weight: "100",
      style: "italic",
    },
    // Extralight
    {
      path: "../../public/fonts/Graphik-Extralight-Trial.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-ExtralightItalic-Trial.otf",
      weight: "200",
      style: "italic",
    },
    // Light
    {
      path: "../../public/fonts/Graphik-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-LightItalic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    // Regular
    {
      path: "../../public/fonts/Graphik-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-RegularItalic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    // Medium
    {
      path: "../../public/fonts/Graphik-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-MediumItalic-Trial.otf",
      weight: "500",
      style: "italic",
    },
    // Semibold
    {
      path: "../../public/fonts/Graphik-Semibold-Trial.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-SemiboldItalic-Trial.otf",
      weight: "600",
      style: "italic",
    },
    // Bold
    {
      path: "../../public/fonts/Graphik-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-BoldItalic-Trial.otf",
      weight: "700",
      style: "italic",
    },
    // Black
    {
      path: "../../public/fonts/Graphik-Black-Trial.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-BlackItalic-Trial.otf",
      weight: "800",
      style: "italic",
    },
    // Super
    {
      path: "../../public/fonts/Graphik-Super-Trial.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Graphik-SuperItalic-Trial.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
})

// Export the font variable for use in layout
export const fontVariables = fontSans.variable
