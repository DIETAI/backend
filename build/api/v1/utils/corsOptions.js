"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: [
        `https://${process.env.PROJECT_DOMAIN}`,
        `https://www.${process.env.PROJECT_DOMAIN}`,
        `https://dashboard.${process.env.PROJECT_DOMAIN}`,
        `https://recommend-server.${process.env.PROJECT_DOMAIN}`,
    ],
};
if (process.env.NODE_ENV === 'dev') {
    exports.corsOptions.origin.push('http://localhost:3000');
}
