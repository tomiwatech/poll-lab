import dotenv from 'dotenv';

dotenv.config();

const config = {
  userSecret: process.env.JWT_USER_KEY,
  adminSecret: process.env.JWT_ADMIN_KEY,
  testDB: process.env.TEST_DB,
  sendGridKey: process.env.EMAIL_API_KEY
};

export default config;
