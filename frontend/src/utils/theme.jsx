import { createTheme } from '@mui/material/styles';
import Constants from './Constants';

const theme = createTheme({
  props: {
    TextField: {
      size: "small",
    }
  },
  palette: {
    primary: {
      light: Constants.primaryLight,
      main: Constants.primaryMain,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {

      main: Constants.secondaryMain,
      // dark: will be calculated from palette.secondary.main,

    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    frame: {

      main: '#F3F3F3',

    },
    label: {

      main: '#444',

    },

    body: {

      main: '#3F3F3D',

    },


  },
  typography: {
    fontFamily: "Roboto",
    fontSize: Constants.bodyFontSize,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: Constants.titleStyle,
    h2: Constants.titleStyle,
    subtitle1: {
      fontSize: Constants.bodyFontSize,
      fontWeightBold: 700,
      fontWeight: 'bold',
      textAlign: "start",
    },
    p: {
      fontSize: Constants.bodyFontSize,
      textAlign: "start",
    }
  },

  components: {

    MuiTypography: {
      defaultProps: {
        sx: {
         mt: {xs:'3em', md:'1em'},
        },
      },
    },


    MuiTextField: {
      defaultProps: {
        size: 'small',
        inputProps: { style: { fontSize: Constants.bodyFontSize } },
        InputProps: { style: { fontSize: Constants.bodyFontSize } },

      },
      styleOverrides: {
        root: {
          '--TextField-brandBorderHoverColor': "primary",
          '& label.Mui-focused': {
            color: "label",

          },
        },
      },
    },

    MuiStack: {
      defaultProps: {
        spacing: 2,
      },
      
    },


    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: Constants.bodyFontSize
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: Constants.bodyFontSize
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: Constants.bodyFontSize
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "2rem",
          margin: "0.2em",
        },
      },
    },


    MuiButton: {
      defaultProps: {
        color: 'secondary',
      },
      styleOverrides: {

        root: {
          background: 'secondary',
          borderRadius: '8px',
          minHeight: '3.6em',
          maxWidth: '41.6em',
          fontSize: Constants.bodyFontSize,
        },
      },
    },


    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: Constants.primaryMain,

        }
      }
    }


  }

});


export default theme;