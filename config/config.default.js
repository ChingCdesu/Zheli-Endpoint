const path = require('path');

module.exports = appInfo => {
    return {
        middleware: ['log', 'token'],
        keys: "mykey",
        customLogger: {
            requestLogger: {
                file: path.join(appInfo.root, 'logs/request.log'),
                formatter(meta) {
                    return `[${meta.date}] ${meta.message}`;
                },
                contextFormatter(meta) {
                    return `[${meta.date}] [${meta.ctx.method} ${meta.ctx.path}] ${meta.ctx.status} User-Agent: ${meta.ctx.request.req.headers["user-agent"]}`;
                },
            }
        },
        security: {
            csrf: {
                enable: false
            }
        },
        mysql: {
            client: {
                host: 'localhost',
                port: '3306',
                user: 'root',
                password: 'Lyy19990123',
                database: '2020-contest',
            },
            app: true,
            agent: false,
        }
    }
}
