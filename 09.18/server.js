const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 2137

const server = http.createServer((req, res) => {
    const url = req.url
    console.log(req.url)
    if (url === '/') {
        // Home Page
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        // html menu with links to other pages
        html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Home Page</title>
            </head>
            <body>
                <h1>Home Page</h1>
                <ul>
                    <li><a href="/">Home Page</a></li>
                    <li><a href="/plain">Plain text</a></li>
                    <li><a href="/json">JSON document</a></li>
                    <li><a href="/html-code">HTML page generated in the code</a></li>
                    <li><a href="/html-file">HTML page loaded from a file</a></li>
                    <li><a href="/get_params">Get params</a></li>
                </ul>
            </body>
            </html>
        `
        res.end(html);
    } else if (url === '/plain') {
        // First path - plain text
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
        res.end('This is a plain text page')
    } else if (url === '/json') {
        // Second path - JSON document
        const data = {
            message: 'This is a sample JSON document',
            date: new Date(),
        }
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
        res.end(JSON.stringify(data))
    } else if (url === '/html-code') {
        // Third path - HTML document generated in the code
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Generated HTML</title>
            </head>
            <body>
                <h1>This is an HTML page generated in Node.js code</h1>
                <p>Current date and time: ${new Date()}</p>
            </body>
            </html>
        `);
    } else if (url === '/html-file') {
        // Fourth path - HTML document loaded from a file
        const filePath = path.join(__dirname, 'index.html')
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'})
                res.end('Internal server error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(data)
            }
        })
    } else if (url.startsWith("/get_params")) {
        try {

            const urlParams = new URLSearchParams(req.url.split('?')[1])
            console.log(Object.fromEntries(urlParams.entries()))
            console.log(typeof req)

            const filePath = path.join(__dirname, `params_${new Date().getTime()}.json`)
            fs.writeFile(filePath, JSON.stringify(Object.fromEntries(urlParams.entries())), (err) => {
                if (err) {
                    console.error(err)
                }
            })

            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify({"ok": "ok"}))
        } catch (e) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify({"ok": "not ok"}))
        }
    } else {
        // Other paths - 404 Not Found
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        res.end('404 Not Found')
    }
})

server.listen(port, () => {
    console.log(`Server works on http://localhost:${port}/`)
})
