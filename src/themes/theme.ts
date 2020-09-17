import { createMuiTheme } from '@material-ui/core/styles';

interface Color {
  main: string;
  light: string;
  dark: string;
}

interface ColorPallete {
  [key: string]: Color;
}

export const colors: ColorPallete = {
  orange: {
    main: '#FF523B',
    light: '#FF8667',
    dark: '#C41010'
  },
  lightBlue: {
    main: '#3be8ff',
    light: '#81FFFF',
    dark: '#00B5CC'
  }
};

const theme = createMuiTheme({
  palette: {
    primary: colors.orange,
    secondary: colors.lightBlue
  }
});

export default theme;
