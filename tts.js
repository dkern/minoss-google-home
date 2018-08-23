'use strict';

let json = require('./src/json');
let message = require('./src/message');
let GoogleHomeAudioTTS = require('google-home-audio-tts');

module.exports = (config, params, respond, error) => {
    // noinspection JSUnresolvedVariable
    let deviceName = params.device || params.d || 'default';

    // noinspection JSUnresolvedVariable
    if (!params.message && !params.m) {
        return error('parameter "message" is required');
    }

    // noinspection JSUnresolvedVariable
    if (!config.devices[deviceName]) {
        return error('unknown device');
    }

    // noinspection JSUnresolvedVariable
    let deviceConfig = config.devices[deviceName];
    let messageObj = message('tts', config, params, error);

    let device = new GoogleHomeAudioTTS(deviceConfig.ip, deviceConfig.language);

    device.setStreamType(messageObj.stream_type);
    device.setTtsSpeed(messageObj.speed);
    device.setTtsTimeout(messageObj.timeout || 1000);

    messageObj.language && device.setLanguage(messageObj.language);
    messageObj.volume && device.setVolume(messageObj.volume);
    messageObj.volume && device.restoreVolume(!!messageObj.restore);

    // send message
    device.tts(messageObj.message, result => {
        if (!result) {
            return error();
        }

        respond({
            success: true,
            request: messageObj,
            tts: json(result) || result
        });
    });
};