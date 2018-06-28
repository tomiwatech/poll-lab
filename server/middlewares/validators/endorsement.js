import jwt from 'jsonwebtoken';
import config from '../../config/index';
/**
 * @exports
 * @class campaignMiddleware
 */
class campaignMiddleware {
  /**
     * campaignMiddleware
     * Validate POST BODY
     * @staticmethod
     * @param  {object} req - campaign object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
  static validatePostBody(req, res, next) {
    const {
      endorsement,username
    } = req.body;
    if (endorsement.trim() === '' || username.trim() === '') {
      return res.status(404).json({
        message: 'Please fill all fields',
      });
    }
    next();
  }
  /**
     * campaignMiddleware
     * VERIFY TOKEN
     * @staticmethod
     * @param  {object} req - campaign object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
  static verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.userSecret, (err, decoded) => {
        if (err) {
          return res.status(403).json({ verifyToken: false, message: 'Failed to authenticate token.' });
        }
        // if everything is good, save to campaign for use in other routes
        req.decoded = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        verifyToken: false,
        message: 'No token provided.',
      });
    }
  }
}
export default campaignMiddleware;
