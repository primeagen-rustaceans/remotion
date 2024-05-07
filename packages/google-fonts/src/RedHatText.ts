import { loadFonts } from "./base";

export const getInfo = () => ({
   "fontFamily": "Red Hat Text",
   "importName": "RedHatText",
   "version": "v14",
   "url": "https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700",
   "unicodeRanges": {
      "latin-ext": "U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
      "latin": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
   },
   "fonts": {
      "italic": {
         "300": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZchO8i5PA.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZcvO8g.woff2"
         },
         "400": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZchO8i5PA.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZcvO8g.woff2"
         },
         "500": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZchO8i5PA.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZcvO8g.woff2"
         },
         "600": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZchO8i5PA.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZcvO8g.woff2"
         },
         "700": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZchO8i5PA.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQJbohi_ic6B3yVSzGBrMxQbZcvO8g.woff2"
         }
      },
      "normal": {
         "300": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQZqctI8w.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQaKct.woff2"
         },
         "400": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQZqctI8w.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQaKct.woff2"
         },
         "500": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQZqctI8w.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQaKct.woff2"
         },
         "600": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQZqctI8w.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQaKct.woff2"
         },
         "700": {
            "latin-ext": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQZqctI8w.woff2",
            "latin": "https://fonts.gstatic.com/s/redhattext/v14/RrQXbohi_ic6B3yVSzGBrMxQaKct.woff2"
         }
      }
   }
})

export const fontFamily = "Red Hat Text" as const;

type Variants = {
  italic: {
    weights: '300' | '400' | '500' | '600' | '700',
    subsets: 'latin' | 'latin-ext',
  },
  normal: {
    weights: '300' | '400' | '500' | '600' | '700',
    subsets: 'latin' | 'latin-ext',
  },
};

export const loadFont = <T extends keyof Variants>(
  style?: T,
  options?: {
    weights?: Variants[T]['weights'][];
    subsets?: Variants[T]['subsets'][];
    document?: Document;
  }
) => { 
  return loadFonts(getInfo(), style, options);
};

