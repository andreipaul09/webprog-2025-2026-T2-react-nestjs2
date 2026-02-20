const { NestFactory } = require('@nestjs/core');
const path = require('path');

let app;

module.exports = async (req, res) => {
  if (!app) {
    const { AppModule } = require(path.join(__dirname, '..', 'dist', 'app.module'));
    app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    });
    await app.init();
  }
  const instance = app.getHttpAdapter().getInstance();
  instance(req, res);
};