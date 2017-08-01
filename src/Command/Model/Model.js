/**
 * Created by ali on 7/28/17.
 */

var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');
var inquirer = require('inquirer');
var Preferences = require('preferences');
var Spinner = CLI.Spinner;
var GitHubApi = require('github');
var _ = require('lodash');
var git = require('simple-git')();
var touch = require('touch');
var fs = require('fs');
var path = require('path');
var {Helper} = require('../../Helper/Helper');

var mkdirp = require('mkdirp');

exports.Model = class {
    templatePath(source) {
        return __dirname + '/Templates/' + source;
    }

    destinationPath(dist) {
        return process.cwd() + '/' + dist;
    }

    async run(args) {
        var options = args._.slice(1);
        if (options.length <= 0) {
            console.log(' for creating model use "nts model modelname"');
            console.log('pls see help');
        }
        else {
            var modelName = options[0];
            var name = modelName.charAt(0).toUpperCase() + modelName.slice(1).toLowerCase();


            await Helper.copyTpl(this.templatePath('_model.ts'), this.destinationPath('/src/' + name + '/' + name + '.ts'), {capitalName: name});
            await  Helper.copyTpl(this.templatePath('_repository.ts'), this.destinationPath('/src/' + name + '/' + name + 'Repository.ts'), {
                name: modelName,
                capitalName: name
            });
            await  Helper.copyTpl(this.templatePath('_service.ts'), this.destinationPath('/src/' + name + '/' + name + 'Service.ts'), {
                name: modelName,
                capitalName: name
            });
            await  Helper.copyTpl(this.templatePath('_controller.ts'), this.destinationPath('/src/' + name + '/' + name + 'Controller.ts'), {
                name: modelName,
                capitalName: name
            });
            await  Helper.copyTpl(this.templatePath('_query.ts'), this.destinationPath('/src/' + name + '/Get' + name + 'Query.ts'), {
                name: modelName,
                capitalName: name
            });

            await this.registerController(this.destinationPath('/src/app.ts'), this.destinationPath('/src/app.ts'), modelName, name);


        }
    }

    registerController(source, dist, modelName, name) {

        fs.readFile(source, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
               // resolve(true);
            }
            else {


                data = data.replace('express.Router();', 'express.Router();\n\tthis.express.use(\'/'+modelName+'\', this.'+modelName+'Controller.router);');
                data = data.replace('constructor()', '@Inject\n\tprivate '+modelName+'Controller: '+name+'Controller;\n\tconstructor()');
                data = data.replace('class', 'import {'+name+'Controller} from "./'+name+'/'+name+'Controller";\nclass');

                fs.stat(dist, function (err, stat) {
                    if (err == null) {
                        var question = [
                            {
                                name: 'override',
                                type: 'input',
                                message: 'file' + dist.toString() + ' existed . Override? (y/n):',
                                validate: function (value) {
                                    if (value === 'y' || value === 'n') {
                                        return true;
                                    } else {
                                        return 'Please enter (y/n)';
                                    }
                                }
                            }
                        ];
                        inquirer.prompt(question).then(function (answers) {
                            if (answers.override == 'y') {
                                fs.writeFile(dist, data, 'utf8', function (err) {
                                    if (err) console.log(err);
                                    else {
                                        var message = dist + ' replaced';
                                        console.log(message);
                                    }
                                   // resolve(true);
                                });
                            }
                            else {
                              //  resolve(true);
                            }
                        });

                    }
                    else if (err.code == 'ENOENT') {
                        mkdirp(path.dirname(dist), function (err) {
                            if (err) console.log(err);
                            else {
                                fs.writeFile(dist, data, 'utf8', function (err) {
                                    if (err) console.log(err);
                                    else {
                                        var message = dist + ' created';
                                        console.log(message);
                                    }
                                    //resolve(true);
                                });
                            }
                        });
                    } else {
                        console.log('Some other error: ', err.code);
                       // resolve(true);
                    }
                });
            }
        });


    }
};