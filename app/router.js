module.exports = app => {
    const { router, controller } = app;
    // 添加static中间件
    const index = app.config.coreMiddleware.indexOf('static');
    // const validate = app.middleware.token();
    // const log = app.middleware.log();
    // app.middleware.splice(index, 0, validate);
    // app.middleware.splice(index, 0, log);

    router.resources('note', '/api/note', controller.note);
    router.resources('role', '/api/role', controller.role);
    router.resources('groupUser', '/api/groupUser', controller.groupUser);
    router.resources('group', '/api/group', controller.group);
    router.resources('user', '/api/user', controller.user);
    router.resources('keyword', '/api/keyword', controller.keyword);
    router.resources('message', '/api/message', controller.message);
    router.resources('module', '/api/module', controller.module);
    router.resources('video', '/api/video', controller.video);
    router.resources('history', '/api/history', controller.history);
    router.resources('videoComment', '/api/videoComment', controller.videoComment);
    router.resources('post', '/api/post', controller.post);
    router.resources('postLike', '/api/postLike', controller.postLike);
    router.resources('favorire', '/api/favorite', controller.favorite);
    router.resources('cinema', '/api/cinema', controller.cinema);

    router.post('/upload/:type', controller.file.upload);
};
