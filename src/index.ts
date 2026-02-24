import express from "express";

const app = express();


app.get("/hello", (req, res) => {
    console.log("Hello world");
    res.send("Hello World");
});
app.listen(8080, () => {
    console.log("servidor rondando na porta 8080")
})