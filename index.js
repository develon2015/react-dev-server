const path = require('path');
const fs = require('fs-extra');

const eject = require('./eject');
const { consoleHook, _log, } = require('./console-hook');

/**
 * Create a project dir and init it
 * @param {string} project 
 */
function create(project) {
    console.info(`Create project ${project}`);
    fs.mkdirSync(project); // dir: pro
    init(project);
}

/**
 * Init a project, e.g: make src, eject the TypeScript config file.
 * @param {string} project 
 */
function init(project) {
    console.info(`Init project ${project}`);
    const DIR_APP = path.resolve(project, '.');
    const DIR_APP_TEMPLATE = path.resolve(__dirname, './public/app'); // app模板
    fs.copySync(DIR_APP_TEMPLATE, DIR_APP);
    eject(project);
    console.log(`Project init succeed! To continue, please:\n\ncd ${project}\nyarn setup\nyarn start:dev`);
}

function main() {
    switch (process.argv[2]) {
        case '-i':
        case 'init':
        case '--init': { // Init cwd() or a project
            consoleHook();
            init(path.resolve(process.cwd(), process.argv[3] || '.'));
            break;
        }
        case '-c':
        case 'create':
        case '--create': { // Create a project directory and init
            if (!process.argv[3]) { // No a project name provided
                help();
                break;
            }
            consoleHook();
            create(path.resolve(process.cwd(), process.argv[3]));
            break;
        }
        case '-ej':
        case 'eject':
        case '--eject': {
            consoleHook();
            eject(path.resolve(process.cwd(), process.argv[3] || '.'));
            break;
        }
        case '-h':
        case 'help':
        case '-help':
        case '--help': {
            help();
            break;
        }
        case '-v':
        case '-V':
        case 'version':
        case '--version': {
            version();
            break;
        }
        default: {
            help();
        }
    }
}

function help() {
    const info = `
Usage: rds [options] [project]
       react-dev-server [options] [project]

       Quick start your React application.
    
       Options:
           [project]            The project directory
           -c, --create         Create a React project and init it
           -i, --init           Init a React project
           -ej, --eject         Eject the React supported configuration file
           -v, --version        Display version of react-dev-server
           -h, --help           Display help for command`;
    _log(info);
    process.exit(0);
}

function version() {
    const PACKAGE_JSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));
    console.log(PACKAGE_JSON.version);
}

main();
