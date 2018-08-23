'use strict';

let json = require('./json');
let merge = require('./merge');

/**
 * build tts message from given data
 * @param {string} message
 * @param {object} config
 * @param {function} error
 * @returns {boolean|object}
 */
function buildTTS(message, config, error) {
    // defaults
    let jsonObj, build = {
        message: null,
        speed: 1,
        stream_type: 'BUFFERED',
        timeout: 1000,
        volume: false,
        restore: false
    };

    message = message || 'default';

    // merge from config
    if (config.messages[message]) {
        // noinspection JSUnresolvedVariable
        merge(build, config.messages[message]);
    }

    // merge from json string
    else if ((jsonObj = json(message))) {
        merge(build, jsonObj);
    }

    // use string as message
    else if (typeof message === 'string') {
        build.message = message;
    }

    // error on unknown entry
    else {
        return error(`message '${message}' is unknown`);
    }

    return build;
}

/**
 * build audio message from given data
 * @param {string} url
 * @param {object} config
 * @param {function} error
 * @returns {boolean|object}
 */
function buildAudio(url, config, error) {
    // defaults
    let jsonObj, build = {
        url: null,
        stream_type: 'BUFFERED',
        volume: false,
        restore: false
    };

    url = url || 'default';

    // merge from config
    if (config.audio[url]) {
        // noinspection JSUnresolvedVariable
        merge(build, config.audio[url]);
    }

    // merge from json string
    else if ((jsonObj = json(url))) {
        merge(build, jsonObj);
    }

    // use string as message
    else if (typeof url === 'string') {
        build.url = url;
    }

    // error on unknown entry
    else {
        return error(`audio '${url}' is unknown`);
    }

    return build;
}

/**
 * overwrite custom parameters in message object
 * @param {object} messageObj
 * @param {object} params
 * @returns {object}
 */
function overwriteParameters(messageObj, params) {
    let replaces = {
        d:  'device',
        l:  'language',
        v:  'volume',
        r:  'restore',
        st: 'stream_type',
        t:  'timeout',
        s:  'speed',
        m:  'message',
        u:  'url',
    };

    Object.keys(params).forEach(key => {
        // by shorthand
        if (params[key]) {
            messageObj[replaces[key]] = params[key];
        }

        // by name
        if (params[replaces[key]]) {
            messageObj[replaces[key]] = params[replaces[key]];
        }
    });

    return messageObj;
}

/**
 * helper function to create message object
 * @param {string} type
 * @param {object} config
 * @param {object} params
 * @param {function} error
 * @returns {object|boolean}
 */
module.exports = (type, config, params, error) => {
    let message;

    if (type === 'tts') {
        message = buildTTS(params.message || params.m, config, error);
    }
    else if(type === 'audio') {
        message = buildAudio(params.url || params.u, config, error);
    }

    if (message) {
        message = overwriteParameters(message, params);
    }

    return message;
};
