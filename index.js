////////////////////////////////////////
// FILES
// const fs = require('fs');
// const path = require('path');

// const textIn = fs.readFileSync(path.join(__dirname, './txt/input.txt'), 'utf-8');
// console.log(textIn);

// const textOut = `${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

////////////////////////////////////////
// SERVER
const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./utils/replaceTemplate');

const productsData = fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8');
const overviewTemp = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const cardTemp = fs.readFileSync(`${__dirname}/templates/product-card.html`, 'utf-8');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    const products = JSON.parse(productsData);
    const productList = products
      .map((product) => replaceTemplate(cardTemp, product))
      .join('');
    const overview = overviewTemp.replace('<% PRODUCTLIST %>', productList);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(overview);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'Other-Custom-Header': 'xxx',
    });
    res.end('<h1>page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
