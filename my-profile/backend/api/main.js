const { NestFactory } = require('@nestjs/core');

let app;

module.exports = async (req, res) => {
  if (!app) {
    const { AppModule } = require('./dist/app.module');
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