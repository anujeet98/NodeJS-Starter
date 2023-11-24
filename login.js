const express = require('express');

const router = express.Router();

router.get('/login',(req,res,next)=>{
    let html = `<form onSubmit="localStorage.setItem('username', document.getElementById('username').value)" method="get" action="/" id="form">
    <input type="text" name="username" id="username" placeholder="username"><br>
    <input type="submit" value="submit">
    </form>`;

    res.send(html);
});




module.exports = router;