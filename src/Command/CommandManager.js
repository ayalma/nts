/**
 * Created by ali on 7/28/17.
 */
var {Model} = require('./Model/Model');
var {App} = require('./App/App');
exports.CommandManager = class
{
    constructor() {
        this.cmds = {};
        this.cmds.model = new Model();
        this.cmds.init = new App();
    }

    runCmd(cmd,args){
        if (cmd === undefined || this.cmds[cmd] === undefined ) {
            console.log('pls see help');
            return;
        }
        this.cmds[cmd].run(args);
    }
};