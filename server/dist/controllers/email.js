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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = require("fs");
const UserConnection_1 = require("../connections/UserConnection");
const transporter = nodemailer_1.default.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
const sendVerificationEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create and save emailVerificationObject
        const emailVerification = new UserConnection_1.EmailVerification({ user_id: req.user._id });
        const { _id: emailVerification_id } = yield emailVerification.save();
        console.warn("Remember to change emailverification link");
        const href = `href="http://localhost:3001/api/email/verify/${emailVerification_id}"`;
        (0, fs_1.readFile)('email_templates\\verify_email.html', 'utf-8', (error, data) => {
            if (error) {
                console.error(error);
                return;
            }
            const mailOptions = {
                from: 'Seuraava Askel <no-reply@seuraava-askel.fi>',
                to: req.user.email,
                subject: 'Sähköpostin vahvistus',
                html: data.trim().replace('href="#verify-email-link"', href)
            };
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error:', error);
                }
                else {
                    console.log('Email sent:', info.response);
                }
            });
        });
        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).end();
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params._id;
        if (!_id)
            return res.status(400).end();
        // get verification object with id provided by url
        console.log(_id);
        const verfication = yield UserConnection_1.EmailVerification.findByIdAndDelete(_id);
        if (!verfication)
            return res.status(404).end(); // return not found
        // get user with id provided by verification object and update that user to be verified
        yield UserConnection_1.User.findByIdAndUpdate(verfication.user_id, { verified: true });
        return res.status(200).end();
    }
    catch (error) {
        console.log(error);
        return res.status(500).end();
    }
});
exports.verifyEmail = verifyEmail;
