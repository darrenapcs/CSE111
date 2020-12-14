// Create express app
var express = require("express")
var app = express()

const Games = require('./games')
var games = new Games('./proj2.sqlite.txt')

// Server port
var HTTP_PORT = 8000 

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.get("/api/platform", (req, res, next) => {
    games.allPlatform()
        .then((platforms) => {
            res.json({
                "message": "success",
                "data": platforms
            })
        })
        .catch((err) => {
            res.status(400).json({"error": err.message});
            return;
        })
});

app.get("/api/companies", (req, res, next) => {
    games.allCompanies()
        .then((companies) => {
            res.json({
                "message": "success",
                "data": companies
            })
        })
        .catch((err) => {
            res.status(400).json({"error": err.message});
            return;
        })
});

app.get("/api/gen", (req, res, next) => {
    games.allGenre()
        .then((gen) => {
            res.json({
                "message": "success",
                "data": gen
            })
        })
        .catch((err) => {
            res.status(400).json({"error": err.message});
            return;
        })
});

app.get("/api/games", (req, res, next) => {
    games.allGame()
        .then((game) => {
            res.json({
                "message": "success",
                "data": game
            })
        })
        .catch((err) => {
            res.status(400).json({ "error": err.message });
            return;
        })
});

app.get("/api/platform-genre/:platform-:genre", (req, res, next) => {
    if (req.params.genre == "All") {
        games.allGamesByPlatform(req.params.platform)
            .then((genre) => {
                res.json({
                    "message": `Games by ${req.params.platform}`,
                    "data": genre
                })
            })
            .catch((err) => {
                res.status(400).json({ "error": err.message });
                return;
            })
    }
    else {
        games.GamesByPlatform(req.params.genre, req.params.platform)
            .then((genre) => {
                res.json({
                    "message": `${req.params.genre} by ${req.params.platform}`,
                    "data": genre
                })
            })
            .catch((err) => {
                res.status(400).json({ "error": err.message });
                return;
            })
    }
});

app.get("/api/companies-Agerating/:companies-:Agerating", (req, res, next) => {
    if (req.params.Agerating == "All") {
        games.allCompaniesByAgeRating(req.params.companies)
            .then((Agerating) => {
                res.json({
                    "message": `Games by ${req.params.companies}`,
                    "data": Agerating
                })
            })
            .catch((err) => {
                res.status(400).json({ "error": err.message });
                return;
            })
    }
    else {
        games.CompaniesByAgeRating(req.params.Agerating, req.params.companies)
            .then((Agerating) => {
                res.json({
                    "message": `${req.params.Agerating} by ${req.params.companies}`,
                    "data": Agerating
                })
            })
            .catch((err) => {
                res.status(400).json({ "error": err.message });
                return;
            })
    }
});

app.get("/api/gen-mode/:gen-:mode", (req, res, next) => {
    if (req.params.mode == "All") {
        games.allGenreByMode(req.params.gen)
            .then((mode) => {
                res.json({
                    "message": `Games by ${req.params.gen}`,
                    "data": mode
                })
            })
            .catch((err) => {
                res.status(400).json({ "error": err.message });
                return;
            })
    }
    else {
        games.GenreByMode(req.params.mode, req.params.gen)
            .then((mode) => {
                res.json({
                    "message": `${req.params.mode} by ${req.params.gen}`,
                    "data": mode
                })
            })
            .catch((err) => {
                res.status(400).json({ "error": err.message });
                return;
            })
    }
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
