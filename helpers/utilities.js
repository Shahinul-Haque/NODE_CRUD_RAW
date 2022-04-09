const crypto = require('crypto');
const  environments = require('../helpers/environment');

const utilities = {};

utilities.JSONParse = (stringfyData) =>{

    let output ;

    try {
        output = JSON.parse(stringfyData);
        
    } catch(err)  {
        output = {}
    }

    return output;
}

utilities.hash = (str)=>{
    if(typeof(str)=== 'string' && str.length> 0){

        let hash = crypto.createHash("sha256", environments.secret)
        .update("Man oh man do I love node!")
        .digest("hex");

        return hash;

    }else{

        return false;
    }
}

module.exports = utilities;