
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml');

console.log('start read')
const out = []
let re = /---(.*?)---/sg
function readAll(parentPath) {
  try {
    const files = fs.readdirSync(parentPath)
    files.map(item => {
      let tempPath = path.join(parentPath, item);
      let stats = fs.statSync(tempPath);
      if (stats.isDirectory()) {
        readAll(tempPath);
      } else {
        const content = fs.readFileSync(tempPath, 'utf8')
        let s = re.exec(content)
        re.lastIndex = 0
        if (s) {
          let docs = yaml.load(s[1])
          docs.link = tempPath.slice(4, -3)
          out.push(docs);
        }
      }
    })
  } catch (e) {
    console.warn(e)
    return out
  }
}
readAll('./docs/write')

const filePath = 'docs/.vitepress/components/docs.json';
const async1 = async () => {
  console.log("async1");
  setTimeout(() => {
    console.log("timer1");
  }, 2000);
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 end"); //11111
  return "async1 success";
};
console.log("script start");
async1().then((res) => console.log(res, "res"));
console.log("script end");
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then((res) => console.log(res, "res2"));
setTimeout(() => {
  console.log("timer2");
}, 1000);
fs.writeFileSync(
  filePath,
  JSON.stringify(out),
  {
    encoding: 'utf8',
  }
);