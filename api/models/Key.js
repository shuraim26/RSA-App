const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const KeySchema = new Schema({
    merchantId : {
        type: String,
        required: true
    },
    key : {
        type: String,
        required: true
    }
});

mongoose.model("keys", KeySchema, "keys");