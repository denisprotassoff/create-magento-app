/* eslint-disable no-await-in-loop,no-param-reassign */
const mysql = require('mysql2/promise');
const sleep = require('../../util/sleep');

const connectToMySQL = {
    title: 'Connect to MySQL server',
    task: async (ctx, task) => {
        const { config: { docker }, ports } = ctx;
        const { mysql: { env } } = docker.getContainers();
        await sleep(2000); // add a bit of delay while mysql container is starting for pretty print
        let tries = 0;
        while (tries < 10) {
            tries++;
            try {
                const connection = await mysql.createConnection({
                    host: 'localhost',
                    port: ports.mysql,
                    user: env.MYSQL_USER,
                    password: env.MYSQL_PASSWORD,
                    database: env.MYSQL_DATABASE
                });

                ctx.mysqlConnection = connection;
                break;
            } catch (e) {
                task.output = `Unable to connect to MySQL, retrying... Attempt ${tries}`;
                task.output = e;
                //
            }
            await sleep(5000);
        }
        if (tries === 10) {
            throw new Error('Unable to connect to MySQL server. Check your server configuration!');
        }

        task.title = `MySQL connected${tries > 1 ? ` after ${tries} tries.` : '!'}`;
    },
    options: {
        bottomBar: 10
    }
};

module.exports = connectToMySQL;