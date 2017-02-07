const fs = require('fs-extra');
const program = require('commander');
const translator = require('translateer');
const ora = require('ora');
const config = require('./package.json');
const { version = '0.0.0' } = config;

const progress = {
    _spinner: null,
    counter: -1,
    get spinner() {
        this._spinner = this._spinner || ora().start();
        return this._spinner;
    },
    tick: function () {
        this.spinner.text = `${++this.counter} words translated`;
    },
    done: function () {
        this.spinner.succeed(`${this.counter} words translated`);
    },
    terminate: function (err) {
        this.spinner.fail(err);
    },
};

function t(q, from, to) {
    progress.tick();
    return translator.translate({ q, from, to }).then(res => res.json());
}

function travel(input, from, to) {
    let ret;
    if (typeof input === 'string') {
        ret = t(input, from, to);
    } else if (typeof input === 'object' && !(input instanceof Date)) {
        const keys = Object.keys(input);
        ret = Object.keys(input).reduce((promise, key) => {
            return promise.then(obj => {
                return travel(input[key], from, to).then(tResult => {
                    obj[key] = tResult;
                    return obj;
                });
            });
        }, Promise.resolve({}));
    } else {
        ret = Promise.resolve(input);
    }
    return ret;
}

program
    .version(version)
    .option('-f, --from <fromLang>', 'from language, default is auto detect')
    .option('-t, --to <toLang>', 'to language, default is English')
    .arguments('<inputFile> <outputFile>')
    .action((inputFile, outputFile) => {
        try {
            if (!inputFile) throw Error('Input file is not specify');
            if (!outputFile) throw Error('Output file is not specify');

            const { from, to } = program;
            const inputObj = fs.readJsonSync(inputFile);
            progress.tick();
            travel(inputObj, from, to)
                .then(obj => {
                    fs.writeJsonSync(outputFile, obj);
                    progress.done();
                });
        } catch (err) {
            progress.terminate(err);
            process.exit(1);
        }
    });

program.parse(process.argv);