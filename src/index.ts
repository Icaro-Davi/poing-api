import StartExpressServer from "./express";
import handleProcessExit from "./util/error/handleProcessExit";
StartExpressServer();

process.stdin.resume();
process.on('exit', handleProcessExit);