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
const TaskHelper_1 = require("../helpers/TaskHelper");
const mongoose = require("mongoose");
// env setup
require('dotenv').config();
describe('TaskHelper', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const databaseUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.jnmms.mongodb.net/${process.env.DATABASE_NAME_TEST}?retryWrites=true&w=majority`;
        yield mongoose.connect(databaseUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }), 120000); // The connection to external db can take long time
    it('should return a number', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield TaskHelper_1.default.getTotalTasks();
        expect(typeof (result)).toBe('number');
    }));
});
