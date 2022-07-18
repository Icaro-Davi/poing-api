import axios, { AxiosRequestConfig } from "axios";
import configs from "../../configs";

type AxiosAuthentication = {
    userAuthToken?: string;
    isBot?: boolean;
}

declare module 'axios' {
    interface AxiosRequestConfig extends AxiosAuthentication { }
}

export const DiscordRequestor = axios.create({
    baseURL: 'https://discord.com/api/v10'
});

async function handleHeaderAuthenticationToken(config: AxiosRequestConfig) {
    let authorization: string = '';
    if (config.userAuthToken) {
        authorization = `Bearer ${config.userAuthToken}`;
        delete config.userAuthToken;
    }
    else if (config.isBot) {
        authorization = `Bot ${configs.env.discord.BOT_TOKEN}`;
        delete config.isBot;
    }
    return authorization;
}

DiscordRequestor.interceptors.request.use(async (config) => {
    try {
        const Authorization = await handleHeaderAuthenticationToken(config);
        return {
            ...config,
            headers: {
                Authorization,
                ...config.headers,
            }
        };
    } catch (error) {
        return Promise.reject(error);
    }
});