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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cloudinary_1 = require("cloudinary");
const MainConnection_1 = __importDefault(require("./connections/MainConnection"));
const UserConnection_1 = __importDefault(require("./connections/UserConnection"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const organization_1 = __importDefault(require("./routes/organization"));
const invitation_1 = __importDefault(require("./routes/invitation"));
const event_1 = __importDefault(require("./routes/event"));
const organizationPage_1 = __importDefault(require("./routes/organizationPage"));
// CONFIGURATIONS
dotenv_1.default.config();
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const corsOptions = {
    origin: process.env.PRODUCTION ? 'https://seuraava-askel-frontend.vercel.app' : '*'
};
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
// ROUTES 
app.use("/", express_1.default.static('public'));
app.use("/api/auth", auth_1.default);
app.use("/api/users", user_1.default);
app.use("/api/organizations", organization_1.default);
app.use("/api/invitations", invitation_1.default);
app.use("/api/events", event_1.default);
app.use("/api/organization-pages", organizationPage_1.default);
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield MainConnection_1.default.asPromise().then(result => {
        console.log('Connected to Main database at: ' + result.host + ":" + result.port);
    }).catch(error => {
        console.error('Error connecting to Main database: ', error);
    });
    yield UserConnection_1.default.asPromise().then(result => {
        console.log('Connected to User database at: ' + result.host + ":" + result.port);
    }).catch(error => {
        console.error('Error connecting to User database: ', error);
    });
    try {
        const PORT = process.env.PORT || 6001;
        app.listen(PORT, () => console.log(`Server running in Port: ${PORT}`));
    }
    catch (error) {
        console.error("Error when starting server: ", error);
    }
});
connect();
