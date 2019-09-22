const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
app.engine(".hbs", exphbs({ 
    extname: ".hbs",
    helpers: {
        navLink: function(url, options){
            return '<li' +
                ((url == app.locals.activeRoute) ? ' class="nav-item active" ' : ' class="nav-item" ') + 
                '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';
        }
    },
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");

const HTTP_PORT = process.env.HTTP_PORT || 8080
function onHttpStart() {
    console.log("Express HTTP listening on: " + HTTP_PORT);
}

/*APPLICATION MIDDLEWARE*/
// Active window middleware
app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

// Static file middleware
app.use(express.static("public"));

/*APPLICATION ROUTING*/
app.get("/", (req, res) => {
    res.render("home", {
        data: {}
    });
});

app.use((req, res) => {
    res.status(404).send("Error 404: Page not Found");
});

app.listen(HTTP_PORT, onHttpStart);