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
Object.defineProperty(exports, "__esModule", { value: true });
const HipsumService_1 = require("../services/hipsum/HipsumService");
class HipsumHelper {
    static getSentences(sentences = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = null;
            try {
                result = yield HipsumService_1.default.getData(sentences);
                if (result) {
                    return result[0].split('.');
                }
                return result;
            }
            catch (e) {
                console.error("### ERROR HipsumHelper.getSentences: ", e);
                return result;
            }
        });
    }
}
exports.default = HipsumHelper;
