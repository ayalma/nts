/**
 * Created by ali on 7/28/17.
 */
var {Helper} = require('../../Helper/Helper');
var inquirer = require('inquirer');
var clui = require('clui');
exports.App = class {

    templatePath(source) {
        return __dirname + '/Templates/' + source;
    }

    destinationPath(dist) {
        return process.cwd() + '/' + dist;
    }

    run(args) {

        this.prompting();
    }

    prompting() {

        var questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the repository:',
                default: Helper.getCurrentDirectoryBase(),
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a name for the repository';
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                default: null,
                message: 'Optionally enter a description of the repository:'
            },
            {
                type: 'input',
                name: 'version',
                default: '0.0.1',
                message: 'Version ?'
            },
            {
                type: 'input',
                name: 'main',
                default: 'index.js',
                message: 'main file: ?'
            }

        ];

        return inquirer.prompt(questions).then(answers => {
            /* var status = new Spinner('Creating repository...');
             status.start();*/

            this.appname = answers.name;
            this.version = answers.version;
            this.description = answers.description;
            this.main = answers.main;
            this.writing();

        });
    }

    async writing() {

        await Helper.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
            name: this.appname,
            description: this.description,
            version: this.version,
            main: this.main,
            author: 'your name'
        });
        await Helper.copyTpl(this.templatePath('_tsconfig.json'), this.destinationPath('tsconfig.json'));
        /*  this.fs.copyTpl(this.templatePath('.npmignore'),this.destinationPath('.npmignore'));
         this.fs.copyTpl(this.templatePath('.gitignore'),this.destinationPath('.gitignore'));*/

        await Helper.copyTpl(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'));
        await Helper.copyTpl(this.templatePath('_app.ts'), this.destinationPath('/src/app.ts'));
        await Helper.copyTpl(this.templatePath('_server.ts'), this.destinationPath('/src/server.ts'));
    }
};