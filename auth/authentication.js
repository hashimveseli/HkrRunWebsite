function authUser(req, res, next){
    let session = req.session;
    if(session.token == null){
        console.log('Not logged in!');
        res.status(403);
        res.send('Not logged in?');
    }
    next();
};


function authRole(req, res, next){


    next();
};

module.exports = {
    authUser,
    authRole
}