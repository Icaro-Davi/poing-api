import env from './env.config';
import type { DatabaseType } from './database';

type ConfigsType = {
    env: typeof env,
    db: DatabaseType
}

const configs: ConfigsType = {
    env,
    db: {} as DatabaseType
}

export default configs;