import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../appContext';
import { whichControllerIsWhich } from '../../consts';
import { Container, Box, LinearProgress } from '@mui/material';
import { PlayerColumn } from './components';
import { data } from '../../data';

export const GameScreen = () => {
	const timerRef = useRef<number | null>();
	const { round } = useParams();
	let playerData;
	let currentMiniGame;
	if (round === '1') {
		playerData = data.show.Round1.players;
		currentMiniGame = data.show.Round1.minigame;
	} else if (round === '2') {
		playerData = data.show.Round2.players;
		currentMiniGame = data.show.Round2.minigame;
	} else if (round === '3') {
		playerData = data.show.Round3.players;
		currentMiniGame = data.show.Round3.minigame;
	}
	const maxTimeRemaining = 60 * 10; //Ten minutes
	const [showMiniGame, setShowMiniGame] = useState<boolean>(false);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [progressBarColor, setProgressBarColor] = useState('green');
	const [progressText, setProgressText] = useState('Like My *Blank*');
	const [gameRunning, setGameRunning] = useState(true);
	const [canAcceptAnswers, setCanAcceptAnswers] = useState(true);
	const [playerAnswering, setPlayerAnswering] = useState<number | null>(null);
	const [playerOneScore, setPlayerOneScore] = useState<number>(0);
	const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);
	const [playerThreeScore, setPlayerThreeScore] = useState<number>(0);

	const updateTimer = () => {
		setTimeRemaining((count) => {
			if (count - 1 <= 0) {
				window.clearInterval(timerRef.current || 0);
				setGameRunning(false);
				const fileName = `./amongus.mp3`;

				const audioElement = new Audio(fileName);

				audioElement.preload = 'auto';

				audioElement.play();
				return 0;
			}
			return count - 1;
		});
	};

	useEffect(() => {
		setTimeRemaining(maxTimeRemaining);
		setGameRunning(true);
		const timerID = window.setInterval(() => {
			updateTimer();
		}, 1000);
		timerRef.current = timerID;
		return () => {
			window.clearInterval(timerRef.current || 0);
		};
	}, []);

	const { buttonPressed, resetButtonPressed } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (
			buttonPressed &&
			buttonPressed.whichController === whichControllerIsWhich.HOST &&
			buttonPressed.bigButton
		) {
			if (!gameRunning && !showMiniGame) {
				setShowMiniGame(true);
				setCanAcceptAnswers(false);
			}
		}
	}, [gameRunning, buttonPressed, setShowMiniGame, setCanAcceptAnswers]);

	const [hostAllowScore, setHostAllowScore] = useState(true);

	useEffect(() => {
		if (showMiniGame) {
			if (
				buttonPressed &&
				buttonPressed.whichController === whichControllerIsWhich.HOST &&
				hostAllowScore
			) {
				let addScore = false;
				if (buttonPressed.AButton) {
					addScore = true;
					setPlayerOneScore((prev) => prev + 5);
				}
				if (buttonPressed.BButton) {
					addScore = true;
					setPlayerTwoScore((prev) => prev + 5);
				}
				if (buttonPressed.YButton) {
					addScore = true;
					setPlayerThreeScore((prev) => prev + 5);
				}
				if (addScore) {
					setHostAllowScore(false);
					resetButtonPressed();
					setTimeout(() => {
						setHostAllowScore(true);
					}, 1000);
				}
			}
		}
	}, [showMiniGame, buttonPressed]);

	useEffect(() => {
		if (buttonPressed) {
			if (canAcceptAnswers) {
				if (
					buttonPressed.whichController !==
					whichControllerIsWhich.HOST
				) {
					setCanAcceptAnswers(false);
					setPlayerAnswering(buttonPressed.whichController);
				}
			} else {
				if (
					buttonPressed.whichController ===
					whichControllerIsWhich.HOST
				) {
					if (true === false) {
						//We will be changing this to a method Delaysia prefers
						let score = 0;

						if (buttonPressed.bigButton) score = 4;
						if (buttonPressed.AButton) score = 3;
						if (buttonPressed.BButton) score = 2;
						if (buttonPressed.XButton) score = 1;
						if (buttonPressed.YButton) score = 0;
						if (
							playerAnswering ===
							whichControllerIsWhich.PLAYER_ONE
						)
							setPlayerOneScore((prev) => prev + score);
						if (
							playerAnswering ===
							whichControllerIsWhich.PLAYER_TWO
						)
							setPlayerTwoScore((prev) => prev + score);
						if (
							playerAnswering ===
							whichControllerIsWhich.PLAYER_THREE
						)
							setPlayerThreeScore((prev) => prev + score);
						setCanAcceptAnswers(true);
						setPlayerAnswering(null);
					} else {
						if (buttonPressed.bigButton) {
							setCanAcceptAnswers(true);
							setPlayerAnswering(null);
						} else {
							if (hostAllowScore) {
								let scoreChanged = false;
								let score = 0;
								if (buttonPressed.AButton) {
									scoreChanged = true;
									score = +1;
								}
								if (buttonPressed.BButton) {
									scoreChanged = true;
									score = -1;
								}

								if (scoreChanged) {
									if (
										playerAnswering ===
										whichControllerIsWhich.PLAYER_ONE
									)
										setPlayerOneScore(
											(prev) => prev + score,
										);
									if (
										playerAnswering ===
										whichControllerIsWhich.PLAYER_TWO
									)
										setPlayerTwoScore(
											(prev) => prev + score,
										);
									if (
										playerAnswering ===
										whichControllerIsWhich.PLAYER_THREE
									)
										setPlayerThreeScore(
											(prev) => prev + score,
										);
									setHostAllowScore(false);
									resetButtonPressed();
									setTimeout(() => {
										setHostAllowScore(true);
									}, 600);
								}
							}
						}
					}
				}
			}
		}
	}, [buttonPressed, canAcceptAnswers]);

	useEffect(() => {
		const percentageTime = (timeRemaining / maxTimeRemaining) * 100;
		if (percentageTime <= 33) {
			setProgressText('Threesomes Are Like *Blank*');
			setProgressBarColor('red');
		} else if (percentageTime <= 66) {
			setProgressText('Sex With Me Is Like *Blank*');
			setProgressBarColor('yellow');
		} else {
			setProgressText('Like My *Blank*');
			setProgressBarColor('green');
		}
	}, [timeRemaining, setProgressBarColor]);

	useEffect(() => {
		if (round === '4') {
			navigate('/finalRound');
		}
	}, [round]);
	return (
		<Container maxWidth={false}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					width: '100%',
					height: '80vh',
				}}
			>
				<PlayerColumn
					playerNum={1}
					playerName={playerData ? playerData[0].displayName : ''}
					pronouns={playerData ? playerData[0].pronouns : ''}
					backgroundColor="#3cdb4e"
					score={playerOneScore}
					isActive={
						playerAnswering === whichControllerIsWhich.PLAYER_ONE
					}
					setActivePlayer={() => {
						setPlayerAnswering(whichControllerIsWhich.PLAYER_ONE);
					}}
					playSound={playerData ? playerData[0].sound : -1}
				/>
				<PlayerColumn
					playerNum={2}
					playerName={playerData ? playerData[1].displayName : ''}
					pronouns={playerData ? playerData[1].pronouns : ''}
					backgroundColor="#d04242"
					score={playerTwoScore}
					isActive={
						playerAnswering === whichControllerIsWhich.PLAYER_TWO
					}
					setActivePlayer={() => {
						setPlayerAnswering(whichControllerIsWhich.PLAYER_TWO);
					}}
					playSound={playerData ? playerData[1].sound : -1}
				/>
				<PlayerColumn
					playerNum={3}
					playerName={playerData ? playerData[2].displayName : ''}
					pronouns={playerData ? playerData[2].pronouns : ''}
					backgroundColor="#ecdb33"
					score={playerThreeScore}
					isActive={
						playerAnswering === whichControllerIsWhich.PLAYER_THREE
					}
					setActivePlayer={() => {
						setPlayerAnswering(whichControllerIsWhich.PLAYER_THREE);
					}}
					playSound={playerData ? playerData[2].sound : -1}
				/>
			</Box>
			<Box sx={{ height: '10vh', position: 'relative' }}>
				{!showMiniGame ? (
					<>
						<LinearProgress
							variant="determinate"
							value={(timeRemaining / maxTimeRemaining) * 100}
							sx={{
								'& .MuiLinearProgress-bar': {
									backgroundColor: progressBarColor,
								},
								height: '10vh',
							}}
						/>
						<Typography
							sx={{
								position: 'absolute',
								top: 0,
								left: '30%',
								transform: 'transformX(-50%)',
								'-webkit-text-stroke': '1px black',
								color: 'white !important',
								fontSize: '8vh',
								lineHeight: '1.4',
							}}
						>
							{progressText}
						</Typography>
					</>
				) : (
					<Typography variant="h1">{currentMiniGame}</Typography>
				)}
			</Box>
		</Container>
	);
};
