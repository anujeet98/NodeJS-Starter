const fs = require('fs');
const express = require('express');

const router = express.Router();

let read = (req,res) =>{

}

router.get('/',(req,res)=>{
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            console.log(err);
        }

        data = (data.length===0)?'No chats exist':data;
        console.log("sending data: ");
        let html = `<h1>${data}</h1>`;
        html+=`<form onSubmit="document.getElementById('username').value=localStorage.getItem('username')" method="post" action="/">`;
        html+=`<input type="text" name="message" placeholder="message" id="message"><input type="hidden" name="username" id="username" value=""><input type="submit" value="send">`;
        html+=`</form>`;
        res.send(html);
    });
});

router.post('/',(req,res,next)=>{
    if(req.body.message !== undefined && req.body.message !== ""){
        console.log("message recieved to append", req.body);
        fs.appendFile('message.txt', req.body.username+": "+req.body.message+";    \n",(err)=>{
            if(err){
                console.log(err);
            }
            res.redirect('/');
        });
    }
    else{
        res.redirect('/');
    }
});


// let requestHandler = (req,res) => {
//     const url = req.url;
//     const post = req.method;
//     if(url === '/'){

//         return;
//     }
//     if(url === '/message' && post === "POST"){
//         const body = [];
//         req.on('data', (chunk)=>{
//             body.push(chunk);
//             //console.log(chunk);
//         });
//         return req.on('end', ()=>{
//             const parsedBody = Buffer.concat(body).toString();
//             console.log(parsedBody);

//             const message = parsedBody.split("=")[1];

//             fs.writeFile('message.txt',message,(err)=>{
//                 res.statusCode = 302;
//                 res.setHeader('location','/');
//                 return res.end();
//             });
//         });
    
//     }
//     res.setHeader('Content-Type', 'text/HTML');
//     res.write('<html>');
//     res.write('<head><title>Node JS server application</title></head>');
//     res.write('<body><h1>Welcome to my node JS application</h1></body>');
//     res.write('</html>');
//     return res.end();
// };


// module.exports = requestHandler;

// module.exports = {
//     handler : requestHandler,
//     someText : 'hello world'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'hello world';

// exports.handler = requestHandler;
// exports.someText = 'hello world';

module.exports = router;