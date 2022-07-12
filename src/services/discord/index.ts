import axios from "axios";

export const DiscordRequestor = axios.create({
    baseURL: 'https://discord.com/api/v10'
});

// DiscordRequestor.interceptors.request.use(config => {
//     try {
//         return config;
//     } catch (error) {
//         return Promise.reject(error);
//     }
// });