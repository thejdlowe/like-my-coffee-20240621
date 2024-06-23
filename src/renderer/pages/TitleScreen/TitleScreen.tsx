import { useEffect } from 'react';
import { Image, ImageScreen } from '../ImageScreen';
import { logo } from '../../media';
import { useNavigate } from 'react-router-dom';

export const TitleScreen = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const screensave = setTimeout(() => {
			navigate('/screensaver');
		}, 60000);
		return () => {
			clearTimeout(screensave);
		};
	}, []);
	return (
		<ImageScreen>
			<Image key="logo" ImgKey="logo" src={logo} />
		</ImageScreen>
	);
};
