module.exports = {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/condagua',
  FACEBOOK_APP_ACCESS_TOKEN: process.env.FACEBOOK_APP_ACCESS_TOKEN,
  JWT_SECRET: process.env.JWT_SECRET || 'cuidado com o cachorro invisivel',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '1d',
};
