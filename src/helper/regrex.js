exports.__esModule = true;
exports.REGREX = void 0;
exports.REGREX = {
    getRegrexNumberRange: function (start, end) {
        if (start) {
            return new RegExp("[" + start + "-" + end + "]");
        }
        return new RegExp("[" + 0 + "-" + end + "]");
    }
};
