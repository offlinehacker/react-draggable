'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

process.env.NODE_ENV = 'development';
process.env.CHROME_BIN = require('puppeteer').executablePath();
process.env.PUPPETEER_PRODUCT = 'firefox';
process.env.FIREFOX_BIN = require('puppeteer').executablePath();

// there is an error with firefox path being reported by puppeteer (see: https://github.com/puppeteer/puppeteer/issues/6292)
// workaround the issue by using first firefox in directory
const ffdir = path.join(process.env.FIREFOX_BIN, '../../..');
process.env.FIREFOX_BIN = path.join(ffdir, fs.readdirSync(ffdir)[0], 'firefox/firefox');

module.exports = function(config) {
  const webpackConfig = _.merge(
    require('./webpack.config.js')({}, {}),
    {
      mode: 'development',
      cache: true,
      performance: {
        hints: false,
      },
      // zero out externals; we want to bundle React
      externals: '',
    }
  );

  delete webpackConfig.entry; // karma-webpack complains
  delete webpackConfig.output; // karma-webpack complains
  // Make sure `process.env` is present as an object
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    process: {env: {}},
  }));

  config.set({

    basePath: '',

    frameworks: ['webpack', 'jasmine'],

    files: [
      'specs/draggable.spec.jsx'
    ],

    exclude: [
    ],

    preprocessors: {
      'specs/draggable.spec.jsx': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackServer: {
      stats: {
        chunks: false,
        colors: true
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

//    browsers: ['FirefoxHeadless', 'ChromeHeadlessNoSandbox'],
  
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox' // required to run without privileges in docker
        ]
      },
      ChromeHeadlessRemoteDebug: {
        base: 'ChromeHeadlessNoSandbox',
        flags: [
          '--user-data-dir=/tmp/chrome-test-profile',
          '--disable-web-security',
          '--remote-debugging-port=9222',
        ],
        debug: true,
      }
    },

    singleRun: true,
  });
};
