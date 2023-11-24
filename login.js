const express = require('express');

const router = express.Router();

router.get('/login',(req,res,next)=>{
    let html = `<form method="post" action="/" id="form"><input type="text" name="username" id="username" placeholder="username"><br><input type="submit" value="submit"></form>`;
    html+=`<script>document.getElementById("form").addEventListener('submit', (e) => {`;
    html+= `e.preventDefault();`;
    html+=`localStorage.setItem("username",`+"document.getElementById('username').value"+`);`;
    html+=`e.target.submit();`;
    html+=`} )</script>`;

    res.send(html);
});




module.exports = router;