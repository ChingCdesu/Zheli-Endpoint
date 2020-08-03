module.exports = () => {
    return async function (ctx, next) {
        let query = ctx.request.query;

        if (!ctx.request.path.startsWith("/api/user")) {
            const token = query.token;
            const userId = query.userId;

            const correctToken = await ctx.service.token.get(userId);

            if (correctToken === null || token !== correctToken) {
                return;
            } else {
                ctx.headers.nextToken = await ctx.service.token.generate(userId);
            }
        }
        await next();
    }
};
