const path = require('path');

// let mode = "production";
let mode = "development";

let rendererBundles = [
    ['windows/titleWindow/titlePageRenderer.tsx', 'windows/titleWindow.js'],
    ['windows/homeWindow/homePageRenderer.tsx', 'windows/homeWindow.js'],
];

/* let styleBundles = [
    ['windows/titleWindow.scss', 'windows/titleWindow.css']
]; */

module.exports = [];

for (let rendererBundle in rendererBundles) {
    module.exports.push({
        mode: mode,
        entry: './electron-app/ts/renderer/' + rendererBundles[rendererBundle][0],
        output: {
            path: path.resolve(__dirname, 'electron-app/js/renderer/bundles/'),
            filename: rendererBundles[rendererBundle][1],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS
                    ],
                }
            ]
        },
        target: 'electron-renderer',
    });
}

/* for (let styleBundle in styleBundles) {
    module.exports.push({
        mode: mode,
        entry: './electron-app/scss/' + styleBundles[styleBundle][0],
        output: {
            path: path.resolve(__dirname, 'src/css/bundles/'),
            filename: styleBundles[styleBundle][1],
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }]
        }
    });
} */