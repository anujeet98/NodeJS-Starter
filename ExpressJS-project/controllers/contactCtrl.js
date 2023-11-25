const path = require('path');

exports.getContactUs = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","contactus.html"));
};

exports.getSuccessPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","success.html"));
};