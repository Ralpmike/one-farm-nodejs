const fs = require("node:fs");
const http = require("node:http");

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

// !SERVER MODULE

const server = http.createServer((req, res) => {
  console.log(req), res.end("Hello from the server!");
});
server.listen(8000, "127.0.0.1", () => {
  console.log("server running on port 8000");
});
