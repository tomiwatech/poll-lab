import db from '../connection/connect';

const obj = {};
const err = {};
/**
 * @exports
 * @class donationService
 */
class donationService {
    /**
     * Find donation by equipment
     * @staticmethod
     * @param  {string} serial_number - donation object
     * @return {string} res
     */
    static finddonation(donation) {
        return new Promise((resolve, reject) => {
            const query = `SELECT id, donation , username, donation_id FROM donations WHERE donation = '${donation}'`;
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
     * Find donation by id
     * @staticmethod
     * @param  {string} id - donation object
     * @return {string} res
     */
    static finddonationById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT id,donation,username,donation_id FROM donations WHERE id = '${id}'`;
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
     * delete donation by id
     * @staticmethod
     * @param  {string} id - donation object
     * @return {string} res
     */
    static deletedonationById(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM donations WHERE id = '${id}'`;
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
   * update donation by body
   * @staticmethod
   * @param  {string} body - donation object
   * @return {string} res
   */
    static updatedonationById(body) {
        const {
      id, donationtype, equipment, model, description, now, approve, disapprove, resolvve,
    } = body;
        return new Promise((resolve, reject) => {
            const query = `UPDATE donations SET donationtype = '${donationtype}', equipment = '${equipment}' ,  model = '${model}',  description = '${description}',  created_on = '${now}',  approve = '${approve}',  disapprove = '${disapprove}',  resolve = '${resolvve}'  WHERE id = '${id}'`;
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
     * save new donations
     * @staticmethod
     * @param  {string} body - donation object
     * @return {string} res
     */
    static savedonation(body) {
        const {
      donation, username, date, donation_id
    } = body;
        return new Promise((resolve, reject) => {
            const queryBody = `INSERT INTO donations
                         (donation, username, date, donation_id) 
                         VALUES 
                         ('${donation}', '${username}', '${date}', '${donation_id}')`;
            db.query(queryBody).then((result) => {
                if (result.rowCount >= 1) {
                    resolve('Data Saved');
                } else if (result.rowCount === 0) {
                    reject(new Error('Not Saved'));
                }
            }).catch((e) => {
                console.log(e);
                reject(new Error('Could not save donation'));
            });
        });
    }
    /**
     * Get all donations
     * @staticmethod
     * @param  {string} id
     * @return {string} res
     */
    static getAlldonations(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM donations where donation_id = '${id}'`;
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

export default donationService;
