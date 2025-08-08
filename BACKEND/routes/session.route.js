const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.get('/create', (req, res) => {
    // const { mentorName, studentName } = req.body;
    const roomName = `session-${crypto.randomBytes(4).toString('hex')}`;

    res.json({
        meetingURL: `https://meet.jit.si/${roomName}`
    });
});

module.exports = router;
