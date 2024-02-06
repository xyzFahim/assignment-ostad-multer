const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const PORT = 5500;

const upload = multer({ dest: "uploads/" });

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is Home Page');
        res.end();
    } else if (method === 'GET' && url === '/upload') {
        fs.readFile(path.resolve("./views/upload.html"), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else if (method === 'POST' && url === '/file-upload') {
        upload.single("myfile")(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request');
            } else if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                console.log(req.file);
                console.log(req.body);
                if (req.file) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("File Upload Success");
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("File Upload Failed");
                }
            }
        });
    } else if (method === 'GET' && url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is About Page');
        res.end();
    } else if (method === 'GET' && url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is Contact Page');
        res.end();
    } else if (method === 'GET' && url === '/file-write') {
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error writing file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('File "demo.txt" created and text "hello world" written');
            }
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
