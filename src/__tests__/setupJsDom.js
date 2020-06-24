const { JSDOM } = require("jsdom");

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

if (!global.__alreadyAddedJsdomForTesting) {
  const jsdom = new JSDOM("<!doctype html><html><body></body></html>", {
    // This needs to match testURL in jest.config.js
    url: "http://localhost",
  });
  const { window } = jsdom;

  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: "node.js",
  };
  global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
  };
  global.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
  copyProps(window, global);
  global.__alreadyAddedJsdomForTesting = true;
}
