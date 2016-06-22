// Generated by psc version 0.9.1
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Biapplicative = require("../Control.Biapplicative");
var Control_Biapply = require("../Control.Biapply");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Functor = require("../Data.Functor");
var Clown = function (x) {
    return x;
};
var runClown = function (v) {
    return v;
};
var functorClown = new Data_Functor.Functor(function (v) {
    return function ($12) {
        return Clown(runClown($12));
    };
});
var bifunctorClown = function (dictFunctor) {
    return new Data_Bifunctor.Bifunctor(function (f) {
        return function (v) {
            return function ($13) {
                return Clown(Data_Functor.map(dictFunctor)(f)(runClown($13)));
            };
        };
    });
};
var biapplyClown = function (dictApply) {
    return new Control_Biapply.Biapply(function () {
        return bifunctorClown(dictApply["__superclass_Data.Functor.Functor_0"]());
    }, function (v) {
        return function (v1) {
            return Control_Apply.apply(dictApply)(v)(v1);
        };
    });
};
var biapplicativeClown = function (dictApplicative) {
    return new Control_Biapplicative.Biapplicative(function () {
        return biapplyClown(dictApplicative["__superclass_Control.Apply.Apply_0"]());
    }, function (a) {
        return function (v) {
            return Control_Applicative.pure(dictApplicative)(a);
        };
    });
};
module.exports = {
    Clown: Clown, 
    runClown: runClown, 
    bifunctorClown: bifunctorClown, 
    functorClown: functorClown, 
    biapplyClown: biapplyClown, 
    biapplicativeClown: biapplicativeClown
};
