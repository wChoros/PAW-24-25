import * as http from "node:http"
import * as fs from "node:fs"

const server = http.createServer((req, res) => {
    const url = req.url
    console.log("url - " + url)
    if (url === "/") {
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.end("Hello World")
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
        const file_extension = url.substring(url.lastIndexOf(".") + 1)

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
                    let content_type = "text/plain"
                    if (file_extension === "html") {
                        content_type = "text/html"
                    } else if (file_extension === "css") {
                        content_type = "text/css"
                    } else if (file_extension === "js") {
                        content_type = "text/javascript"
                    } else if (file_extension === "jpg" || file_extension === "jpeg") {
                        content_type = "image/jpeg"
                    } else if (file_extension === "png") {
                        content_type = "image/png"
                    } else if (file_extension === "pdf") {
                        content_type = "image/gif"
                    }
                    res.writeHead(200, {"Content-Type": content_type + file_extension})
                    res.end(data)
                }
            }
        )
    }
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})