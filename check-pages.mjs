import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
for(const name of ['index.html','help/index.html','policy/index.html']) {
  const html=fs.readFileSync(path.join(root,name),'utf8');
  assert(!html.includes('{{'),`Unfilled template: ${name}`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`Duplicate IDs: ${name}`);
  for(const [,value] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if(/^(?:[a-z]+:|\/\/)/i.test(value))continue;
    const [relative,anchor]=value.split('#');
    let file=relative?path.resolve(root,path.dirname(name),relative):path.join(root,name);
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    assert(fs.existsSync(file),`Missing local target ${value} in ${name}`);
    if(anchor&&file.endsWith('.html'))assert(fs.readFileSync(file,'utf8').includes(`id="${anchor}"`),`Missing anchor ${value} in ${name}`);
  }
  if(name!=='index.html') {
    assert(html.includes('aria-current="page"'));
    assert(html.includes('https://miniature-studio.co.uk/'));
    assert(html.includes('../style.css'));
  }
}
for(const [file,route] of [['support.html','help/'],['privacy.html','policy/']]) {
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert(html.includes(`url=${route}`));
  assert(html.includes('location.hash'));
}
assert(fs.readFileSync(path.join(root,'.github/workflows/pages.yml'),'utf8').includes('cp -r assets help policy public/'));
console.log('Passed: homepage, help/policy links, anchors, assets, metadata, legacy redirects and deployment routes.');
