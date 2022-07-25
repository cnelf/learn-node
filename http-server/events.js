const fs = require('fs');
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  // Solution1
  // fs.readFile('./txt/input.txt', (err, data) => {
  //   res.end(data);
  // });

  // Solution2
  // const readable = fs.createReadStream('./txt/input11.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('close', () => {
  //   console.log('Read stream closed');
  // });
  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('Server error: ' + err.message);
  // });

  // Solution3
  const readable = fs.createReadStream('./txt/input.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:8000');
});
