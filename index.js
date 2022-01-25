const fs = require("fs");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is we know about avocado: ${textIn} \n create: ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File Written");

fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) return;
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}....${data3}`, "utf-8", err => {
        if (err) console.log("ERROR");
      });
    });
  });
});

console.log("loading..........");
