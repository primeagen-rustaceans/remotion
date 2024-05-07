import { loadFonts } from "./base";

export const getInfo = () => ({
   "fontFamily": "Atma",
   "importName": "Atma",
   "version": "v16",
   "url": "https://fonts.googleapis.com/css2?family=Atma:ital,wght@0,300;0,400;0,500;0,600;0,700",
   "unicodeRanges": {
      "bengali": "U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0, U+1CD2, U+1CD5-1CD6, U+1CD8, U+1CE1, U+1CEA, U+1CED, U+1CF2, U+1CF5-1CF7, U+200C-200D, U+20B9, U+25CC, U+A8F1",
      "latin-ext": "U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
      "latin": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
   },
   "fonts": {
      "normal": {
         "300": {
            "bengali": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo8JzGiI3P8ed.woff2",
            "latin-ext": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo8JzGj43P8ed.woff2",
            "latin": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo8JzGjA3Pw.woff2"
         },
         "400": {
            "bengali": "https://fonts.gstatic.com/s/atma/v16/uK_84rqWc-Eoq3tRDw8W.woff2",
            "latin-ext": "https://fonts.gstatic.com/s/atma/v16/uK_84rqWc-Eoq2dRDw8W.woff2",
            "latin": "https://fonts.gstatic.com/s/atma/v16/uK_84rqWc-Eoq2lRDw.woff2"
         },
         "500": {
            "bengali": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo5pyGiI3P8ed.woff2",
            "latin-ext": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo5pyGj43P8ed.woff2",
            "latin": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo5pyGjA3Pw.woff2"
         },
         "600": {
            "bengali": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo7Z1GiI3P8ed.woff2",
            "latin-ext": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo7Z1Gj43P8ed.woff2",
            "latin": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo7Z1GjA3Pw.woff2"
         },
         "700": {
            "bengali": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo9J0GiI3P8ed.woff2",
            "latin-ext": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo9J0Gj43P8ed.woff2",
            "latin": "https://fonts.gstatic.com/s/atma/v16/uK_z4rqWc-Eoo9J0GjA3Pw.woff2"
         }
      }
   }
})

export const fontFamily = "Atma" as const;

type Variants = {
  normal: {
    weights: '300' | '400' | '500' | '600' | '700',
    subsets: 'bengali' | 'latin' | 'latin-ext',
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

