/* eslint-disable no-param-reassign */
const os = require('os');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const { execCommandTask } = require('./exec-async-command');

/**
 * @type {(command: string) => import('listr2').ListrTask<import('../../../typings/context').ListrContext>}
 */
const executeSudoCommand = (command) => ({
    task: async (ctx, task) => {
        task.output = 'Enter your sudo password!';
        task.output = logger.style.command(`>[sudo] password for ${ os.userInfo().username }:`);

        return task.newListr([
            execCommandTask(command, {
                callback: (t) => {
                    task.output = t;
                },
                pipeInput: true
            })
        ]);
    },
    options: {
        bottomBar: 10
    }
});

module.exports = executeSudoCommand;