import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthenticated user, please login again',
        data: {},
      });
    }

    const userDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token, please login again',
        data: {},
      });
    }
    req.user = userDetails;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired, please login again',
        data: {},
      });
    }
    console.error('Token verification error:', error);
    return res.status(400).json({
      success: false,
      message: 'Token verification failed, please login again',
      data: {},
    });
  }
};
export { isLoggedIn };
