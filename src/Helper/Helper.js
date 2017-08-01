/**
 * Created by ali on 7/26/17.
 */
var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var mkdirp = require('mkdirp');

exports.Helper = class {
    static parse() {
        return 'NodeJs TypeScript';
    }

    static copyTpl(source, dist, options = null) {
        return new Promise((resolve, reject) => {

            fs.readFile(source, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    resolve(true);
                }
                else {

                    if (options) {

                        var keys = Object.keys(options);

                        for (var i = 0; i < keys.length; i++) {

                            var re = new RegExp('<%=' + keys[i] + '%>',"gi");
                            data = data.replace(re, options[keys[i]]);
                        }

                    }

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
                                        resolve(true);
                                    });
                                }
                                else {
                                    resolve(true);
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
                                        resolve(true);
                                    });
                                }
                            });
                        } else {
                            console.log('Some other error: ', err.code);
                            resolve(true);
                        }
                    });
                }
            });
        });

    }

    directoryExists(dist) {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    }


    static  getCurrentDirectoryBase() {
        return path.basename(process.cwd());
    }

    static directoryExists(filePath) {

    }


};