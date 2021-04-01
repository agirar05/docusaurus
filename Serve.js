const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
const path = require(`path`);

var http = require('http').createServer(app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, `/build/`)));
app.get(`*`, (req,res) =>{ res.sendFile(path.join(__dirname+`/build/index.html`));});



http.listen(port,()=>{
    console.log("Serveur is listening on "+ port)
})