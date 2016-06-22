// Generated by psc version 0.9.1
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Apply = require("../Control.Apply");
var Control_Monad_Cont_Trans = require("../Control.Monad.Cont.Trans");
var Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans");
var Control_Monad_Reader_Trans = require("../Control.Monad.Reader.Trans");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Ref = require("../Control.Monad.Eff.Ref");
var Control_Monad_Eff_Unsafe = require("../Control.Monad.Eff.Unsafe");
var Control_Plus = require("../Control.Plus");
var Data_Maybe = require("../Data.Maybe");
var Data_Foldable = require("../Data.Foldable");
var Data_Traversable = require("../Data.Traversable");
var Control_Bind = require("../Control.Bind");
var Control_Applicative = require("../Control.Applicative");
var Data_Unit = require("../Data.Unit");
var Data_Functor = require("../Data.Functor");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var Data_Either = require("../Data.Either");
var Parallel = function (x) {
    return x;
};
var MonadPar = function (__superclass_Control$dotMonad$dotMonad_0, par) {
    this["__superclass_Control.Monad.Monad_0"] = __superclass_Control$dotMonad$dotMonad_0;
    this.par = par;
};
var MonadRace = function (__superclass_Control$dotParallel$dotClass$dotMonadPar_0, race, stall) {
    this["__superclass_Control.Parallel.Class.MonadPar_0"] = __superclass_Control$dotParallel$dotClass$dotMonadPar_0;
    this.race = race;
    this.stall = stall;
};
var unsafeWithRef = Control_Monad_Eff_Unsafe.unsafeInterleaveEff;
var stall = function (dict) {
    return dict.stall;
};
var runParallel = function (v) {
    return v;
};
var race = function (dict) {
    return dict.race;
};
var parallel = Parallel;
var par = function (dict) {
    return dict.par;
};
var monadParReaderT = function (dictMonadPar) {
    return new MonadPar(function () {
        return Control_Monad_Reader_Trans.monadReaderT(dictMonadPar["__superclass_Control.Monad.Monad_0"]());
    }, function (f) {
        return function (v) {
            return function (v1) {
                return function (r) {
                    return par(dictMonadPar)(f)(v(r))(v1(r));
                };
            };
        };
    });
};
var monadRaceReaderT = function (dictMonadRace) {
    return new MonadRace(function () {
        return monadParReaderT(dictMonadRace["__superclass_Control.Parallel.Class.MonadPar_0"]());
    }, function (v) {
        return function (v1) {
            return function (r) {
                return race(dictMonadRace)(v(r))(v1(r));
            };
        };
    }, function (v) {
        return stall(dictMonadRace);
    });
};
var monadParExceptT = function (dictMonadPar) {
    return new MonadPar(function () {
        return Control_Monad_Except_Trans.monadExceptT(dictMonadPar["__superclass_Control.Monad.Monad_0"]());
    }, function (f) {
        return function (v) {
            return function (v1) {
                return par(dictMonadPar)(Control_Apply.lift2(Data_Either.applyEither)(f))(v)(v1);
            };
        };
    });
};
var monadRaceExceptT = function (dictMonadRace) {
    return new MonadRace(function () {
        return monadParExceptT(dictMonadRace["__superclass_Control.Parallel.Class.MonadPar_0"]());
    }, function (v) {
        return function (v1) {
            return race(dictMonadRace)(v)(v1);
        };
    }, stall(dictMonadRace));
};
var monadParContT = new MonadPar(function () {
    return Control_Monad_Cont_Trans.monadContT(Control_Monad_Eff.monadEff);
}, function (f) {
    return function (ca) {
        return function (cb) {
            return function (k) {
                return function __do() {
                    var v = unsafeWithRef(Control_Monad_Eff_Ref.newRef(Data_Maybe.Nothing.value))();
                    var v1 = unsafeWithRef(Control_Monad_Eff_Ref.newRef(Data_Maybe.Nothing.value))();
                    Control_Monad_Cont_Trans.runContT(ca)(function (a) {
                        return function __do() {
                            var v2 = unsafeWithRef(Control_Monad_Eff_Ref.readRef(v1))();
                            if (v2 instanceof Data_Maybe.Nothing) {
                                return unsafeWithRef(Control_Monad_Eff_Ref.writeRef(v)(new Data_Maybe.Just(a)))();
                            };
                            if (v2 instanceof Data_Maybe.Just) {
                                return k(f(a)(v2.value0))();
                            };
                            throw new Error("Failed pattern match at Control.Parallel.Class line 75, column 7 - line 77, column 28: " + [ v2.constructor.name ]);
                        };
                    })();
                    return Control_Monad_Cont_Trans.runContT(cb)(function (b) {
                        return function __do() {
                            var v2 = unsafeWithRef(Control_Monad_Eff_Ref.readRef(v))();
                            if (v2 instanceof Data_Maybe.Nothing) {
                                return unsafeWithRef(Control_Monad_Eff_Ref.writeRef(v1)(new Data_Maybe.Just(b)))();
                            };
                            if (v2 instanceof Data_Maybe.Just) {
                                return k(f(v2.value0)(b))();
                            };
                            throw new Error("Failed pattern match at Control.Parallel.Class line 81, column 7 - line 83, column 28: " + [ v2.constructor.name ]);
                        };
                    })();
                };
            };
        };
    };
});
var monadRaceContT = new MonadRace(function () {
    return monadParContT;
}, function (c1) {
    return function (c2) {
        return function (k) {
            return function __do() {
                var v = unsafeWithRef(Control_Monad_Eff_Ref.newRef(false))();
                Control_Monad_Cont_Trans.runContT(c1)(function (a) {
                    return function __do() {
                        var v1 = unsafeWithRef(Control_Monad_Eff_Ref.readRef(v))();
                        if (v1) {
                            return Data_Unit.unit;
                        };
                        if (!v1) {
                            unsafeWithRef(Control_Monad_Eff_Ref.writeRef(v)(true))();
                            return k(a)();
                        };
                        throw new Error("Failed pattern match at Control.Parallel.Class line 98, column 7 - line 102, column 14: " + [ v1.constructor.name ]);
                    };
                })();
                return Control_Monad_Cont_Trans.runContT(c2)(function (a) {
                    return function __do() {
                        var v1 = unsafeWithRef(Control_Monad_Eff_Ref.readRef(v))();
                        if (v1) {
                            return Data_Unit.unit;
                        };
                        if (!v1) {
                            unsafeWithRef(Control_Monad_Eff_Ref.writeRef(v)(true))();
                            return k(a)();
                        };
                        throw new Error("Failed pattern match at Control.Parallel.Class line 106, column 7 - line 110, column 14: " + [ v1.constructor.name ]);
                    };
                })();
            };
        };
    };
}, function (v) {
    return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(Data_Unit.unit);
});
var functorParallel = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return function ($58) {
            return parallel(Data_Functor.map(dictFunctor)(f)(runParallel($58)));
        };
    });
};
var applyParallel = function (dictMonadPar) {
    return new Control_Apply.Apply(function () {
        return functorParallel((((dictMonadPar["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]());
    }, function (f) {
        return function (a) {
            return parallel(par(dictMonadPar)(Data_Function.apply)(runParallel(f))(runParallel(a)));
        };
    });
};
var applicativeParallel = function (dictMonadPar) {
    return new Control_Applicative.Applicative(function () {
        return applyParallel(dictMonadPar);
    }, function ($59) {
        return parallel(Control_Applicative.pure((dictMonadPar["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())($59));
    });
};
var parTraverse = function (dictMonadPar) {
    return function (dictTraversable) {
        return function (f) {
            return function ($60) {
                return runParallel(Data_Traversable.traverse(dictTraversable)(applicativeParallel(dictMonadPar))(function ($61) {
                    return Parallel(f($61));
                })($60));
            };
        };
    };
};
var parTraverse_ = function (dictMonadPar) {
    return function (dictFoldable) {
        return function (f) {
            return function ($62) {
                return runParallel(Data_Foldable.traverse_(applicativeParallel(dictMonadPar))(dictFoldable)(function ($63) {
                    return Parallel(f($63));
                })($62));
            };
        };
    };
};
var altParallel = function (dictMonadRace) {
    return new Control_Alt.Alt(function () {
        return functorParallel(((((dictMonadRace["__superclass_Control.Parallel.Class.MonadPar_0"]())["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]());
    }, function (a) {
        return function (b) {
            return parallel(race(dictMonadRace)(runParallel(a))(runParallel(b)));
        };
    });
};
var plusParallel = function (dictMonadRace) {
    return new Control_Plus.Plus(function () {
        return altParallel(dictMonadRace);
    }, parallel(stall(dictMonadRace)));
};
var alternativeParallel = function (dictMonadRace) {
    return new Control_Alternative.Alternative(function () {
        return applicativeParallel(dictMonadRace["__superclass_Control.Parallel.Class.MonadPar_0"]());
    }, function () {
        return plusParallel(dictMonadRace);
    });
};
module.exports = {
    MonadPar: MonadPar, 
    MonadRace: MonadRace, 
    par: par, 
    parTraverse: parTraverse, 
    parTraverse_: parTraverse_, 
    parallel: parallel, 
    race: race, 
    runParallel: runParallel, 
    stall: stall, 
    monadParContT: monadParContT, 
    monadParExceptT: monadParExceptT, 
    monadParReaderT: monadParReaderT, 
    monadRaceContT: monadRaceContT, 
    monadRaceExceptT: monadRaceExceptT, 
    monadRaceReaderT: monadRaceReaderT, 
    functorParallel: functorParallel, 
    applyParallel: applyParallel, 
    applicativeParallel: applicativeParallel, 
    altParallel: altParallel, 
    plusParallel: plusParallel, 
    alternativeParallel: alternativeParallel
};
