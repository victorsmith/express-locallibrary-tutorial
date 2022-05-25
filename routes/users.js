var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

/* GET users listing. */
router.get('/1', function (req, res, next) {
	res.send('1');
});

router.get( '/cool/:id', (req, res, next) => {
	// res.send('Youre so cool');
	if (req.params.id === '0') next('route');
	// otherwise pass the control to the next middleware function in this stack
	else next();
  }, (req, res, next) => {
		// send a regular response
		res.send('regular');
	}
);

// handler for the /user/:id path, which sends a special response
// next ('route') triggers this
router.get('/cool/:id', (req, res, next) => {
	res.send('special');
});

module.exports = router;
