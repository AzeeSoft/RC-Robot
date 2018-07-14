const path = require('path');

// let mode = "production";
let mode = "development";

let rendererBundles = [
    ['windows/titleWindow.tsx', 'windows/titleWindow.js'],
];

/* let styleBundles = [
    ['windows/titleWindow.scss', 'windows/titleWindow.css']
]; */

module.exports = [];

for (let rendererBundle in rendererBundles) {
    module.exports.push({
        mode: mode,
        entry: './src/ts/renderer/' + rendererBundles[rendererBundle][0],
        output: {
            path: path.resolve(__dirname, 'src/js/renderer/bundles/'),
            filename: rendererBundles[rendererBundle][1],
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
                    ]
                }
            ]
        }
    });
}

/* for (let styleBundle in styleBundles) {
    module.exports.push({
        mode: mode,
        entry: './src/scss/' + styleBundles[styleBundle][0],
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