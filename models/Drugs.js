const mongoose = require ("mongoose");
const drugSchema = new mongoose.Schema({
    
    code :{
        type: String,
        unique :true,
        require :true
    },
    designation :{
        type : String

    },
    
    category :{
         type :String,
    enum : ['antiemetique', 'antispasmodique','antiinflammatoire'],
    default: 'antiinflammatoire'},
    form  :{
        type : String,
        enum : ['comprimé', 'sachet'],
    default: 'comprimé'
}, 
    
    dosage :{
        type : String
    },
    usualDosage :{
       type: String
    },
    observations :{
        type: String
     }

});
module.exports = mongoose.model("Drugs", drugSchema);