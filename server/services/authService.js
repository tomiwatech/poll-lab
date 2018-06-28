import randomstring from 'randomstring';
import sgMail from '@sendgrid/mail';
import bcrypt from 'bcrypt';
import db from '../connection/connect';
import config from '../config/index';

const saltRounds = 10;
const obj = {};
const err = {};
/**
 * @exports
 * @class authService
 */
class authService {
  /**
   * Find user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT username, password, email, fullname FROM users WHERE email = '${email}'`;
      db.query(query).then((result) => {
        if (result.rowCount === 0) {
          err.rowCount = 0;
          err.rows = [];
          resolve(err);
        } else if (result.rowCount >= 1) {
          obj.rowCount = result.rowCount;
          obj.rows = result.rows;
          reject(obj);
        }
      }).catch((e) => {
        err.rowCount = 0;
        err.rows = [];
        reject(err);
      });
    });
  }
  /**
   * Find admin by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findAdminByEmail(email) {
    const promise = new Promise((resolve, reject) => {
      const query = `SELECT username, password, email, fullname FROM users WHERE email = '${email}'`;
      db.query(query).then((result) => {
        if (result.rowCount === 0) {
          err.rowCount = 0;
          err.rows = [];
          resolve(err);
        } else if (result.rowCount >= 1) {
          obj.rowCount = result.rowCount;
          obj.rows = result.rows;
          reject(obj);
        }
      }).catch((e) => {
        err.rowCount = 0;
        err.rows = [];
        reject(err);
      });
    });

    return promise;
  }
  /**
   * Find user by username
   * @staticmethod
   * @param  {string} username - Request object
  * @param  {string} role - Request object
   * @return {string} res
   */
  static findUserByUsername(username, role) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, username, password, email, fullname, active FROM users WHERE username = '${username}' AND role = '${role}'`;
      db.query(query).then((result) => {
        if (result.rowCount === 0) {
          err.rowCount = 0;
          err.rows = [];
          reject(err);
        } else if (result.rowCount >= 1) {
          obj.data = result.rows;
          obj.rowCount = result.rowCount;
          resolve(obj);
        }
      }).catch((e) => {
        err.rowCount = 0;
        err.rows = [];
        reject(err);
      });
    });
  }
  /**
   * Find admin by username
   * @staticmethod
   * @param  {string} username - Request object
   * @param  {string} role - Request object
   * @return {string} res
   */
  static findAdminByUsername(username, role) {
    const promise = new Promise((resolve, reject) => {
      const query = `SELECT username, password, email, fullname FROM users WHERE username = '${username}' AND role = '${role}'`;
      db.query(query).then((result) => {
        if (result.rowCount === 0) {
          err.rowCount = 0;
          err.rows = [];
          reject(err);
        } else if (result.rowCount === 1) {
          obj.data = result.rows;
          obj.rowCount = result.rowCount;
          obj.password = result.rows[0].password;
          resolve(obj);
        }
      }).catch((e) => {
        err.rowCount = 0;
        err.rows = [];
        reject(err);
      });
    });

    return promise;
  }
  /**
   * save new user
   * @staticmethod
   * @param  {string} body - Request object
   * @return {string} res
   */
  static saveUser(body) {
    const {
      username, password, email, fullname, role, now, host
    } = body;


    // SEND MAIL USING SENDGRID
    const secretToken = randomstring.generate();

    console.log('secretToken', secretToken);

    const link = "https://" + host + "/api/v2/auth/verify/" + secretToken;

    console.log(link);

    sgMail.setApiKey(config.sendGridKey);

    const msg = {
      to: email,
      from: 'OnePercentLab 👻 <onepercentlab@gmail.com>',
      subject: 'EMAIL VERIFICATION',
      html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    };

    sgMail.send(msg);

    // END OF SENDGRID
    const active = "false";
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds).then((hash) => {
        const queryBody = `INSERT INTO users (username,password,email,fullname,created_on,role, secretToken, active) VALUES ('${username}', '${hash}', '${email}', '${fullname}','${now}','${role}','${secretToken}','${active}')`;
        db.query(queryBody).then((result) => {
          if (result.rowCount >= 1) {
            resolve('Data Saved');
          } else if (result.rowCount === 0) {
            reject(new Error('Not Saved'));
          }
        }).catch((e) => {
          console.log(e);
          reject(new Error('Could not save User'));
        });
      });
    });
  }
  /**
 * verify if user have activated acct
 * @staticmethod
 * @param  {string} body - Request object
 * @return {string} res
 */
  static verifyUserAccount(token) {
    return new Promise((resolve, reject) => {
      const queryTwo = `UPDATE users
                        SET 
                            active = true
                        WHERE
                            secrettoken = '${token}'`;
      db.query(queryTwo).then((resulty) => {
        if (resulty.rowCount >= 1) {
          resolve('Data Saved');
        } else if (resulty.rowCount === 0) {
          reject(new Error('Not Saved'));
        }
      }).catch((e) => {
        console.log(e);
        reject(new Error('Could not save User'));
      });
    });
  }


}

export default authService;


// CREATE TABLE users(
//   id bigserial PRIMARY KEY,
//   username VARCHAR (255) NOT NULL,
//   password VARCHAR (255) NOT NULL,
//   email VARCHAR (255) UNIQUE NOT NULL,
//   created_on TIMESTAMP NOT NULL,
//   fullname VARCHAR (255) NOT NULL,
//   role VARCHAR (255) NOT NULL,
//   secretToken VARCHAR (255) NOT NULL,
//   active BOOLEAN NOT NULL
//  );