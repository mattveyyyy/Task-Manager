import type { Preview } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { darkTheme } from "../src/app/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Story />
        </LocalizationProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
