function authUser(req, res, next){
    let session = req.session;
    if(session.token == null){
        console.log('Not logged in!');
        res.statusMessage = 'Not logged in?';
        res.status(403).end();
        
    }else{
        next();
    }
    
};


function authRole(req, res, next){
    let session = req.session;
    if(session.privilege != 1){
        console.log('Not an admin..');
        res.statusMessage ='Not an admin';
        res.status(403).end();
        
    }else{
        next();
    }

    
};

module.exports = {
    authUser,
    authRole
}