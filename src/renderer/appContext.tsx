import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { whichControllerIsWhich } from './consts';

interface AppContextProviderProps {
	children?: React.ReactNode | React.ReactNode[];
}

const AppContext = createContext({
	buttonPressed: {
		whichController: 0,
		startButton: false,
		backButton: false,
		XboxButton: false,
		bigButton: false,
		AButton: false,
		BButton: false,
		XButton: false,
		YButton: false,
	},
	resetButtonPressed: () => {},
	playSound: () => {},
});

type ShowStates = 'beginning' | 'active' | 'shutdown';
interface ButtonPressedProps {
	whichController: 0 | 1 | 2 | 3;
	startButton: boolean;
	backButton: boolean;
	XboxButton: boolean;
	bigButton: boolean;
	AButton: boolean;
	BButton: boolean;
	XButton: boolean;
	YButton: boolean;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
	children,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;
	const [shuttingDown, setShuttingDown] = useState(false);
	const [buttonPressed, setButtonPressed] = useState<ButtonPressedProps>({
		whichController: 0,
		startButton: false,
		backButton: false,
		XboxButton: false,
		bigButton: false,
		AButton: false,
		BButton: false,
		XButton: false,
		YButton: false,
	});

	useEffect(() => {
		window.electronAPI.onButtonUpdate((value: ButtonPressedProps) => {
			setButtonPressed(value);
		});
	}, []);

	useEffect(() => {
		if (
			buttonPressed &&
			buttonPressed.whichController === whichControllerIsWhich.HOST &&
			buttonPressed.startButton &&
			buttonPressed.backButton
		) {
			if (!shuttingDown) {
				window.electron.ipcRenderer.sendMessage('shutdown');
				navigate('/shutdown');
				setShuttingDown(true);
			}
		}
	}, [buttonPressed, shuttingDown, setShuttingDown]);

	useEffect(() => {
		if (
			buttonPressed &&
			buttonPressed.whichController == whichControllerIsWhich.HOST &&
			buttonPressed.XboxButton &&
			pathname !== '/shutdown'
		) {
			navigate('/');
		}
	}, [buttonPressed, navigate]);

	const resetButtonPressed = useCallback(() => {}, []);

	const playSound = useCallback(() => {}, []);

	return (
		<AppContext.Provider
			value={{ buttonPressed, resetButtonPressed, playSound }}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const value = useContext(AppContext);
	return value;
};
