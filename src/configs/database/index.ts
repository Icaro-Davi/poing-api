import { Connection } from 'mongoose';
import ConnectPoing from './poing.mongodb.database';
import ConnectPoingDashboard from "./poing_dashboard.mongodb.database";

export enum DBName {
    poing = 'poing',
    poingDashboard = 'poing-dashboard'
}

export type DatabaseType = Database;

class Database {
    private readonly poingConnection: Connection;
    private readonly poingDashboardConnection: Connection;

    constructor({ poingConnection, poingDashboardConnection }: { poingDashboardConnection: Connection, poingConnection: Connection }) {
        this.poingConnection = poingConnection;
        this.poingDashboardConnection = poingDashboardConnection;
    }

    public getConnection(name: keyof typeof DBName = 'poingDashboard') {
        switch (name) {
            case 'poing':
                return this.poingConnection;
            case 'poingDashboard':
                return this.poingDashboardConnection
        }
    }
}

async function createDatabase() {
    const connectionPromises = [
        ConnectPoing(),
        ConnectPoingDashboard()
    ]
    const connections = await Promise.all(connectionPromises);
    return new Database({ poingConnection: connections[0], poingDashboardConnection: connections[1] });
}

export default createDatabase;