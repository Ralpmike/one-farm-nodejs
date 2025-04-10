const fs = require("node:fs");
const http = require("node:http");
const url = require("node:url");
const replaceTemplate = require("./modules/replaceTemplate");
////////////////////////////////////////////////////////

// FILE SYSTEM MODULE

//? Blocking, synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `This is what we know about the avocado:${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log(textIn, "This is the text in the file!");
// console.log("File written!");

// ? Non-blocking, asynchronous way

// fs.readFile("./txt/start.txt4444", "utf-8", (err, data1) => {
//   if (err) return console.log("Error reading file:", err);

//   console.log("This is the data:", data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log("This is the data:", data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log("This is the data:", data3);
//       fs.writeFile(`./txt/final.txt`, `${data2} \n${data3}`, "utf-8", (err) => {
//         console.log("file has been written!");
//       });
//     });
//   });
// });

// console.log("Reading file...");

// fs.readFile("./txt/start.txt", "utf-8", (err, data) =>
//   setTimeout(() => {
//     if (err) return console.log("Error reading file:", err);

//     console.log("This is the data:", data);
//   }, 3000)
// );
// console.log("Reading file...");

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
// !SERVER MODULE

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // const pathname = req.url;
  // Overview Page

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsName = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsName);

    res.end(output);
  }
  // Product Page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    // Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server running on port 8000");
});
