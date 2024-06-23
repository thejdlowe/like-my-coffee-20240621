import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
	GameScreen,
	ShutdownScreen,
	TitleScreen,
	ScreenSaverScreen,
	FinalRoundScreen,
} from './pages';
import { AppContextProvider } from './appContext';
import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
	CssBaseline,
} from '@mui/material';
import './App.css';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

export default function App() {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppContextProvider>
					<Routes>
						<Route path="/" element={<TitleScreen />} />
						<Route
							path="/screensaver"
							element={<ScreenSaverScreen />}
						/>
						<Route path="/game/:round" element={<GameScreen />} />
						<Route path="/shutdown" element={<ShutdownScreen />} />
						<Route
							path="/finalRound"
							element={<FinalRoundScreen />}
						/>
					</Routes>
				</AppContextProvider>
			</ThemeProvider>
		</Router>
	);
}
