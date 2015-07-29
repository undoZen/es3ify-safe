'use strict';
var es3ify = require('es3ify');
var through = require('through');
module.exports = function (file) {
    if (!file.match(/\.js$/i)) return through();
    var data = '';
    function write(chunk) {
        data += chunk;
    }
    function compile() {
        var compiled = '';
        try {
            compiled = es3ify.transform(data);
        } catch (e) {
            this.emit('error', e);
        }
        this.queue(compiled);
        this.queue(null);
    }
    return through(write, compile);
};
