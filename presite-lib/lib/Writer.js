"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/Writer.ts
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
class Writer3 {
  constructor(opts) {
    this.opts = opts;
  }
  write({file, html}) {
    const {outDir} = this.opts;
    const filepath = _path2.default.join(outDir, file);
    return _fsextra2.default.ensureDir(_path2.default.dirname(filepath)).then(() => _fsextra2.default.writeFile(filepath, html, "utf8"));
  }
  copyFrom(from) {
    from = _path2.default.resolve(from);
    const outDir = _path2.default.resolve(this.opts.outDir);
    if (from === outDir)
      return Promise.resolve();
    return _fsextra2.default.copy(from, outDir);
  }
}


exports.Writer = Writer3;
