
const express = require("express");
const dnsRegistryApp = express();
const dnsPort = 3000;

dnsRegistryApp.get('/getServer', (req, res) => {
    const serverUrl = `localhost:${dnsPort}`;
    console.log('Received request for /getServer');
    res.json({ code: 200, server: serverUrl });
});

dnsRegistryApp.listen(dnsPort, () => {
    console.log(`DNS Registry Server is running at http://localhost:${dnsPort}/getServer`);
});
