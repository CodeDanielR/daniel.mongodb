"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var events_1 = __importDefault(require("events"));
var DanielMongoDB = /** @class */ (function (_super) {
    __extends(DanielMongoDB, _super);
    function DanielMongoDB(options) {
        var _this = _super.call(this) || this;
        _this.connected = false;
        _this.firstConnect = true;
        _this.name = options.name;
        _this.url = options.url;
        return _this;
    }
    DanielMongoDB.prototype.connect = function () {
        if (!this.connected)
            throw new Error("Daniel.MongoDB => You're already connected to " + this.name);
        mongoose_1.default.connect(this.url, this.mongoConfig);
        this.db = mongoose_1.default.connection;
        if (this.firstConnect)
            this._eventHandling();
        this.firstConnect = false;
        this.schema = new mongoose_1.default.Schema({
            ID: {},
            data: {}
        });
        this.connected = true;
        this.model = mongoose_1.default.model(this.name, this.schema);
        return this.db;
    };
    DanielMongoDB.prototype.disconnect = function () {
        if (!this.connected)
            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
        this.connected = false;
        return mongoose_1.default.disconnect();
    };
    Object.defineProperty(DanielMongoDB.prototype, "connection", {
        get: function () {
            if (!this.connected)
                throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
            return mongoose_1.default.connection;
        },
        enumerable: false,
        configurable: true
    });
    DanielMongoDB.prototype.set = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, newObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        if (obj) {
                            obj.data = data;
                            return [2 /*return*/, obj.save()];
                        }
                        else {
                            newObj = new this.model({ ID: key, data: data });
                            return [2 /*return*/, newObj.save()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DanielMongoDB.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        return [2 /*return*/, obj ? obj.data : undefined];
                }
            });
        });
    };
    DanielMongoDB.prototype.remove = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        return [2 /*return*/, obj ? obj.remove() : null];
                }
            });
        });
    };
    DanielMongoDB.prototype.delete = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        return [2 /*return*/, obj ? obj.remove() : null];
                }
            });
        });
    };
    DanielMongoDB.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.find({}).exec()];
                    case 1:
                        obj = _a.sent();
                        return [2 /*return*/, obj ? obj : []];
                }
            });
        });
    };
    DanielMongoDB.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.find({}).exec()];
                    case 1:
                        obj = _a.sent();
                        return [2 /*return*/, obj ? obj.map(function (o) { return o.remove(); }) : []];
                }
            });
        });
    };
    DanielMongoDB.prototype.has = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        return [2 /*return*/, obj ? true : false];
                }
            });
        });
    };
    DanielMongoDB.prototype.add = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, newObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        if (obj) {
                            obj.data = obj.data + data;
                            return [2 /*return*/, obj.save()];
                        }
                        else {
                            newObj = new this.model({ ID: key, data: data });
                            return [2 /*return*/, newObj.save()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DanielMongoDB.prototype.subtract = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, newObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        if (obj) {
                            obj.data = obj.data - data;
                            return [2 /*return*/, obj.save()];
                        }
                        else {
                            newObj = new this.model({ ID: key, data: data });
                            return [2 /*return*/, newObj.save()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DanielMongoDB.prototype.pull = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, newObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        if (obj) {
                            obj.data = obj.data.filter(function (v) { return v !== data; });
                            return [2 /*return*/, obj.save()];
                        }
                        else {
                            newObj = new this.model({ ID: key, data: data });
                            return [2 /*return*/, newObj.save()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DanielMongoDB.prototype.push = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, newObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        if (obj) {
                            obj.data.push(data);
                            return [2 /*return*/, obj.save()];
                        }
                        else {
                            newObj = new this.model({ ID: key, data: data });
                            return [2 /*return*/, newObj.save()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DanielMongoDB.prototype.includes = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected)
                            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
                        return [4 /*yield*/, this.model.findOne({ ID: key })];
                    case 1:
                        obj = _a.sent();
                        if (obj) {
                            return [2 /*return*/, obj.data.includes(data)];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(DanielMongoDB.prototype, "mongoModel", {
        get: function () {
            if (!this.connected)
                throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    DanielMongoDB.prototype._eventHandling = function () {
        var _this = this;
        if (!this.connected)
            throw new Error("Daniel.MongoDB => You're not connected to " + this.name);
        this.db.on('open', function () { return _this.emit('ready'); });
        this.db.on('error', function (e) { return _this.emit('error', e); });
        this.db.on('disconnect', function () {
            _this.emit('disconnect');
            if (!_this.connected)
                mongoose_1.default.connect(_this.url, _this.mongoConfig ? _this.mongoConfig : { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        });
    };
    return DanielMongoDB;
}(events_1.default));
exports.default = DanielMongoDB;
