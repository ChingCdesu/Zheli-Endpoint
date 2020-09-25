module.exports = () => {
  return async function (ctx, next) {
    let query = ctx.request.query;

    const token = query.token;
    const user = query.user;

    if (ctx.request.path !== "/api/user") {
      const correctToken = await ctx.service.token.get(user);
      console.log(`CorrectToken: ${correctToken}`);
      console.log(`QueryToken: ${token}`);
      if (correctToken === null || token !== correctToken) {
        ctx.status = 403;
        return;
      }
    }

    delete ctx.request.query.token;
    delete ctx.request.query.user;

    await next();

    const nextToken = await ctx.service.token.generate(user || ctx.body.data.values[0].id);
    ctx.set('token', nextToken);

  }
};
