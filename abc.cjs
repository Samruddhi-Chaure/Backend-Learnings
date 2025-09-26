const express = require("express");

const app = express();
const port = 3000;

app.get("/abc", (req,res) => {
    res.json({
        "name" : "Aman",
        "Age" : 0
    })
});

app.listen(port, () => {
    console.log("abc");
});