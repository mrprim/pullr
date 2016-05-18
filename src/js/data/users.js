var $ = require('jquery'),
    api = api || {},
    users = [
        {
            id: 1,
            firstName:"Sergio",
            lastName:"Rodriguez",
            role:"Admin",
            searchTerms:[
                "Unwritten"
                ,"B.P.R.D."
                ,"Creepy"
                ,"Abe Sapien"
                ,"Hellboy"
                ,"Atomic Robo"
                ,"Witch"
                ,"Adr"
                ,"Action"
            ],
            comics: [
                "Ghost Racers"
                ,"Inhumans"
                ,"Thors"
                ,"ActionVerse"
            ]
        }
        ,{
            id: 2,
            firstName:"Steele",
            lastName:"Simpson",
            role:"User",
            searchTerms:[
                "Sonja"
                ,"Deadpool"
                ,"Thor"
                ,"Conan"
                ,"Loki"
                ,"Turtles"
            ],
            comics: [
                "Weirdworld"
                ,"Deadpool's Secret Secret Wars"
            ]
        }
    ]

api.getUsers = function() {
    var dfd = $.Deferred();
    dfd.resolve(users);

    return dfd.promise();
}

api.getUser = function(id) {
    var dfd = $.Deferred(),
        user;
    $.each(users, function(i,obj) {
        if(obj.id === id) {
            user = obj;
            return false;
        }
    });
    dfd.resolve(user);
    return dfd.promise();
}


module.exports = api;