import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
const root=fileURLToPath(new URL('./dist/',import.meta.url));
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html;charset=utf-8','.js':'text/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.json':'application/json;charset=utf-8','.jpg':'image/jpeg','.ttf':'font/ttf','.md':'text/plain;charset=utf-8'};
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403).end();return}const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'}).end(data)}catch{res.writeHead(404).end('Not found')}}).listen(port,'127.0.0.1',()=>console.log(`Богд хаант Монгол → http://127.0.0.1:${port}\nЗогсоох: Ctrl+C`));
