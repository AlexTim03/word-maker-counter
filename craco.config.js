// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    webpack: {
        alias: {
            pages: path.resolve(__dirname, 'src/pages'),
            routing: path.resolve(__dirname, 'src/routing'),
            // shared: path.resolve(__dirname, 'src/shared'),
            // widgets: path.resolve(__dirname, 'src/widgets'),
            // entities: path.resolve(__dirname, 'src/entities'),
            // features: path.resolve(__dirname, 'src/features'),
        },
    },
};
