/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (options, webpack) => {
    const lazyImports = [
        "@nestjs/microservices/microservices-module",
        "@nestjs/websockets/socket-module",
        "class-transformer/storage",
    ];

    return {
        ...options,
        externals: [],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        keep_classnames: true,
                    },
                }),
            ],
        },
        plugins: [
            ...options.plugins,
            new webpack.IgnorePlugin({
                checkResource(resource) {
                    if (lazyImports.includes(resource)) {
                        try {
                            require.resolve(resource);
                        } catch (err) {
                            return true;
                        }
                    }
                    return false;
                },
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "node_modules/swagger-ui-dist/swagger-ui.css",
                    },
                    {
                        from: "node_modules/swagger-ui-dist/swagger-ui-bundle.js",
                    },
                    {
                        from: "node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js",
                    },
                ],
            }),
        ],
        output: {
            ...options.output,
            libraryTarget: "commonjs2",
        },
    };
};
