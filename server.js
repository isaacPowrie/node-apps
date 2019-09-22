const express = require("express");
const path = require("path");
const app = express();

const HTTP_PORT = process.env.HTTP_PORT || 8080
function onHttpStart() {
    console.log("Express HTTP listening on: " + HTTP_PORT);
}

/*APPLICATION MIDDLEWARE*/
app.use(express.static("public"));

/*APPLICATION ROUTING*/
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.use((req, res) => {
    res.status(404).send("Error 404: Page not Found");
});

app.listen(HTTP_PORT, onHttpStart);