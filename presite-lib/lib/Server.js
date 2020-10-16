"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunk1emvMzGPjs = require('./chunk.1emvMzGP.js');
require('./chunk.x8sSAqfS.js');

// src/Server.ts
var _http = require('http');
var _path = require('path');
var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
var _polka = require('polka'); var _polka2 = _interopRequireDefault(_polka);
var _getport = require('get-port'); var _getport2 = _interopRequireDefault(_getport);
var _connecthistoryapifallback = require('connect-history-api-fallback'); var _connecthistoryapifallback2 = _interopRequireDefault(_connecthistoryapifallback);
var _servestatic = require('serve-static'); var _servestatic2 = _interopRequireDefault(_servestatic);
class Server {
  constructor(opts) {
    this.app = _polka2.default.call(void 0, );
    this.hostname = "localhost";
    this.opts = opts;
    this.app.use(_connecthistoryapifallback2.default.call(void 0, ));
    this.app.use(_servestatic2.default.call(void 0, this.opts.baseDir));
    this.app.use(async (req, res, next) => {
      if (!_chunk1emvMzGPjs.SPECIAL_EXTENSIONS_RE.test(req.path)) {
        return next();
      }
      const file = _path.join.call(void 0, this.opts.baseDir, req.path + ".js");
      if (await _fsextra2.default.pathExists(file)) {
        await _fsextra2.default.remove(_path.join.call(void 0, this.opts.outDir, req.path + ".js"));
        res.setHeader("content-type", "text/html");
        res.end(`

      <html>
      <body>
      <script id="__presite_script__" type="module">
      import getContent from "${req.path + ".js"}"
      document.addEventListener('DOMContentLoaded', () => {
        Promise.resolve(getContent()).then(content => {
          window.snapshot({
            content: typeof content === 'string' ? content : JSON.stringify(content)
          });
        })
      })
      </script>
      </body>
      </html>
        `);
        return;
      }
      next();
    });
  }
  async start() {
    const port = await _getport2.default.call(void 0, );
    this.port = port;
    this.server = new (0, _http.Server)(this.app.handler);
    this.server.listen(this.port, this.hostname);
  }
  stop() {
    return this.server && this.server.close();
  }
}


exports.Server = Server;
