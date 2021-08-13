
/********************************
PERSIST in DB!!!
********************************/
const keys = {
	'token': true
};

const keyExists = async (req, res, next) => {
	const { token } = req.body;
	if (!token) {
		return res.status(403).send({ error: `must provide valid token` });
	}

	/********************************
    Check token against Database
    ********************************/

	if (keys[token]) {
		return res.status(403).send({ error: `user already has key` });
	}


	/********************************
    Check token against third party service to make sure valid
    ********************************/


	keys[token] = true;
	next();
};

module.exports = {
	keyExists
};