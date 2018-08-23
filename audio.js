'use strict';

let message = require('./src/message');
let GoogleHomeAudioTTS = require('google-home-audio-tts');

module.exports = (config, params, respond, error) => {
    // noinspection JSUnresolvedVariable
    let deviceName = params.device || params.d || 'default';

    // noinspection JSUnresolvedVariable
    if (!params.url && !params.u) {
        return error('parameter "url" is required');
    }

    // noinspection JSUnresolvedVariable
    if (!config.devices[deviceName]) {
        return error('unknown device');
    }

    // noinspection JSUnresolvedVariable
    let deviceConfig = config.devices[deviceName];
    let messageObj = message('audio', config, params, error);

    let device = new GoogleHomeAudioTTS(deviceConfig.ip, deviceConfig.language);
    device.setStreamType(messageObj.stream_type);

    messageObj.volume && device.setVolume(messageObj.volume);
    messageObj.volume && device.restoreVolume(!!messageObj.restore);

    // send message
    device.audio(messageObj.url, result => {
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