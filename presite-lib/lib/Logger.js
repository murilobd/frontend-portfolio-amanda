"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/Logger.ts
class Logger3 {
  constructor({verbose} = {}) {
    this.verbose = verbose;
  }
  log(...args) {
    if (!this.verbose)
      return;
    console.log(...args);
  }
}


exports.Logger = Logger3;
