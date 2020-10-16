#!/usr/bin/env node
"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkx8sSAqfSjs = require('./chunk.x8sSAqfS.js');

// package.json
var require_package = _chunkx8sSAqfSjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = {
    name: "presite",
    version: "2.0.0",
    description: "CLI app for pre-rendering SPA websites.",
    repository: {
      url: "egoist/presite",
      type: "git"
    },
    bin: "dist/cli.js",
    files: [
      "dist"
    ],
    scripts: {
      test: "echo 'no tests!'",
      build: "rm -rf dist && tsup src/cli.ts --dts",
      prepublishOnly: "npm run build",
      presite: "node -r sucrase/register src/cli.ts",
      release: "shipjs prepare"
    },
    author: "egoist <0x142857@gmail.com>",
    license: "MIT",
    dependencies: {
      "@egoist/promise-queue": "^1.1.0",
      cac: "^6.6.1",
      chalk: "^4.1.0",
      "connect-history-api-fallback": "^1.3.0",
      "fs-extra": "^9.0.1",
      "get-port": "^5.0.0",
      "html-minifier": "^4.0.0",
      joycon: "^2.1.2",
      polka: "^0.5.2",
      "puppeteer-core": "^5.3.1",
      "read-pkg-up": "^7.0.1",
      "serve-static": "^1.14.1",
      "update-notifier": "^4.1.0"
    },
    devDependencies: {
      "@types/connect-history-api-fallback": "^1.3.3",
      "@types/fs-extra": "^9.0.1",
      "@types/polka": "^0.5.1",
      "@types/puppeteer-core": "^2.0.0",
      "@types/update-notifier": "^4.1.0",
      shipjs: "0.20.1",
      tsup: "^3.4.2",
      typescript: "^3.9.7"
    },
    engines: {
      node: ">=12"
    }
  };
});

// src/cli.ts
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _cac = require('cac');
var _chalk = require('chalk'); var _chalk2 = _interopRequireDefault(_chalk);
var _updatenotifier = require('update-notifier'); var _updatenotifier2 = _interopRequireDefault(_updatenotifier);
var _joycon = require('joycon'); var _joycon2 = _interopRequireDefault(_joycon);
const pkg = require_package();
_updatenotifier2.default.call(void 0, {pkg}).notify();
async function main() {
  const cli = _cac.cac.call(void 0, "presite");
  cli.command("[dir]", `Prerender your website`).option("--wait <time_or_selector>", "Wait for specific ms or dom element to appear").option("--manually [optional_variable_name]", "Manually set ready state in your app").option("-m, --minify", "Minify HTML").option("-r, --routes <routes>", "Addtional routes to crawl contents from").option("-d, -o, --out-dir <dir>", "The directory to output files").option("-q, --quiet", "Output nothing in console").option("-cp, --chrome-path", "Chrome path").action(async (dir = ".", flags) => {
    const {Server: Server2} = await Promise.resolve().then(() => require("./Server.js"));
    const {Crawler: Crawler3} = await Promise.resolve().then(() => require("./Crawler.js"));
    const {Writer: Writer4} = await Promise.resolve().then(() => require("./Writer.js"));
    const {Logger: Logger4} = await Promise.resolve().then(() => require("./Logger.js"));
    let config;
    const joycon2 = new (0, _joycon2.default)({
      packageKey: "presite",
      files: ["package.json", "presite.config.json", "presite.config.js"]
    });
    const {data: configData, path: configPath} = await joycon2.load();
    if (configPath) {
      console.log(`Using config from ${_chalk2.default.green(_path2.default.relative(process.cwd(), configPath))}`);
    }
    config = Object.assign({
      outDir: ".presite",
      routes: ["/"]
    }, configData, flags, {
      baseDir: dir
    });
    const logger = new Logger4({verbose: !flags.quiet});
    const server = new Server2({
      baseDir: config.baseDir,
      outDir: config.outDir
    });
    const writer = new Writer4({
      outDir: config.outDir
    });
    logger.log(`Copy static assets`);
    await Promise.all([server.start(), writer.copyFrom(config.baseDir)]);
    const crawler = new Crawler3({
      hostname: server.hostname,
      port: server.port,
      options: {
        routes: config.routes,
        onBrowserPage: config.onBrowserPage,
        manually: config.manually,
        chromePath: config.chromePath
      },
      writer,
      logger
    });
    await crawler.crawl();
    server.stop();
    logger.log(`Done, check out ${_chalk2.default.green(config.outDir)} folder`);
  });
  cli.version(pkg.version);
  cli.help();
  cli.parse(process.argv, {run: false});
  await cli.runMatchedCommand();
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
