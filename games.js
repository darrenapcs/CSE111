const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

class Games {
    constructor(dbFilePath){
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err){
                console.log('Could not connect to database', err)
            }
            else {
                console.log('Connected to database')
            }
        })
    }


    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    allPlatform(){
        return this.all(
            "SELECT DISTINCT Name FROM Platform ORDER BY Name", [])
    }

    allGenre(){
        return this.all(
            "SELECT DISTINCT Name FROM Genre ORDER BY Name", [])
    }

    GamesByPlatform(_genre, _platform){
        return this.all(
            "select Games.Name as game_name, " +
            "Genre.Name, Platform.Name " +
            "from Platform, Games, Genre, GameType, GamePlatform " +
            "where Platform.PlatformKey = GamePlatform.PlatformKey " +
            "AND GamePlatform.GameKey = Games.GameKey AND GameType.GenreKey = Genre.GenreKey " +
            "AND Genre.Name =" + "'" + _genre + "'" + " " + 
            "AND GameType.GameKey = Games.GameKey AND Platform.Name = ?", [_platform])
    }

    allGamesByPlatform(_platform){
        return this.all(
            "select Games.Name as Game_name, Platform.Name as PN, Genre.Name as GN " +
            "from Platform, Games, Genre, GameType, GamePlatform " +
            "where Platform.PlatformKey = GamePlatform.PlatformKey " +
            "AND GamePlatform.GameKey = Games.GameKey " +
            "AND GameType.GenreKey = Genre.GenreKey " +
            "AND GameType.GameKey = Games.GameKey " +
            "AND Platform.Name = ?", [_platform])
    }

    allCompanies(){
        return this.all(
            "select DISTINCT Name from Companies ORDER BY Name", [])
    }

    allCompaniesByAgeRating(_companies){
        return this.all(
            "select Games.Name as Games_Name,  Companies.Name as Comp_Name, " +
            "Nation.Name as Nation_Name, Region.Name as Region_Name " +
            "from Games, Nation, Companies, Region " +
            "where Games.CompKey = Companies.CompKey " +
            "AND Companies.NationKey = Nation.NationKey " +
            "AND Nation.Regionkey = Region.Regionkey " + 
            "AND Companies.Name = ?", [_companies])
    }

    CompaniesByAgeRating(_ageRating, _companies){
        return this.all(
            "select Games.Name as Games_Name,  Companies.Name as Comp_Name, " +
            "Nation.Name as Nation_Name, Region.Name as Region_Name " +
            "from Games, Companies, Nation, Region " +
            "where Games.CompKey = Companies.CompKey " +
            "AND Companies.NationKey = Nation.NationKey " +
            "AND Nation.RegionKey = Region.RegionKey " +
            "AND Games.AgeRating = " + "'" + _ageRating + "' " +
            "AND Companies.Name = ?", [_companies])
    }

    GenreByMode(_mode, _gen){
        return this.all(
            "select Games.Name as gameName, Genre.Name as genreName, " +
            "Mode.Name as modeName " +
            "from Games, Genre, GameType, Mode " +
            "where Games.GameKey = GameType.GameKey AND GameType.GenreKey = Genre.GenreKey " +
            "AND Mode.Name = '" + _mode + "' " +
            "AND Games.TypeKey = Mode.TypeKey AND Genre.Name = ?", [_gen])
    }

    allGenreByMode(_gen){
        return this.all(
            "select Games.Name as gameName, Genre.Name as genreName, " +
            "Mode.Name as modeName " +
            "from Games, Genre, GameType, Mode " +
            "where Games.GameKey = GameType.GameKey AND GameType.GenreKey = Genre.GenreKey " +
            "AND Games.TypeKey = Mode.TypeKey AND Genre.Name = ?", [_gen])
    }

    allGame(_game){
        return this.all(
            "select Games.Name as Games_name, Games.Rating as Game_rating, " +
            "Games.AgeRating as Game_Agerating, Games.Payment as Game_payment, " +
            "Games.PublishedYear as Game_Year, Mode.Name as Game_mode " + 
            "from Games, Mode " +
            "where Mode.TypeKey = Games.TypeKey " +
            "ORDER BY Games.GameKey", [])
    }


}

module.exports = Games