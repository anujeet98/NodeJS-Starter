const fs = require('fs');

let requestHandler = (req,res) => {
    const url = req.url;
    const post = req.method;
    if(url === '/'){
        fs.readFile('message.txt',(err,data)=>{
            if(err){
                console.log(err);
            }
            res.setHeader('Content-Type', 'text/HTML');
            res.write('<html>');
            res.write('<head><title>Node JS server application</title></head>');
            res.write('<body>');
            res.write(`<h1>${data}</h1>`);
            res.write('<form method="post" action="/message">');
            res.write('<input type="text" name="message">');
            res.write('<input type="submit" value="send">');
            res.write('</form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
        return;
    }
    if(url === '/message' && post === "POST"){
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
            //console.log(chunk);
        });
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);

            const message = parsedBody.split("=")[1];

            fs.writeFile('message.txt',message,(err)=>{
                res.statusCode = 302;
                res.setHeader('location','/');
                return res.end();
            });
        });
    
    }
    res.setHeader('Content-Type', 'text/HTML');
    res.write('<html>');
    res.write('<head><title>Node JS server application</title></head>');
    res.write('<body><h1>Welcome to my node JS application</h1></body>');
    res.write('</html>');
    return res.end();
};


// module.exports = requestHandler;

// module.exports = {
//     handler : requestHandler,
//     someText : 'hello world'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'hello world';

exports.handler = requestHandler;
exports.someText = 'hello world';