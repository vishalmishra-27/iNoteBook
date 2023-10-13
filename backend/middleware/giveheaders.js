app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://i-note-book-frontend.vercel.app');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})