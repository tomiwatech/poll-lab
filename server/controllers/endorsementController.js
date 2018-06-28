import moment from 'moment';
import endorsementService from '../services/endorsementService';

/**
 * @exports
 * @class endorsementController
 */
class endorsementController {
  /**
   * Creates a new endorsement
   * @staticmethod
   * @param  {object} req - endorsement object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static create(req, res) {
    const {
      endorsement,
    } = req.body;
    endorsementService.findEndorsement(endorsement).then((response) => {
      const d = new Date();
      const now = moment(d).format('YYYY-MM-DD HH:mm:ss');
      req.body.date = now;
      req.body.endorsement_id = req.decoded.data;
      console.log(req.decoded.data);
      endorsementService.saveEndorsement(req.body).then((resulter) => {
        return res.status(201).json({
          message: 'New endorsement created successfully',
        });
      }).catch((err) => {
        return res.status(500).json({
          message: 'Error Saving endorsement',
        });
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'endorsement Already Exists',
      });
    });
  }
  /**
   * Find endorsement by id
   * @staticmethod
   * @param  {object} req - endorsement object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static findOne(req, res) {
    const { id } = req.params;
    console.log(id);
    endorsementService.findEndorsementById(id).then((response) => {
      return res.status(200).json({
        message: 'endorsement Found',
        data: response.rows,
      });
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: 'endorsement Not found',
      });
    });
  }
  /**
   * Delete endorsement by id
   * @staticmethod
   * @param  {object} req - endorsement object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static deleteOne(req, res) {
    const { id } = req.params;
    endorsementService.deleteEndorsementById(id).then((response) => {
      return res.status(200).json({
        message: 'endorsement Deleted',
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'Error Deleting endorsement',
      });
    });
  }
  /**
   * Update endorsement by id
   * @staticmethod
   * @param  {object} req - endorsement object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static updateOne(req, res) {
    endorsementService.updateEndorsementById(req.body).then((response) => {
      return res.status(200).json({
        message: 'endorsement Updated',
        data: response.rows,
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'Error Updating endorsement',
      });
    });
  }
  /**
   * Get all endorsements
   *
   * @staticmethod
   * @param  {object} req - endorsement object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static getAll(req, res) {
    console.log(req.decoded.data);
    const id = req.decoded.data;
    endorsementService.getAllEndorsements(id).then((result) => {
      return res.status(200).json({
        message: 'Successfully fetched all users endorsements',
        total: result.rowCount,
        data: result.rows,
      });
    }).catch((e) => {
      console.log(e);
      return res.status(400).json({
        message: 'Could not fetch all users endorsements',
      });
    });
  }
}

export default endorsementController;
