export default {

  /**
   * Maintain the constants group by, i.e. common, company, candidate, etc... if any
   * 
   * Also maintain the success and error responses as per defined in common
   */

  // Common constants
  authSuccess: { status: 200, message: 'Login successful' },
  success: { status: 200, message: 'Success' },

  unauthorized: { status: 401, message: 'Invalid Username or Password' },
  authError: { status: 401, message: 'Invalid Username or Password' },
  noTokenProvided: { status: 401, message: 'No token provided' },
  tokenExpired: { status: 401, message: 'Token expired' },
  invalidToken: { status: 401, message: 'Invalid token' },
  invalidCode: { status: 401, message: 'Invalid verification code' },
  codeExpired: { status: 401, message: 'Verification code expired' },

  forbidden: { status: 403, message: 'Forbidden' },

  deleteResourceError: { status: 422, message: 'Something went wrong while deleting data' },
  fetchResourceError: { status: 422, message: 'Something went wrong while fetching data' },
  validationErrors: { status: 422, message: 'Unable to process form request' },
  somethingWentWrong: { status: 422, message: 'Something went wrong !!!' },
  notFound: { status: 404, message: 'Requested data not found' },
  error: { status: 422, message: 'Error' },


  // Define any custom constants group by
}