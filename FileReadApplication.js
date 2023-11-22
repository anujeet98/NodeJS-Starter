
const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    const url = req.url;
    const post = req.method;
    if(url === '/'){
        res.setHeader('Content-Type', 'text/HTML');
        res.write('<html>');
        res.write('<head><title>Node JS server application</title></head>');
        res.write('<body><form method="post" action="/message"><input type="text" name="message"><input type="submit" value="send"></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && post === "POST"){
        const body = [];
        req.on('data', (chunk)=>{
            //add to body array until data event occurs
            body.push(chunk);
            console.log(chunk);
        });
        //also create an event listner to handle end event => occurs when data event completes
        return req.on('end', ()=>{
            //body is loaded now parse it by moving into buffer
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);

            //get the body by separating the key
            const message = parsedBody.split("=")[1];
            //now write it to the file
            // fs.writeFileSync('message.txt',message);  //writefilesync is synchronous so it blocks other code and request so instead use writefile
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
});


server.listen(4000);