import http from "http";
import fs from "fs";

const server = http.createServer((req,res) => {
    if (req.url === "/image"){
        res.writeHead(200, {"Content-type" : "image/jpg"});
        //fs.createReadStream("cat.jpg").pipe(res);
        var afile = fs.readFileSync("cat.jpg");
        console.log(afile);
        res.end(afile);
    }
    else if(req.url === "/abc"){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Hello World");
    } else if (req.url ==="/contact"){
        res.writeHead(200, {"Content-Type" : "text/HTML"});
        res.end("This is the Contact page.");
    } else if (req.url ==="/json"){
        res.writeHead(200, {"Content-Type" : "text/json"});
        var aJson = JSON.stringify({
            "name": "John",
            "role": "Frontend + Backend Learner"
        });
        res.end(aJson);
    } else {
        res.writeHead(200, { "Content-Type": "text/HTML" })
        res.end("Hello World");
    }
});

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});