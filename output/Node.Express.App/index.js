// Generated by psc version 0.9.1
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Data_Foreign_Class = require("../Data.Foreign.Class");
var Data_Function_Uncurried = require("../Data.Function.Uncurried");
var Data_Maybe = require("../Data.Maybe");
var Data_Foreign = require("../Data.Foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Class = require("../Control.Monad.Eff.Class");
var Control_Monad_Eff_Exception = require("../Control.Monad.Eff.Exception");
var Node_HTTP = require("../Node.HTTP");
var Node_Express_Types = require("../Node.Express.Types");
var Node_Express_Internal_Utils = require("../Node.Express.Internal.Utils");
var Node_Express_Handler = require("../Node.Express.Handler");
var Data_Functor = require("../Data.Functor");
var Data_Function = require("../Data.Function");
var Control_Monad = require("../Control.Monad");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Applicative = require("../Control.Applicative");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Show = require("../Data.Show");
var AppM = (function () {
    function AppM(value0) {
        this.value0 = value0;
    };
    AppM.create = function (value0) {
        return new AppM(value0);
    };
    return AppM;
})();
var useOnParam = function (param) {
    return function (handler) {
        return new AppM(function (app) {
            return Data_Function_Uncurried.runFn3($foreign._useOnParam)(app)(param)(function ($53) {
                return Node_Express_Handler.runHandlerM(handler($53));
            });
        });
    };
};
var useOnError = function (handler) {
    return new AppM(function (app) {
        return Data_Function_Uncurried.runFn2($foreign._useOnError)(app)(function ($54) {
            return Node_Express_Handler.runHandlerM(handler($54));
        });
    });
};
var useExternal = function (fn) {
    return new AppM(function (app) {
        return Data_Function_Uncurried.runFn2($foreign._useExternal)(app)(fn);
    });
};
var useAt = function (route) {
    return function (middleware) {
        return new AppM(function (app) {
            return Data_Function.apply(Data_Function_Uncurried.runFn3($foreign._useAt)(app)(route))(Node_Express_Handler.runHandlerM(middleware));
        });
    };
};
var use = function (middleware) {
    return new AppM(function (app) {
        return Data_Function.apply(Data_Function_Uncurried.runFn2($foreign._use)(app))(Node_Express_Handler.runHandlerM(middleware));
    });
};
var setProp = function (dictIsForeign) {
    return function (name) {
        return function (val) {
            return new AppM(function (app) {
                return Data_Function_Uncurried.runFn3($foreign._setProp)(app)(name)(val);
            });
        };
    };
};
var listenHttps = function (v) {
    return function (port) {
        return function (opts) {
            return function (cb) {
                return function __do() {
                    var v1 = $foreign.mkApplication();
                    v.value0(v1)();
                    return $foreign._listenHttps(v1)(port)(opts)(cb)();
                };
            };
        };
    };
};
var listenHttp = function (v) {
    return function (port) {
        return function (cb) {
            return function __do() {
                var v1 = $foreign.mkApplication();
                v.value0(v1)();
                return $foreign._listenHttp(v1)(port)(cb)();
            };
        };
    };
};
var http = function (dictRoutePattern) {
    return function (method) {
        return function (route) {
            return function (handler) {
                return new AppM(function (app) {
                    return Data_Function.apply(Data_Function_Uncurried.runFn4($foreign._http)(app)(Data_Show.show(Node_Express_Types.showMethod)(method))(Data_Foreign.toForeign(route)))(Node_Express_Handler.runHandlerM(handler));
                });
            };
        };
    };
};
var post = function (dictRoutePattern) {
    return http(dictRoutePattern)(Node_Express_Types.POST.value);
};
var put = function (dictRoutePattern) {
    return http(dictRoutePattern)(Node_Express_Types.PUT.value);
};
var getProp = function (dictIsForeign) {
    return function (name) {
        return new AppM(function (app) {
            return Data_Function.apply(Control_Monad_Eff_Class.liftEff(Control_Monad_Eff_Class.monadEffEff))(Control_Monad.liftM1(Control_Monad_Eff.monadEff)(function ($55) {
                return Node_Express_Internal_Utils.eitherToMaybe(Data_Foreign_Class.read(dictIsForeign)($55));
            })(Data_Function_Uncurried.runFn2($foreign._getProp)(app)(name)));
        });
    };
};
var get = function (dictRoutePattern) {
    return http(dictRoutePattern)(Node_Express_Types.GET.value);
};
var functorAppM = new Data_Functor.Functor(function (f) {
    return function (v) {
        return new AppM(function (app) {
            return Data_Function.apply(Control_Monad.liftM1(Control_Monad_Eff.monadEff)(f))(v.value0(app));
        });
    };
});
var $$delete = function (dictRoutePattern) {
    return http(dictRoutePattern)(Node_Express_Types.DELETE.value);
};
var applyAppM = new Control_Apply.Apply(function () {
    return functorAppM;
}, function (v) {
    return function (v1) {
        return new AppM(function (app) {
            return function __do() {
                var v2 = v1.value0(app)();
                var v3 = v.value0(app)();
                return Data_Function.apply(Control_Applicative.pure(Control_Monad_Eff.applicativeEff))(v3(v2))();
            };
        });
    };
});
var bindAppM = new Control_Bind.Bind(function () {
    return applyAppM;
}, function (v) {
    return function (f) {
        return new AppM(function (app) {
            return function __do() {
                var v1 = v.value0(app)();
                var $45 = f(v1);
                return $45.value0(app)();
            };
        });
    };
});
var apply = function (v) {
    return function (app) {
        return v.value0(app);
    };
};
var applicativeAppM = new Control_Applicative.Applicative(function () {
    return applyAppM;
}, function (x) {
    return new AppM(function (v) {
        return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(x);
    });
});
var monadAppM = new Control_Monad.Monad(function () {
    return applicativeAppM;
}, function () {
    return bindAppM;
});
var monadEffAppM = new Control_Monad_Eff_Class.MonadEff(function () {
    return monadAppM;
}, function (act) {
    return new AppM(function (v) {
        return act;
    });
});
var all = function (dictRoutePattern) {
    return http(dictRoutePattern)(Node_Express_Types.ALL.value);
};
module.exports = {
    all: all, 
    apply: apply, 
    "delete": $$delete, 
    get: get, 
    getProp: getProp, 
    http: http, 
    listenHttp: listenHttp, 
    listenHttps: listenHttps, 
    post: post, 
    put: put, 
    setProp: setProp, 
    use: use, 
    useAt: useAt, 
    useExternal: useExternal, 
    useOnError: useOnError, 
    useOnParam: useOnParam, 
    functorAppM: functorAppM, 
    applyAppM: applyAppM, 
    applicativeAppM: applicativeAppM, 
    bindAppM: bindAppM, 
    monadAppM: monadAppM, 
    monadEffAppM: monadEffAppM
};
