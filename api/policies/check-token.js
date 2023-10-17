module.exports = async function (req, res, proceed) {    
  try {
    const token = req.header('token');
    const uid = req.header('uid');
    if (!token || !uid) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }  
    return proceed();
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}