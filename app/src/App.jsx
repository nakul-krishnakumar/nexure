import './App.css'
import HomePage from "./components/HomePage"

import { ThemeProvider } from "styled-components"
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: {
          main: '#5869fc',  // Blue
        },
        secondary: {
          main: '#f0f8ff',  // Pink
        },
        error: {
          main: '#f44336',  // Red
        },
        warning: {
          main: '#ff9800',  // Orange
        },
        info: {
          main: '#2196f3',  // Light Blue
        },
        success: {
          main: '#4caf50',  // Green
        },
        background: {
          dark: '#f5f5f5',  // Light Gray
          light: '#f0f8ff',  // Alice Blue
        },
        text: {
          primary: '#000',  // Black
          secondary: '#757575',  // Light Gray
        },
    },
})
const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <HomePage />
            </ThemeProvider>
        </>
    )
}

export default App;
