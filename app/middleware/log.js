module.exports = () => {
    return async function (ctx, next) {
        await next();
        ctx.getLogger('requestLogger').info();
        // if (!ctx.request.path.startsWith('/public'))
        //     console.log(ctx.body);
    }
}
