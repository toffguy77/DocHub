import plantuml from '@/helpers/plantuml';
import { normalizeResponse } from './helpers';

// if (process.env.VUE_APP_DOCHUB_MODE !== 'plugin') {
// 	var vscode = {
// 		postMessage: ({ command, content }) => {
// 			console.log(command, content);
// 		}
// 	};
// }

export function createMock(store) {
	const listeners = {};

	window.addEventListener('message', (event) => {
		const { command, content, error } = event?.data;

		if (command === 'response') {
			const { stringifedUri, value, type } = content;

			if (error) {
				listeners[stringifedUri].rej(error);
			} else {
				listeners[stringifedUri].res({ 
					data: normalizeResponse(type, value),
					headers: {
						'content-type': type === 'jgp' ? `image/${type}` : type
					}
				});
			}
		}

		if (command === 'updateFiles') {
			const { uri } = content;
			
			store.dispatch('init', uri);
		}
	});

	return {
		settings: {
			render: {
				external: false,
				server: 'https://www.plantuml.com/plantuml/svg/'
			}
		},
		goto: (source, entity, id) => {
			const stringifedContent = JSON.stringify({
				source,
				entity,
				id
			});

			vscode.postMessage({
				command: 'goto',
				content: stringifedContent
			});
		},
		initProject: (uri) => {
			// store.dispatch('init', uri);
			const stringifedUri = JSON.stringify(uri);

			vscode.postMessage({
				command: 'init',
				content: stringifedUri
			});
		},
		download: (content, title, description) => {
			const stringifedUri = JSON.stringify({
				content, title, description
			});

			vscode.postMessage({
				command: 'download',
				content: stringifedUri
			});
		},
		// messagePull: () => {
		// vscode.postMessage({
		// 	command: 'pull',
		// 	content: ''
		// });

		// return new Promise((res) => {
		// 	res();
		// });
		// vscode.postMessage({
		// 	command: 'pull',
		// 	content: ''
		// });
		// },
		reload: () => {
			vscode.postMessage({
				command: 'reload-force',
				content: ''
			});
		},
		renderPlantUML: (uml) => {
			const stringifedUri = JSON.stringify(plantuml.svgURL(uml));

			vscode.postMessage({
				command: 'plantuml',
				content: stringifedUri
			});

			return new Promise((res, rej) => {
				listeners[stringifedUri] = { res, rej };
			});	
		},
		request(uri) {
			const stringifedUri = JSON.stringify(uri);

			vscode.postMessage({
				command: 'request',
				content: stringifedUri
			});
			
			return new Promise((res, rej) => {
				listeners[stringifedUri] = { res, rej };
			});	
		}
	};
}
