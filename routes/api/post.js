const express = require('express');

const router = express.Router();

// @route  api/post
// @method GET
// @access Public
router.get('/', (req, res)=>{
    res.send('Post Route')
});

module.exports = router;