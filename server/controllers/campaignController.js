import moment from 'moment';
import campaignService from '../services/campaignService';

/**
 * @exports
 * @class campaignController
 */
class campaignController {
  /**
   * Creates a new campaign
   * @staticmethod
   * @param  {object} req - campaign object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static create(req, res) {
    const {
      email,
    } = req.body;
    campaignService.findCampaignByEmail(email).then((response) => {
      const d = new Date();
      const now = moment(d).format('YYYY-MM-DD HH:mm:ss');
      req.body.date = now;
      req.body.campaign_id = req.decoded.data;
      console.log(req.decoded.data);
      campaignService.saveCampaign(req.body).then((resulter) => {
        return res.status(201).json({
          message: 'New campaign created successfully',
        });
      }).catch((err) => {
        return res.status(500).json({
          message: 'Error Saving campaign',
        });
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'Campaign Already Exists',
      });
    });
  }
  /**
   * Find campaign by id
   * @staticmethod
   * @param  {object} req - campaign object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static findOne(req, res) {
    const { id } = req.params;
    console.log(id);
    campaignService.findCampaignById(id).then((response) => {
      return res.status(200).json({
        message: 'Campaign Found',
        data: response.rows,
      });
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: 'Campaign Not found',
      });
    });
  }
  /**
   * Delete campaign by id
   * @staticmethod
   * @param  {object} req - campaign object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static deleteOne(req, res) {
    const { id } = req.params;
    campaignService.deleteCampaignById(id).then((response) => {
      return res.status(200).json({
        message: 'Campaign Deleted',
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'Error Deleting Campaign',
      });
    });
  }
  /**
   * Update campaign by id
   * @staticmethod
   * @param  {object} req - campaign object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static updateOne(req, res) {
    campaignService.updateCampaignById(req.body).then((response) => {
      return res.status(200).json({
        message: 'campaign Updated',
        data: response.rows,
      });
    }).catch((err) => {
      return res.status(400).json({
        message: 'Error Updating campaign',
      });
    });
  }
  /**
   * Get all campaigns
   *
   * @staticmethod
   * @param  {object} req - campaign object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static getAll(req, res) {
    console.log(req.decoded.data);
    const id = req.decoded.data;
    campaignService.getAllCampaigns(id).then((result) => {
      return res.status(200).json({
        message: 'Successfully fetched all users campaigns',
        total: result.rowCount,
        data: result.rows,
      });
    }).catch((e) => {
      console.log(e);
      return res.status(400).json({
        message: 'Could not fetch all users campaigns',
      });
    });
  }
}

export default campaignController;
