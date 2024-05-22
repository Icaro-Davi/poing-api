import { config } from 'dotenv'
import { IBotSchema } from '../domain/db_poing/bot/Bot.schema';
config();

const botSettings: IBotSchema = {
    locale: 'en-US',
    prefix: '!',
    messageEmbedHexColor: '#fda5b1'
}

const env = {
    environment: (process.env.NODE_ENV ? process.env.NODE_ENV : 'development') as 'development' | 'staging' | 'production',
    dev: {
        logErro: true,
        printStackError: false,
        printFullStackError: false
    },
    server: {
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 8080,
        SECRET: process.env.SECRET!,
        allowedOrigins: process.env.ALLOWED_ORIGINS?.split(' '),
    },
    discord: {
        CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
        CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
        REDIRECT_URL: process.env.DISCORD_REDIRECT_URL!,
        BOT_TOKEN: process.env.DISCORD_BOT_TOKEN!,
        queueRequest: {
            poolSize: 1,
            delay: 1200
        }
    },
    db: {
        POING_URI: process.env.DATABASE_MONGODB_POING_URI!,
        POING_DASHBOARD_URI: process.env.DATABASE_MONGODB_POING_DASHBOARD_URI!,
        REDIS_URI: process.env.DATABASE_REDIS_URI!
    },
    session: {
        cookieExpirationDays: 7,
        cookieDomain: process.env.SESSION_COOKIE_DOMAIN,
        cookieHttpOnly: Boolean(process.env.SESSION_COOKIE_HTTP_ONLY),
        secure: Boolean(process.env.SESSION_COOKIE_SECURE),
        cookieSameSite: (process.env.SESSION_COOKIE_SAME_SITE ?? 'strict') as ('lax' | 'strict' | 'none'),
    },
    misc: {
        WEB_APP_REDIRECT_URL: process.env.WEB_APP_REDIRECT_URL!
    },
    botSettings
}

export default env;