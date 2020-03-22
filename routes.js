let Router = require('express-promise-router');

let router = new Router();

// GET /
router.get('/', async (request, response) => {
  console.log('Session is:', request.cookies);
  request.session.count = Number(request.session.count || 0) + 1;

  let count = request.session.count;

  response.render('index', { count });
});

module.exports = router;
