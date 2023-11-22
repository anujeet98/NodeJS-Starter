
const http = require('http');

const server = http.createServer((req, res) =>{
    // console.log('Anujeet');
    // process.exit();
    // console.log(req.url, req.method, req.headers);

    const url = req.url;
    if(url === '/home'){
        res.setHeader('Content-Type', 'text/HTML');
        res.write('<html>');
        res.write('<head><title>Node JS server application</title></head>');
        res.write('<body><h1>Welcome home</h1></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/about'){
        res.setHeader('Content-Type', 'text/HTML');
        res.write('<html>');
        res.write('<head><title>Node JS server application</title></head>');
        res.write('<body><h1>Welcome to About us page</h1></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/node'){
        res.setHeader('Content-Type', 'text/HTML');
        res.write('<html>');
        res.write('<head><title>Node JS server application</title></head>');
        res.write('<body><h1>Welcome to my node JS application</h1></body>');
        res.write('</html>');
        res.end();
    }
    // res.write('<h1>sdsdf</h1>'); //gives error after 1 request: write after end error thrown
});

server.listen(4000);