// 1. Import Dependencies
const express = require('express');
const router = express.Router();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

// 2. Create Instance of Assistant

// 2.1 First Authenticate
const authenticator = new IamAuthenticator({
	apikey: process.env.WATSON_ASSISTANT_APIKEY,
});

// 2.2 Connect to assistant
const assistant = new AssistantV2({
	version: '2019-02-28',
	authenticator: authenticator,
	url: process.env.WATSON_ASSISTANT_URL,
});

// 3. Route to Handle Session Tokens
// GET /api/watson/session
router.get('/session', async (req, res) => {
	// if success
	try {
		const session = await assistant.createSession({
			assistantId: process.env.WATSON_ASSISTANT_id,
		});
		res.json(session['result']);
		// if fail
	} catch (err) {
		res.send('There was an error processing your request.');
		console.log(err);
	}
});

// 4. Handle Messages
// Post /api/watson/message
router.post('/message', async (req, res) => {
	// Construct payload
	payload = {
		assistantId: process.env.WATSON_ASSISTANT_ID,
		sessionId: req.headers.session_id,
		input: {
			message_type: 'text',
			text: req.body.input,
		},
	};

	// If Success
	try {
		const message = await assistant.message(payload);
		res.json(message['result']);

		// If fail
	} catch (err) {
		res.send('There was an error processing your request.');
		console.log(err);
	}
});

// 5. Export routes
module.exports = router;
