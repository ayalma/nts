#!/usr/bin/env node
var {Helper} = require('./src/Helper/Helper');
var {CommandManager} = require('./src/Command/CommandManager');


var argv = require('minimist')(process.argv.slice(2));

var cmdManager = new CommandManager();
cmdManager.runCmd(argv._[0],argv);



/*Helper.copyTpl(templatePath('/src/Command/Model/Templates/_test.ts'), distPath('/src/test.ts'), {
    name: 'ali',
    username: 'alimoh2016'
});*/
