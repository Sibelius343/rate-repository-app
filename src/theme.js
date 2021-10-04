import { Platform } from "react-native";

const theme = {
  colors: {
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
    repoItemBackground: 'white',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    error: '#d73a4a'
  },
  height: {
    appBarHeight: 56
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontSizes: {
    body: 14,
    subHeading: 16
  },
  fontWeights: {
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700'
  }
};

export default theme;