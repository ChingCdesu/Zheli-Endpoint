module.exports = () => {
  return async function (ctx, next) {
    const headers = ctx.request.headers;

    const token = headers.token;
    const user = headers.user;

    if (ctx.request.path.startsWith('/public')) {
      await next();
      return;
    }

    if (ctx.request.path === "/api/user") {
      await next();
      if (ctx.body.retCode === 0) {
        const nextToken = await ctx.service.token.generate(ctx.body.data.values[0]['ID']);
        ctx.set('token', nextToken);
      }
    } else {
      const correctToken = await ctx.service.token.get(user);
      console.log(`CorrectToken: ${correctToken}`);
      console.log(`QueryToken: ${token}`);
      if (correctToken === null || token !== correctToken) {
        ctx.status = 403;
        return;
      }
      await next();
      const nextToken = await ctx.service.token.generate(user || ctx.body.data.values[0]['ID']);
      ctx.set('token', nextToken);
    }
  }
};
