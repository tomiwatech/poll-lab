import db from '../connection/connect';

const obj = {};
const err = {};
/**
 * @exports
 * @class endorsementService
 */
class endorsementService {
  /**
   * Find endorsement by equipment
   * @staticmethod
   * @param  {string} serial_number - endorsement object
   * @return {string} res
   */
  static findEndorsement(endorsement) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, endorsement , username, endorsement_id FROM endorsements WHERE endorsement = '${endorsement}'`;
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
   * Find endorsement by id
   * @staticmethod
   * @param  {string} id - endorsement object
   * @return {string} res
   */
  static findEndorsementById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id,endorsement,username,endorsement_id FROM endorsements WHERE id = '${id}'`;
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
   * delete endorsement by id
   * @staticmethod
   * @param  {string} id - endorsement object
   * @return {string} res
   */
  static deleteEndorsementById(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM endorsements WHERE id = '${id}'`;
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
 * update endorsement by body
 * @staticmethod
 * @param  {string} body - endorsement object
 * @return {string} res
 */
  static updateEndorsementById(body) {
    const {
      id, endorsementtype, equipment, model, description, now, approve, disapprove, resolvve,
    } = body;
    return new Promise((resolve, reject) => {
      const query = `UPDATE endorsements SET endorsementtype = '${endorsementtype}', equipment = '${equipment}' ,  model = '${model}',  description = '${description}',  created_on = '${now}',  approve = '${approve}',  disapprove = '${disapprove}',  resolve = '${resolvve}'  WHERE id = '${id}'`;
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
   * save new endorsements
   * @staticmethod
   * @param  {string} body - endorsement object
   * @return {string} res
   */
  static saveEndorsement(body) {
    const {
      endorsement, username, date, endorsement_id
    } = body;
    return new Promise((resolve, reject) => {
      const queryBody = `INSERT INTO endorsements
                         (endorsement, username, date, endorsement_id) 
                         VALUES 
                         ('${endorsement}', '${username}', '${date}', '${endorsement_id}')`;
      db.query(queryBody).then((result) => {
        if (result.rowCount >= 1) {
          resolve('Data Saved');
        } else if (result.rowCount === 0) {
          reject(new Error('Not Saved'));
        }
      }).catch((e) => {
        console.log(e);
        reject(new Error('Could not save endorsement'));
      });
    });
  }
  /**
   * Get all endorsements
   * @staticmethod
   * @param  {string} id
   * @return {string} res
   */
  static getAllEndorsements(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM endorsements where endorsement_id = '${id}'`;
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

export default endorsementService;
