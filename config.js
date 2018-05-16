const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://admin:admin@ds121730.mlab.com:21730/api',
  port: process.env.PORT || 4000,
  SERVER_ADMIN_PASSWORD_SECRET: 'njfabskljfgajkbskjd'
};

export default config;
