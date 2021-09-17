"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.set('view engine', 'ejs');
    app.use(express.static('publico'));
    app.use(cookieParser("Me agradan los poliperros"));
    app.use(session({
        name: 'server.session.in',
        secret: 'Mo sera de tomar un traguito',
        resave: true,
        saveUnitialized: true,
        cookie: { secure: false },
        store: new fileStore(),
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map