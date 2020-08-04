module.exports = () => {
    return async function (ctx, next) {
        let query = ctx.request.query;

        const token = query.token;
        const user = query.user;

        if (ctx.request.path !== "/api/user") {
            const correctToken = await ctx.service.token.get(user);
            if (correctToken === null || token !== correctToken) {
                ctx.status = 403;
                return;
            }
        }
        await next();
        if (ctx.body.retCode === 0) {
            const nextToken = await ctx.service.token.generate(user);
            ctx.set('token', nextToken);
        }
    }
};
