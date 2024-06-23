import { findByIds } from 'usb';
import { BrowserWindow } from 'electron';

const DEVICE_INFO = {
	vendorId: 1118,
	productId: 672,
	interfaceId: 0,
	endpointId: 0,
};

export const initiateIRReceiver = async (mainWindow: BrowserWindow) => {
	const legacyDevice = findByIds(DEVICE_INFO.vendorId, DEVICE_INFO.productId);
	let canAccept = false;
	const lastValue = '';
	if (legacyDevice) {
		legacyDevice.open();

		const legacyInterface =
			// @ts-ignore
			legacyDevice?.interfaces[DEVICE_INFO.interfaceId];

		if (legacyInterface.isKernelDriverActive()) {
			legacyInterface.detachKernelDriver();
		}

		const inEndpoint = legacyInterface.endpoints[DEVICE_INFO.endpointId];

		inEndpoint.on('data', (usbEvent: any) => {
			const dataView = new Uint8Array(usbEvent);
			const whichController = dataView[2];
			const buttonsPressed = dataView[4];
			const altButtonsPressed = dataView[3];
			const startButton = !!(altButtonsPressed & 0x10);
			const backButton = !!(altButtonsPressed & 0x20);
			const XboxButton = !!(buttonsPressed & 0x04);
			const bigButton = !!(buttonsPressed & 0x08);
			const AButton = !!(buttonsPressed & 0x10);
			const BButton = !!(buttonsPressed & 0x20);
			const XButton = !!(buttonsPressed & 0x40);
			const YButton = !!(buttonsPressed & 0x80);
			mainWindow?.webContents.send('button-pressed', {
				whichController,
				startButton,
				backButton,
				XboxButton,
				bigButton,
				AButton,
				BButton,
				XButton,
				YButton,
			});
		});

		inEndpoint.on('error', (err: any) => {
			console.log('Error', err);
		});
		// @ts-ignore
		inEndpoint.startPoll();
	}
};
