// Generated by psc version 0.9.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Data_Either = require("../Data.Either");
var Data_Function_Uncurried = require("../Data.Function.Uncurried");
var Data_Maybe = require("../Data.Maybe");
var Control_Monad_Eff_Exception = require("../Control.Monad.Eff.Exception");
var Node_Express_Types = require("../Node.Express.Types");
var eitherToMaybe = function (v) {
    if (v instanceof Data_Either.Left) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_Either.Right) {
        return new Data_Maybe.Just(v.value0);
    };
    throw new Error("Failed pattern match at Node.Express.Internal.Utils line 12, column 1 - line 12, column 34: " + [ v.constructor.name ]);
};
module.exports = {
    eitherToMaybe: eitherToMaybe, 
    nextWithError: $foreign.nextWithError
};
