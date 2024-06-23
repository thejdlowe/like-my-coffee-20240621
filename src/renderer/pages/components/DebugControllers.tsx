import { Box, Grid, Typography, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { whichControllerIsWhich } from '../../consts';
import { useAppContext } from '../../appContext';

export const DebugControllers = ({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) => {
	const { buttonPressed } = useAppContext();
	const [showGreenColumn, setShowGreenColumn] = useState<boolean>(false);
	const [showRedColumn, setShowRedColumn] = useState<boolean>(false);
	const [showBlueColumn, setShowBlueColumn] = useState<boolean>(false);
	const [showYellowColumn, setShowYellowColumn] = useState<boolean>(false);

	useEffect(() => {
		if (buttonPressed) {
			if (buttonPressed.bigButton) {
				if (
					buttonPressed.whichController ===
					whichControllerIsWhich.PLAYER_ONE
				) {
					setShowGreenColumn(true);
				}
				if (
					buttonPressed.whichController ===
					whichControllerIsWhich.PLAYER_TWO
				) {
					setShowRedColumn(true);
				}

				if (
					buttonPressed.whichController ===
					whichControllerIsWhich.PLAYER_THREE
				) {
					setShowYellowColumn(true);
				}

				if (
					buttonPressed.whichController ===
					whichControllerIsWhich.HOST
				) {
					setShowBlueColumn(true);
				}
			}
		}
	}, [
		buttonPressed,
		showGreenColumn,
		showRedColumn,
		showBlueColumn,
		showYellowColumn,
		setShowBlueColumn,
		setShowGreenColumn,
		setShowRedColumn,
		setShowYellowColumn,
	]);
	return (
		<>
			<Container
				sx={{
					position: 'absolute',
					display: 'block',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				}}
				maxWidth={false}
			></Container>
			{children}
		</>
	);
};
