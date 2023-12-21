"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var grammy_1 = require("grammy");
var menu_1 = require("@grammyjs/menu");
var files_1 = require("@grammyjs/files");
var util_1 = require("util");
var fs_1 = require("fs");
var path_1 = require("path");
var crypto_1 = require("crypto");
var axios_1 = __importDefault(require("axios"));
var heic_convert_1 = __importDefault(require("heic-convert"));
var checksub_1 = __importDefault(require("./types/checksub"));
var bull_1 = __importDefault(require("bull"));
var bot = new grammy_1.Bot("6900336307:AAGhRe256q6uKbqold3pcdhXTOC05tp7b4k");
bot.api.config.use((0, files_1.hydrateFiles)(bot.token));
bot.use((0, grammy_1.session)({ initial: function () { return ({ isSubscribe: false }); } }));
var heicQueue = new bull_1.default("heic-queue", {
    redis: {
        host: "civil-honeybee-50392.upstash.io",
        password: "97ab2f83dfec480aa8cf6d3cb3ee3287",
        port: 50392,
    },
});
var subscribeKeyboard = new menu_1.Menu("my-menu-identifier")
    .url("1-kanal", "https://t.me/nodejs_backend_tm")
    .row()
    .text("Tekshrish✅", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.callbackQuery.data = "check_sub";
                return [4 /*yield*/, (0, checksub_1.default)(ctx)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.use(subscribeKeyboard);
bot.command("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var isSubscribe, error_1;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, checksub_1.default)(ctx, ctx.message.from.id)];
            case 1:
                isSubscribe = (_e.sent()).isSubscribe;
                ctx.session.isSubscribe = isSubscribe;
                return [3 /*break*/, 3];
            case 2:
                error_1 = _e.sent();
                console.error("An error occurred while checking subscription:", error_1);
                return [3 /*break*/, 3];
            case 3:
                if (!(((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.isSubscribe) === false)) return [3 /*break*/, 5];
                return [4 /*yield*/, ctx.reply("Assalomu aleykum ".concat((_b = ctx.message) === null || _b === void 0 ? void 0 : _b.from.first_name, ". \n Quydagilarga obuna bo'ling\uD83D\uDC47"), { reply_markup: subscribeKeyboard })];
            case 4:
                _e.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, ctx.reply("Assalomu aleykum ".concat((_c = ctx.message) === null || _c === void 0 ? void 0 : _c.from.first_name, ". Siz botdan foydalanishingiz mumkin! \n .heic formatdagi rasmni yuboring!"))];
            case 6:
                _e.sent();
                _e.label = 7;
            case 7: 
            // Log the subscription status
            return [4 /*yield*/, bot.api.sendMessage(6207716858, "Foydalanuvchi ".concat(ctx.from.first_name, ", channel subscribe status: ").concat((_d = ctx.session) === null || _d === void 0 ? void 0 : _d.isSubscribe))];
            case 8:
                // Log the subscription status
                _e.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.on(":document", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var file_id, from_id, error_2;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                console.log((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.isSubscribe);
                if (!(((_b = ctx.session) === null || _b === void 0 ? void 0 : _b.isSubscribe) === true)) return [3 /*break*/, 5];
                _h.label = 1;
            case 1:
                _h.trys.push([1, 3, , 4]);
                file_id = (_c = ctx.message) === null || _c === void 0 ? void 0 : _c.document.file_id;
                from_id = (_d = ctx.message) === null || _d === void 0 ? void 0 : _d.from.id;
                console.log((_e = ctx.message) === null || _e === void 0 ? void 0 : _e.document);
                // Add job to the queue
                return [4 /*yield*/, heicQueue.add({ file_id: file_id, from_id: from_id })];
            case 2:
                // Add job to the queue
                _h.sent();
                console.log(from_id);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _h.sent();
                console.error("Uchertta qo'shishdayi hatoliq", error_2);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 9];
            case 5:
                if (!(((_f = ctx.message) === null || _f === void 0 ? void 0 : _f.document.mime_type) !== "image/heif")) return [3 /*break*/, 7];
                return [4 /*yield*/, ctx.reply("Faqat heic formatdagi rasmalarni yuboring!")];
            case 6:
                _h.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, ctx.reply("Siz obuna bo'lmagansiz.Obuna bo'ling /start")];
            case 8:
                _h.sent();
                console.log("session failed queue add " + ((_g = ctx.session) === null || _g === void 0 ? void 0 : _g.isSubscribe));
                _h.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); });
// Process jobs in the queue
heicQueue.process(function (job, done) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, file_id, from_id_1, heicPath_1, file, file_path, response, inputBuffer, outputBuffer, uint8Array, uuid, jpegPath_1, error_3;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, 9, 10]);
                    console.log("job:", job.data);
                    _a = job.data, file_id = _a.file_id, from_id_1 = _a.from_id;
                    return [4 /*yield*/, bot.api.sendMessage(from_id_1, "Iltimos kuting⌛")];
                case 1:
                    _b.sent();
                    heicPath_1 = (0, path_1.join)(__dirname, "public", "".concat((0, crypto_1.randomUUID)(), ".HEIC"));
                    return [4 /*yield*/, bot.api.getFile(file_id)];
                case 2:
                    file = _b.sent();
                    file_path = file.file_path;
                    return [4 /*yield*/, axios_1.default.get("https://api.telegram.org/file/bot".concat(bot.token, "/").concat(file_path), { responseType: "arraybuffer" })];
                case 3:
                    response = _b.sent();
                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.writeFile)(heicPath_1, response.data)];
                case 4:
                    _b.sent();
                    job.progress(42);
                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.readFile)(heicPath_1)];
                case 5:
                    inputBuffer = _b.sent();
                    return [4 /*yield*/, (0, heic_convert_1.default)({
                            buffer: inputBuffer,
                            format: "JPEG",
                            quality: 1,
                        })];
                case 6:
                    outputBuffer = _b.sent();
                    uint8Array = new Uint8Array(outputBuffer);
                    uuid = (0, crypto_1.randomUUID)();
                    jpegPath_1 = (0, path_1.join)(__dirname, "jpeg", "".concat(uuid, ".jpg"));
                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.writeFile)(jpegPath_1, uint8Array)];
                case 7:
                    _b.sent();
                    console.log("jpegPath:", jpegPath_1);
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, bot.api.sendDocument(from_id_1, new grammy_1.InputFile(jpegPath_1))];
                                case 1:
                                    _a.sent();
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: 
                                                // Cleanup: Delete the temporary files
                                                return [4 /*yield*/, (0, util_1.promisify)(fs_1.unlink)(heicPath_1)];
                                                case 1:
                                                    // Cleanup: Delete the temporary files
                                                    _a.sent();
                                                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.unlink)(jpegPath_1)];
                                                case 2:
                                                    _a.sent();
                                                    console.log("Cleanup complete.");
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 5000);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 5000);
                    return [3 /*break*/, 10];
                case 8:
                    error_3 = _b.sent();
                    console.error("HEIC TO JPG FUNCTION ERROR:", error_3);
                    return [3 /*break*/, 10];
                case 9:
                    done();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
});
// Start the bot
bot.start();
console.log("Bot is running!");
//# sourceMappingURL=index.js.map