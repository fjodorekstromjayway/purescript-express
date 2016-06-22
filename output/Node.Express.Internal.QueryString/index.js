// Generated by psc version 0.9.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Data_Array = require("../Data.Array");
var Data_List = require("../Data.List");
var Data_Either = require("../Data.Either");
var Data_Maybe = require("../Data.Maybe");
var Data_String = require("../Data.String");
var Text_Parsing_Parser = require("../Text.Parsing.Parser");
var Text_Parsing_Parser_Combinators = require("../Text.Parsing.Parser.Combinators");
var Text_Parsing_Parser_String = require("../Text.Parsing.Parser.String");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Control_Bind = require("../Control.Bind");
var Data_Identity = require("../Data.Identity");
var Data_Function = require("../Data.Function");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Applicative = require("../Control.Applicative");
var Data_Unfoldable = require("../Data.Unfoldable");
var Param = (function () {
    function Param(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Param.create = function (value0) {
        return function (value1) {
            return new Param(value0, value1);
        };
    };
    return Param;
})();
var showParam = new Data_Show.Show(function (v) {
    return "(" + (Data_Show.show(Data_Show.showString)(v.value0) + (" -> " + (Data_Show.show(Data_Show.showString)(v.value1) + ")")));
});
var param = Control_Bind.bind(Text_Parsing_Parser.bindParserT(Data_Identity.monadIdentity))(Data_Function.apply(Control_Monad.liftM1(Text_Parsing_Parser.monadParserT(Data_Identity.monadIdentity))(function ($25) {
    return $foreign.decode(Data_String.fromCharArray($25));
}))(Data_Function.apply(Data_Array.some(Text_Parsing_Parser.alternativeParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser.lazyParserT))(Text_Parsing_Parser_String.satisfy(Data_Identity.monadIdentity)(function (s) {
    return s !== "=";
}))))(function (v) {
    return Control_Bind.bind(Text_Parsing_Parser.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_String.string(Data_Identity.monadIdentity)("="))(function () {
        return Control_Bind.bind(Text_Parsing_Parser.bindParserT(Data_Identity.monadIdentity))(Data_Function.apply(Control_Monad.liftM1(Text_Parsing_Parser.monadParserT(Data_Identity.monadIdentity))(function ($26) {
            return $foreign.decode(Data_String.fromCharArray($26));
        }))(Data_Function.apply(Data_Array.many(Text_Parsing_Parser.alternativeParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser.lazyParserT))(Text_Parsing_Parser_String.satisfy(Data_Identity.monadIdentity)(function (s) {
            return s !== "&";
        }))))(function (v1) {
            return Data_Function.apply(Control_Applicative.pure(Text_Parsing_Parser.applicativeParserT(Data_Identity.monadIdentity)))(new Param(v, v1));
        });
    });
});
var queryString = Text_Parsing_Parser_Combinators.sepBy(Data_Identity.monadIdentity)(param)(Text_Parsing_Parser_String.string(Data_Identity.monadIdentity)("&"));
var parse = function (str) {
    var $11 = Text_Parsing_Parser.runParser(str)(queryString);
    if ($11 instanceof Data_Either.Left) {
        return new Data_Either.Left($11.value0.value0.message);
    };
    if ($11 instanceof Data_Either.Right) {
        return Data_Function.apply(Data_Either.Right.create)(Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray)($11.value0));
    };
    throw new Error("Failed pattern match at Node.Express.Internal.QueryString line 35, column 13 - line 37, column 48: " + [ $11.constructor.name ]);
};
var getAll = function (params) {
    return function (key) {
        return Data_Array.mapMaybe(function (v) {
            var $16 = v.value0 === key;
            if ($16) {
                return new Data_Maybe.Just(v.value1);
            };
            if (!$16) {
                return Data_Maybe.Nothing.value;
            };
            throw new Error("Failed pattern match at Node.Express.Internal.QueryString line 32, column 36 - line 32, column 77: " + [ $16.constructor.name ]);
        })(params);
    };
};
var getOne = function (params) {
    return function (key) {
        return Data_Function.apply(Data_Array.head)(getAll(params)(key));
    };
};
var eqParam = new Data_Eq.Eq(function (v) {
    return function (v1) {
        return v.value0 === v1.value0 && v.value1 === v1.value1;
    };
});
module.exports = {
    Param: Param, 
    getAll: getAll, 
    getOne: getOne, 
    parse: parse, 
    showParam: showParam, 
    eqParam: eqParam
};
