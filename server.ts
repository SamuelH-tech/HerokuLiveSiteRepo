import http from 'http'; // import pre-bundled module(s)
import fs from 'fs';
import mime from 'mime-types'; // third-party module
let lookup = mime.lookup; // alias for mime.lookup
// look for enviroment variable in the server called PORT or use 3000
const port = process.env.PORT || 3000;

// Create an Instance of a Server (Immutable) cannot be modified
const server = http.createServer(function(req, res)
{
    //declare the path as a string from the request
    let path = req.url as string;

    if(path == "/" || path == "/home")
    {
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1)) as string;

    fs.readFile(__dirname  + path, function(err, data)
    {
        if (err) 
        {
            res.writeHead(404);
            //end meaning the end of the write (no more data can be written after it)
            res.end("ERROR: 404 - File Not Found! " + err.message);
            return;
          }
          res.setHeader("X-Content-Type-Options", "nosniff"); // security guard
          res.writeHead(200, {'Content-Type': mime_type});
          res.end(data);
      
    });
});

// like addEventListener("user req on a port")
server.listen(port, function() {
  console.log(`Server running at Port:${port}`);
});