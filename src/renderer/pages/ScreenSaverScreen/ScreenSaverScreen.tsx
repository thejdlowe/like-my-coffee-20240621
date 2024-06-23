import { Image, ImageScreen } from '../ImageScreen';
import { playerImages } from '../../media';

export const ScreenSaverScreen = () => {
	const images = () => {
		const holders = [];
		for (const key in playerImages) {
			holders.push(
				// @ts-ignore
				<Image key={key} ImgKey={key} src={playerImages[key]} />,
			);
		}
		return holders;
	};
	return <ImageScreen>{images()}</ImageScreen>;
};
