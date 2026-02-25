import { SESClient } from "@aws-sdk/client-ses";

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

type AWSConfig = {
	email: string;
	sesRegion: string;
	sesClient: SESClient;
};

export type Config = {
	api: APIConfig;
	aws: AWSConfig;
};

const region = envOrThrow('REGION');
const sesClient = new SESClient({ region });

export const config: Config = {
	api: {
		platform: envOrThrow('PLATFORM'),
		port: Number(envOrThrow('PORT')),
	},
	aws: {
		email: envOrThrow('EMAIL'),
		sesRegion: region,
		sesClient: sesClient
	}
};
