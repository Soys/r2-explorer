//import { R2Explorer } from "r2-explorer";

// Read all available configurations here: https://r2explorer.com/getting-started/configuration/
//export default R2Explorer({
//	readonly: true,
	// basicAuth: {
	//   username: 'molishark',
	//   password: 'weare.520'
	// }
//});
import { R2Explorer } from "r2-explorer";

const baseConfig = {
	readonly: false,
	cors: true,
	showHiddenFiles: true,
};

export default {
	async email(event, env, context) {
		await R2Explorer(baseConfig).email(event, env, context);
	},
	async fetch(request, env, context) {
		return R2Explorer({
			...baseConfig,
			basicAuth: {
				username: env.BASIC_USERNAME,
				password: env.BASIC_PASSWORD,
			},
		}).fetch(request, env, context);
	},
};
