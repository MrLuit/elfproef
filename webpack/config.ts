import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';

const isDevelopment = process.env.NODE_ENV !== 'production';
const sourcePath = path.resolve(__dirname, '../src');

const config: Configuration = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        elfproef: path.resolve(sourcePath, 'index.ts')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        library: 'elfproef'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            useBabel: true,
                            babelCore: '@babel/core'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};

const browser: Configuration = merge.smart(config, {
    target: 'web',
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].js'
    }
});

const node: Configuration = merge.smart(config, {
    target: 'node',
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs2',
        filename: '[name].node.js'
    }
});

export default [browser, node];
