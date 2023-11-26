const path = require('path');

exports.Error404 = (req,res,next) => {
    res.status(404).sendFile(path.join(__dirname,"..","views","ErrorPage.html"));
    // next();
}