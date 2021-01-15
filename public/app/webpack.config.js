/*
 * Generated by react-dev-server
 *
 * @author Develon (https://github.com/develon2015)
 */
const {
    $babel_loader,
    $css_loader,
    $style_loader,
    $file_loader,
} = require('./rds-loader.js'); // rds plugins

const path = require('path');

const DIR_PROJECT = path.resolve(__dirname, '.');
const DIR_SRC = path.resolve(DIR_PROJECT, 'src');
const DIR_DIST = path.resolve(DIR_PROJECT, 'dist');

const CONFIG = {
    target: 'web', // 默认目标是React Web项目
    // target: 'electron-renderer', // electron渲染进程支持. 可以全局安装electron, 然后link到本地, 以提供相应版本的electron类型支持.
    // mode: 'none', // 开发时不建议使用默认值"production"
    // none会导致第三方包运行时异常 - ReferenceError: process is not defined，BUG源码：https://github.com/facebook/prop-types/blob/master/index.js#L8
    mode: 'development', // 开发模式
    // devtool: 'source-map', // 生成main.js.map源码映射文件, 以支持.ts源码的断点调试。还可以使用inline-source-map
    entry: {
        main: path.resolve(DIR_SRC),
    },
    output: {
        filename: '[name].js',
        path: DIR_DIST,
        chunkFilename: 'async/[id]-module-[name].js', // 此选项确定非入口块文件的名称
    },
    module: {
        rules: [
            { test: /\.global\.css$/, use: [$style_loader, $css_loader] },
            { test: /(?<!\.global)\.css$/, use: [$style_loader, $css_loader + '?modules'] },
            { test: /\.(html|png|jpg|ico)$/, use: $file_loader + '?context=src&name=[path][name].[ext]' },
            { test: /\.(ts|js)x?$/, exclude: /node_modules/, use: $babel_loader }, // @BABEL_LOADER及其预设由rds提供
        ],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': DIR_SRC,
        },
    },
    devServer: {
        contentBase: DIR_DIST,
        // publicPath: DIR_DIST,
        https: false,
        disableHostCheck: true,
        // public: '0.0.0.0:0',
    },
};

function config(env = {}, argv = {}) {
    if (env && (env.production || env.rebuild)) {
        console.log('Build production');
        CONFIG.mode = 'production';
        delete CONFIG.devtool;
        delete CONFIG.devServer;
    }
    if (env && env.rebuild) {
        console.log('Rebuild production');
        console.log('OS:', process.platform);
        try {
            const child_process = require('child_process');
            if (process.platform.match(/^win.*/)) { // Implement this on Windows OS
                child_process.execSync(`rmdir /S /Q "${DIR_DIST}"`);
            } else if (process.platform.match(/^linux.*/)) { // Implement this on Linux OS
                child_process.execSync(`rm -rf '${DIR_DIST}'`);
            }
        } catch (error) { }
    }
    if (env && env.localhost) {
        delete CONFIG.devServer.public;
    }
    return CONFIG;
}

module.exports = config;
