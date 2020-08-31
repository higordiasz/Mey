const DOMAIN = process.env.DOMAIN;
const http = require("http");
const request = require("request");
function pingURL(url) {
 return new Promise((resp, rej) => {
   request(url,{ headers: { 'User-Agent': `${Math.floor(Math.random() * (99999999999999999 - 1)) + 1}` } }, (err, res, body) => {
     if (err) {rej()} else {resp();}
     
  
   });
 });
}

function ping()
{
  if (!process.env.DOMAIN) return;
  
 // console.log("---------Loading...---------");
  
 //fs.readFile("./urls-save.json", "utf8", function(err, contents) {
    
      //try {
    //    let j = JSON.parse(conte          pingURL(DOMAIN);
        /*  console.log(`Sucessfully pinged ${url}!`);
          
            console.log(`Unable to ping ${url}! Status code: NuLl.`);
       */
       
  /*    } catch(e) {
        console.log("Unable to parse!")
        console.log(err);
      } */
  
    }
setInterval(() => {
 ping();
}, 180000);

ping();