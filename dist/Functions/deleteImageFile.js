"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFile = void 0;
const fs_1 = require("fs");
const deleteImageFile = (imagePath) => {
    (0, fs_1.unlink)(imagePath, (error) => {
        if (error) {
            console.error('Error deleting file:', error);
            return;
        }
    });
};
exports.deleteImageFile = deleteImageFile;
