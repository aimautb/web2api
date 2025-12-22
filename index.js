const express = require('express');
const app = express(); 

const PORT = 3000;

app.use(express.urlencoded({extended : true }));
app.use(express.json());

app.get("/", (req , res )=>{
    res.send("<h1>SERVER IS RUNNING</h1>")
}
);

app.listen(PORT, ()=> {
    console.log(`The server running on the port:${PORT}`)
});
