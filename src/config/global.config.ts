import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
