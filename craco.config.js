// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    webpack: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            pages: path.resolve(__dirname, 'src/pages'),
            routing: path.resolve(__dirname, 'src/routing'),
            // shared: path.resolve(__dirname, 'src/shared'),
            // widgets: path.resolve(__dirname, 'src/widgets'),
            // features: path.resolve(__dirname, 'src/features'),
        },
    },
};
