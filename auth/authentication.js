/**
 * authentication.js contains functions used to authenticate the users.
 * Used to check wether a user is logged in or not.
 * Also used to check wether a user has admin privileges or not.
 */

//authenticates the user, checking if the user is logged in with the use of the current session. 
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

//authenticates the user if it is an admin or not using the session.
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