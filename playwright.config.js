const { defineConfig }=require('@playwright/test');
module.exports=defineConfig({
 testDir:'./tests',testMatch:'**/*.spec.js',fullyParallel:false,workers:1,timeout:30000,
 use:{baseURL:'http://127.0.0.1:3100',headless:true,channel:process.env.PLAYWRIGHT_CHANNEL || 'msedge',screenshot:'only-on-failure'},
 webServer:{command:'npm run start -- --port 3100',url:'http://127.0.0.1:3100',reuseExistingServer:false,timeout:60000},
 reporter:'list'
});
