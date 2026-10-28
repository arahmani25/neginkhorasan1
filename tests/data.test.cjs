const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {transformSync}=require('next/dist/build/swc');
const seed={SITE:{site_name:'Demo'},PACKAGES:[{id:'seed-p1',name:'Sample'}]};
function dataModule(client) {
 const code=transformSync(fs.readFileSync('lib/data.js','utf8'),{filename:'data.js',jsc:{parser:{syntax:'ecmascript'}},module:{type:'commonjs'}}).code;
 const module={exports:{}};
 const mocks={react:{cache:fn=>fn},'./supabase':{getSupabase:()=>client},'./seed':seed,'./utils':{utils:{}}};
 vm.runInNewContext(code,{module,exports:module.exports,require:name=>mocks[name],console:{error:()=>{}}});
 return module.exports;
}
function client(result){return {from:()=>({select:()=>({order:async()=>result,eq:()=>({maybeSingle:async()=>result})})})};}
test('empty connected database remains empty rather than reviving demo records',async()=>{
 const data=dataModule(client({data:[],error:null}));
 assert.equal((await data.getPackages()).length,0);
});
test('database failure is surfaced instead of silently displaying sample records',async()=>{
 const data=dataModule(client({data:null,error:{code:'NETWORK'}}));
 await assert.rejects(data.getPackages(),/could not load/);
});
test('demo records are only used when the database is unconfigured',async()=>{
 const data=dataModule(null);
 assert.equal((await data.getPackages())[0].id,'seed-p1');
});
test('deleted and invalid live records do not fall back to sample records',async()=>{
 const data=dataModule(client({data:null,error:null}));
 assert.equal(await data.getPackage('seed-p1'),null);
 assert.equal(await data.getPackage('00000000-0000-0000-0000-000000000001'),null);
});
test('article HTML keeps formatting while removing executable content',()=>{
 const code=transformSync(fs.readFileSync('lib/html.js','utf8'),{filename:'html.js',jsc:{parser:{syntax:'ecmascript'}},module:{type:'commonjs'}}).code;
 const module={exports:{}};
 vm.runInNewContext(code,{module,exports:module.exports,require});
 const clean=module.exports.cleanHtml('<h2>Hello</h2><script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">Bad</a><p onclick="alert(1)">Text</p>');
 assert.ok(clean.includes('<h2>Hello</h2>'));assert.ok(!/script|onclick|onerror|javascript|<img/.test(clean));
});
