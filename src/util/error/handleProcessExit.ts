function handleProcessExit(exitCode: number) {
    console.log('[APP] CLOSING WITH CODE', exitCode);
    console.log('SEND WARN EMAIL');
}

export default handleProcessExit;