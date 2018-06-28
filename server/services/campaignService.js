import db from '../connection/connect';

const obj = {};
const err = {};
/**
 * @exports
 * @class campaignService
 */
class campaignService {
  /**
   * Find campaign by equipment
   * @staticmethod
   * @param  {string} serial_number - campaign object
   * @return {string} res
   */
  static findCampaignByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, campaign_id, firstname FROM aspirants WHERE email = '${email}'`;
      db.query(query).then((result) => {
        // console.log(result);
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
        // console.log(e);
        err.rowCount = 0;
        err.rows = [];
        reject(err);
      });
    });
  }
  /**
   * Find campaign by id
   * @staticmethod
   * @param  {string} id - campaign object
   * @return {string} res
   */
  static findCampaignById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT firstname, lastname, email, gender, fundgoal, party, position, vision FROM aspirants WHERE id = '${id}'`;
      db.query(query).then((result) => {
        if (result.rowCount === 0) {
          err.rowCount = 0;
          err.rows = [];
          reject(err);
        } else if (result.rowCount >= 1) {
          obj.rowCount = result.rowCount;
          obj.rows = result.rows;
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
   * delete campaign by id
   * @staticmethod
   * @param  {string} id - campaign object
   * @return {string} res
   */
  static deleteCampaignById(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM aspirants WHERE id = '${id}'`;
      db.query(query).then((result) => {
        if (result.rowCount === 0) {
          err.rowCount = 0;
          err.rows = [];
          reject(err);
        } else if (result.rowCount >= 1) {
          obj.rowCount = result.rowCount;
          obj.rows = result.rows;
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
 * update campaign by body
 * @staticmethod
 * @param  {string} body - campaign object
 * @return {string} res
 */
  static updateCampaignById(body) {
    const {
      id, campaigntype, equipment, model, description, now, approve, disapprove, resolvve,
    } = body;
    return new Promise((resolve, reject) => {
      const query = `UPDATE campaigns SET campaigntype = '${campaigntype}', equipment = '${equipment}' ,  model = '${model}',  description = '${description}',  created_on = '${now}',  approve = '${approve}',  disapprove = '${disapprove}',  resolve = '${resolvve}'  WHERE id = '${id}'`;
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
   * save new campaigns
   * @staticmethod
   * @param  {string} body - campaign object
   * @return {string} res
   */
  static saveCampaign(body) {
    const {
      campaign_id, firstname, lastname, email, gender, date, city, fundgoal, state, party, image, position, vision, alias, social
    } = body;
    return new Promise((resolve, reject) => {
      const queryBody = `INSERT INTO aspirants 
                         (campaign_id, firstname, lastname, email, gender, date, city, fundgoal, state, party, image, position, vision, alias, social) 
                         VALUES 
                         ('${campaign_id}', '${firstname}', '${lastname}', '${email}','${gender}','${date}','${city}','${fundgoal}','${state}','${party}','${image}','${position}','${vision}','${alias}','${social}')`;
      db.query(queryBody).then((result) => {
        if (result.rowCount >= 1) {
          resolve('Data Saved');
        } else if (result.rowCount === 0) {
          reject(new Error('Not Saved'));
        }
      }).catch((e) => {
        console.log(e);
        reject(new Error('Could not save campaign'));
      });
    });
  }
  /**
   * Get all campaigns
   * @staticmethod
   * @param  {string} id
   * @return {string} res
   */
  static getAllCampaigns(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM aspirants where aspirant_id = '${id}'`;
      db.query(query).then((result) => {
        if (result.rowCount === 0) {
          err.rowCount = 0;
          err.rows = [];
          reject(err);
        } else if (result.rowCount >= 1) {
          obj.rowCount = result.rowCount;
          obj.rows = result.rows;
          resolve(obj);
        }
      }).catch((e) => {
        err.rowCount = 0;
        err.rows = [];
        reject(err);
      });
    });
  }
}

export default campaignService;

// CREATE TABLE campaigns(
//   id bigserial PRIMARY KEY,
//   campaign_id serial NOT NULL,
//   firstname VARCHAR (255) NOT NULL,
//   lastname VARCHAR (255) NOT NULL,
//   email VARCHAR (255) UNIQUE NOT NULL,
//   gender VARCHAR (255) NOT NULL,
//   date VARCHAR (255) NOT NULL,
//   city VARCHAR (255) NOT NULL,
//   fundgoal VARCHAR (255) NOT NULL,
//   state VARCHAR (255) UNIQUE NOT NULL,
//   party VARCHAR (255) NOT NULL,
//   image VARCHAR (255) NOT NULL,
//   position VARCHAR (255) NOT NULL,
//   vision VARCHAR (255) NOT NULL,
//   alias VARCHAR (255) NOT NULL,
//   social text[] NOT NULL
//  );