import { ShowType } from '../show.type';
import { playerImages } from '../../media';

export const show: ShowType = {
	Round1: {
		minigame: 'Time Lines',
		players: [
			{
				displayName: 'Chris F.',
				fullName: 'Chris Fay',
				imagePath: playerImages.RB,
				pronouns: 'He/Him',
				sound: 0,
			},
			{
				displayName: 'Heather',
				fullName: 'Heather Scott',
				imagePath: playerImages.Heather,
				pronouns: 'She/Her',
				sound: 1,
			},
			{
				displayName: 'Motts',
				fullName: 'The Motts',
				imagePath: playerImages.Motts,
				pronouns: 'He/Him',
				sound: 2,
			},
		],
	},
	Round2: {
		minigame: 'Acronympho',
		players: [
			{
				displayName: 'Chris H.',
				fullName: 'Chris Heiberger',
				imagePath: playerImages.ChrisH,
				pronouns: 'He/Him',
				sound: 3,
			},
			{
				displayName: 'Q',
				fullName: 'Chakra Quan',
				imagePath: playerImages.Chakra,
				pronouns: 'She/Her',
				sound: 4,
			},
			{
				displayName: 'Kaley',
				fullName: 'Kaley Michelle',
				imagePath: playerImages.Kaley,
				pronouns: 'She/Her',
				sound: 5,
			},
		],
	},
	Round3: {
		minigame: 'Sexy Slogans',
		players: [
			{
				displayName: 'Rob',
				fullName: 'Rob Moore',
				imagePath: playerImages.Rob,
				pronouns: 'He/Him',
				sound: 6,
			},
			{
				displayName: 'Anthony',
				fullName: 'Lord Anthony Windsor II',
				imagePath: playerImages.Anthony,
				pronouns: 'He/Him',
				sound: 7,
			},
			{
				displayName: 'Hannah',
				fullName: 'Hannah Romes',
				imagePath: playerImages.Hannah,
				pronouns: 'She/Her',
				sound: 8,
			},
		],
	},
};
