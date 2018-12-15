'use strict';

//  node modules
const mongoose   = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    provider: String,
    providerID: String,
    displayName: String
})

mongoose.model('users', userSchema);