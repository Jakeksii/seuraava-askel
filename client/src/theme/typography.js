// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

export const primaryFont = 'Poppins, sans-serif';
export const secondaryFont = 'Barlow, sans-serif';

// ----------------------------------------------------------------------

export const typography = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(38),
    ...responsiveFontSizes({ sm: 46, md: 52, lg: 58 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(30),
    ...responsiveFontSizes({ sm: 36, md: 40, lg: 44 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.2,
    fontSize: pxToRem(24), // increased from 24
    ...responsiveFontSizes({ sm: 28, md: 32, lg: 34 }), // adjusted sizes
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.2,
    fontSize: pxToRem(20), // increased from 20
    ...responsiveFontSizes({ sm: 22, md: 26, lg: 26 }), // adjusted sizes
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.2,
    fontSize: pxToRem(18), // increased from 18
    ...responsiveFontSizes({ sm: 21, md: 22, lg: 22 }), // adjusted sizes
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17), // increased from 17
    ...responsiveFontSizes({ sm: 20, md: 20, lg: 20 }), // adjusted sizes
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18), // increased from 16
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(16), // increased from 14
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16), // increased from 16
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(16), // increased from 14
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(14), // increased from 12
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(14), // increased from 12
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(16), // increased from 14
    textTransform: 'unset',
  },
};
