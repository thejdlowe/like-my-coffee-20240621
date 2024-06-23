import { Grid, Typography } from '@mui/material';

export const FinalRoundScreen = () => {
	return (
		<>
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{
					minHeight: '100vh',
				}}
			>
				<Typography variant="h1">FINAL ROUND</Typography>
				<Typography variant="h2">Prop Line</Typography>
			</Grid>
		</>
	);
};
