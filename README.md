# Google Home for Minoss
[![GitHub version](https://badge.fury.io/gh/dkern%2Fminoss-google-home.svg)](http://github.com/dkern/minoss-google-home)
[![NPM version](https://badge.fury.io/js/minoss-google-home.svg)](http://www.npmjs.org/package/minoss-google-home)
[![Dependency version](https://david-dm.org/dkern/minoss-google-home.png)](https://david-dm.org/dkern/minoss-google-home)

This module adds support for Pushover notifications to [Minoss](https://github.com/dkern/minoss) server.
The API communication is based on [`google-home-audio-tts`](https://www.npmjs.com/package/google-home-audio-tts).


## Table of Contents
* [Installation](#installation)
* [Configuration](#configuration)
* [Basic Usage](#basic-usage)
* [Parameter Shorthand](#parameter-shorthand)
* [Message Builder](#message-builder)
  * [Using `JSON` as Message Object](#using-json-as-message-object)
* [Bugs / Feature request](#bugs--feature-request)
* [License](#license)
* [Donation](#donation)


---


## Installation
Inside your Minoss root folder just use [npm](http://npmjs.com) to install this Module.

```SH
$ npm install minoss-google-home
```


## Configuration
By default there are three configuration files available inside the `config/` folder: `audio`, `devices` and `messages`.
The configuration for `audio` and `messages` are optionally.
It is possible to store different predefined audio files and message objects there, if wanted.
For more details take a look inside the files or read about the [message builder](#message-builder).

Before using this module the `devices` configuration should be set up.
This file contains the `ip` and default `language` for all home devices where notifications should be send to.

It is possible to store the devices  under own names.
The name `default` is a reserved name.
It will select this device whenever no device name was given by request parameters.
So, if only one device is available, the name `default` should be used.

```JS
module.exports = {
    default: {
        ip: '192.168.2.123',
        language: 'en'
    },
    another: {
        ip: '192.168.2.234',
        language: 'de'
    }
};
```


## Basic Usage
The basic usage is pretty simple.
When a `default` device is defined just call the `audio` or `tts` script with a supplied `url` or `message` string to be send.
For more parameters take a look at the [parameter shorthands](#parameter-shorthand).

> http://localhost:8080/google-home/tts?message=hello%20world


### Parameter Shorthand
All request parameters can be shorten to it's first character (_except `stream_type`, which is shorten with `st`_).
With this it is possible to use shorten URLs.

```TEXT
device       -> d
language     -> l
volume       -> v
restore      -> r
stream_type  -> st
timeout      -> t
speed        -> s
message      -> m
url          -> u
```

Example:

> http://localhost:8080/google-home/tts?**device**=default&**volume**=1&**message**=test  
> http://localhost:8080/google-home/tts?**d**=default&**v**=1&**m**=test


## Message Builder
You can build the message with all properties by url parameter, as `JSON` object or as stored configurations.

Messages can be predefined in [configuration](#configuration).
If there are messages configured they can be send by it's name on request:

> http://localhost:8080/google-home/tts?message=**name**


### Using `JSON` as Message Object
It is possible to use a `JSON` string as message object on request.
It works the same way as with predefined messages: 

> http://localhost:8080/google-home/tts?message=**{"message":"my message","volume":1,"language":"en"}**


## Bugs / Feature request
Please [report](http://github.com/dkern/minoss-google-home/issues) bugs and feel free to [ask](http://github.com/dkern/minoss-google-home/issues) for new features directly on GitHub.


## License
Minoss is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.


## Donation
_You like to support me?_  
_You appreciate my work?_  
_You use it in commercial projects?_  
  
Feel free to make a little [donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=93XQ8EYMSWHC6)! :wink:
