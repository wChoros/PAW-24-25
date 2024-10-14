import * as http from "node:http"
import * as fs from "node:fs"
import mime from 'mime-types';
import formidable from 'formidable'

const server = http.createServer((req, res) => {
    const url = req.url
    console.log("url - " + url)
    if (url === "/") {
        res.write('<html lang="en">')
        res.write('<head><title>Home Page</title></head>')
        res.write("<body><form action='/handle-form' method='POST'><input type='text' name='name' placeholder='Name'><input type='text' name='surname' placeholder='Surname'><button type='submit'>Submit</button></form></body>")
        res.write('</html>')
        res.end()
    } else if (url === "/img-form") {
        res.write('<html lang="en">')
        res.write('<head><title>Home Page</title></head>')
        res.write("<body><form action='/file-upload' method='POST' enctype='multipart/form-data'><input type='file' name='image' placeholder='Image'><button type='submit'>Submit</button></form></body>")
        res.write('</html>')
        res.end()
    } else if (url === "/file-upload") {
        const form = formidable();
        console.log(form);
        form.parse(req, (err, fields, files) => {
            const oldPath = files[0]

            const newPath = 'assets/' + files.image.originalFilename;
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error saving the file');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<html lang="en">');
                res.write('<head><title>Home Page</title></head>');
                res.write('<body><h1>File uploaded</h1></body>');
                res.write('</html>');
                res.end();
            });
        });
    } else if (url === "/handle-form") {
        let body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString()
            console.log(body)
            let name = body.split('&')[0].split('=')[1]
            let surname = body.split('&')[1].split('=')[1]
            res.writeHead(200, {"Content-Type": "text/html"})
            res.write(`<html lang="en">`)
            res.write(`<head><title>Form</title></head>`)
            res.write(`<body><h1>Hello ${name} ${surname}</h1></body>`)
            res.write(`</html>`)
            res.end()
        })
    } else if (url === "/json") {
        res.writeHead(200, {"Content-Type": "application/json"})
        let returning_json = {
            "hello": "world",
        }
        returning_json = JSON.stringify(returning_json)
        res.end(returning_json)
    } else if (url === "/html") {
        res.writeHead(200, {"Content-Type": "text/html"})
        let html = `
        <html lang="en">
        <head>
            <title>Hello World</title>
        </head>
        <body>
            <h1>Hello World from text</h1>
        </body>
        </html>`
        res.end(html)
    } else if (url === "/html-file") {
        res.writeHead(200, {"Content-Type": "text/html"})
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.end("Error" + err)
            } else {
                res.end(data)
            }
        })
    } else if (url.startsWith("/get-params")) {
        let query = new URL(req.url, `http://${req.headers.host}`).searchParams
        let params = query.entries()
        console.log(params)
        let json_content = {}
        for (const param of params) {
            json_content[param[0]] = param[1]
        }

        fs.writeFile("params.json", JSON.stringify(json_content, null, 2), (err) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain"})
                res.end(JSON.stringify({"error": err}))
            }
        });
        res.writeHead(200, {"Content-Type": "text/json"})
        res.end(JSON.stringify({'ok': 'ok'}));
    } else {
        const file_path = "assets/" + url.substring(1)
        const file_extension = url.substring(url.lastIndexOf("."))

        //     if the given file path is a file,then read the file
        fs.readFile(file_path, (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    res.writeHead(404, {"Content-Type": "text/plain"})
                    res.end("404 Not Found")
                } else {
                    res.writeHead(500, {"Content-Type": "text/plain"})
                    res.end("500 Internal Server Error")
                }
            } else {
                let content_type = mime.lookup(file_extension)
                console.log(content_type)
                if (content_type === false) {
                    content_type = "text/plain"
                }
                res.writeHead(200, {"Content-Type": content_type})
                res.end(data)
            }
        })
    }
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
