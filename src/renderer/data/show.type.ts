export type PlayerType = {
	displayName: string;
	fullName: string;
	pronouns: 'He/Him' | 'She/Her' | 'They/Them';
	imagePath: string;
	sound: number;
};

export type RoundType = {
	players: [PlayerType, PlayerType, PlayerType];
	minigame: string;
};

export type ShowType = {
	Round1: RoundType;
	Round2: RoundType;
	Round3: RoundType;
};
