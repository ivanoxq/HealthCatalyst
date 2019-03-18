module.exports = (config) => {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine'],
        client: {
            captureConsole: true,
        }
    });
}