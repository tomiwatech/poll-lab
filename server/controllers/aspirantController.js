import moment from 'moment';
import aspirantService from '../services/aspirantService';

/**
 * @exports
 * @class aspirantController
 */
class aspirantController {
  /**
   * Creates a new aspirant
   * @staticmethod
   * @param  {object} req - aspirant object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static create(req, res) {
    const {
      email,
    } = req.body;
    aspirantService.findAspirantByEmail(email).then((response) => {
      const d = new Date();
      const now = moment(d).format('YYYY-MM-DD HH:mm:ss');
      req.body.date = now;
      req.body.aspirant_id = req.decoded.data;
      console.log(req.decoded.data);
      aspirantService.saveAspirant(req.body).then((resulter) => {
        return res.status(201).json({
          message: 'New aspirant created successfully',
        });
      }).catch((err) => {
        return res.status(500).json({
          message: 'Error Saving aspirant',
        });
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'Aspirant Already Exists',
      });
    });
  }
  /**
   * Find aspirant by id
   * @staticmethod
   * @param  {object} req - aspirant object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static findOne(req, res) {
    const { id } = req.params;
    console.log(id);
    aspirantService.findAspirantById(id).then((response) => {
      return res.status(200).json({
        message: 'aspirant Found',
        data: response.rows,
      });
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: 'aspirant Not found',
      });
    });
  }
  /**
   * Delete aspirant by id
   * @staticmethod
   * @param  {object} req - aspirant object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static deleteOne(req, res) {
    const { id } = req.params;
    aspirantService.deleteAspirantById(id).then((response) => {
      return res.status(200).json({
        message: 'aspirant Deleted',
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'Error Deleting aspirant',
      });
    });
  }
  /**
   * Update aspirant by id
   * @staticmethod
   * @param  {object} req - aspirant object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static updateOne(req, res) {
    aspirantService.updateAspirantById(req.body).then((response) => {
      return res.status(200).json({
        message: 'aspirant Updated',
        data: response.rows,
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'Error Updating aspirant',
      });
    });
  }
  /**
   * Get all aspirants
   *
   * @staticmethod
   * @param  {object} req - aspirant object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static getAll(req, res) {
    console.log(req.decoded.data);
    const id = req.decoded.data;
    aspirantService.getAllAspirants(id).then((result) => {
      return res.status(200).json({
        message: 'Successfully fetched all users aspirants',
        total: result.rowCount,
        data: result.rows,
      });
    }).catch((e) => {
      console.log(e);
      return res.status(400).json({
        message: 'Could not fetch all users',
      });
    });
  }
}

export default aspirantController;
