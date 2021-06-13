"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(name, title) {
        this.isCompleted = false;
        this.name = name;
        this.title = title;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getIsCompleted() {
        return this.isCompleted;
    }
    setIsCompleted(isCompleted) {
        this.isCompleted = isCompleted;
    }
}
exports.default = Task;
