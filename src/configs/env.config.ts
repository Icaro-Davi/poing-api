import { config } from 'dotenv'
config();

const env = {
    dev: {
        logErro: true,
        printStackError: true
    },
    server: {
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 8080,
        SECRET: process.env.SECRET!
    },
    discord: {
        CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
        CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
        REDIRECT_URL: process.env.DISCORD_REDIRECT_URL!,
        BOT_TOKEN: process.env.DISCORD_BOT_TOKEN!
    },
    db: {
        POING_URI: process.env.DATABASE_MONGODB_POING_URI!,
        POING_DASHBOARD_URI: process.env.DATABASE_MONGODB_POING_DASHBOARD_URI!
    },
    session: {
        cookieExpirationDays: 7
    },
    misc: {
        WEB_APP_REDIRECT_URL: process.env.WEB_APP_REDIRECT_URL!
    }
}

export default env;