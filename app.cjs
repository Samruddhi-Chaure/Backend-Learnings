const express = require ("express");
const os = require("os");

const app = express();
const port = 5000;

app.get('/a' , function(req,res){
    res.json({
        "Name" : "My name is Samruddhi"
    });
})

app.listen(port, function(){
    console.log("Hiiiiiiiiii");
    //console.log(`🚀 Server running at http://localhost:${port}`);
});