import React, { useState, useCallback, useEffect } from 'react';
import { Typography } from '@mui/material';

export const ShutdownScreen = () => {
	const [timeRemaining, setTimeRemaining] = useState(0);
	const parseTimer = useCallback(() => {
		const minutes = Math.floor(timeRemaining / 60);
		const seconds = Math.floor(timeRemaining % 60);
		return [
			minutes > 9 ? minutes : '0' + minutes,
			seconds > 9 ? seconds : '0' + seconds,
		].join(':');
	}, [timeRemaining]);
	const updateTimer = () => {
		setTimeRemaining((count) => count - 1);
	};
	useEffect(() => {
		setTimeRemaining(60);
		window.setInterval(() => {
			updateTimer();
		}, 1000);
	}, []);
	return (
		<>
			<Typography variant="h1">
				This application will shut down in {parseTimer()}
			</Typography>
		</>
	);
};
