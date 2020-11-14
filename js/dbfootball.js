function databasePromise(idb) {
    var dbPromise = idb.open("db_football", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("match_favorit")) {
            var indexFavMatch = upgradeDb.createObjectStore("match_favorit", {
                keyPath: "id"
            });
            indexFavMatch.createIndex("homeTeam", "match.homeTeam.name", {
                unique: false
            });
            indexFavMatch.createIndex("awayTeam", "match.awayTeam.name", {
                unique: false
            });
        }
    });

    return dbPromise;
}
