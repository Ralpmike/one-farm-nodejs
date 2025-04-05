const fs = require("node:fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

const textOut = `This is what we know about the avocado:${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

console.log(textIn, "This is the text in the file!");
console.log("File written!");

// fs.readFile("./txt/start.txt", "utf-8", (err, data) =>
//   setTimeout(() => {
//     if (err) return console.log("Error reading file:", err);

//     console.log("This is the data:", data);
//   }, 3000)
// );
// console.log("Reading file...");
