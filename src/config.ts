process.loadEnvFile();

export function envOrThrow(key: string) {
	const value = process.env[key];

	if (!value) throw new Error(`Env var ${key} is not set.`);

	return value;
}

type APIConfig = {
	platform: string;
	port: number;
};
export type Config = {
	api: APIConfig;
};
export const config: Config = {
	api: {
		platform: envOrThrow('PLATFORM'),
		port: Number(envOrThrow('PORT')),
	},
};
