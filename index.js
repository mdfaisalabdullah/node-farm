const fs = require("fs");
const http = require("http");
const url = require("url");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is we know about avocado: ${textIn} \n create: ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File Written");

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) return;
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2}....${data3}`, "utf-8", err => {
//         if (err) console.log("ERROR");
//       });
//     });
//   });
// });

// console.log("loading..........");

// const server = http.createServer((req, res) => {
//   res.end("Hello, this is a server response.");
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to the request.....");
// });

const replaceTemp = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {"Content-type": "text/html"});

    const cardsHtml = dataObj.map(el => replaceTemp(tempCard, el)).join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(output);
  } else if (pathName === "/product") {
    res.end("Hello, this is PRODUCT.");
  } else if (pathName === "/api") {
    res.writeHead(200, {"Content-type": "application/json"});
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h3>Hello, nothing is found.</h3>");
  }
  console.log(pathName);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening.......");
});
