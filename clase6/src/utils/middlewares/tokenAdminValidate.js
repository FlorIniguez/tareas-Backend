const jwt = require('jsonwebtoken');
const {userRoles} = require('../enum/userRoles')
const tokenAdminValidate = async (req,res,next) => {
  const token =  req.header('Authorization');
  if(!token){
      return res.status(401).json({
        message: 'token invàlido'
      });
    }
    try {
        const {username, rol} = jwt.verify(token,process.env.SECRET_KEY )
        if(!username  || rol !== userRoles .ADMIN_ROLE) {
            return res.status(401).json({
                message: 'token invàlido'
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'token invàlido'})
    }
};
module.exports = tokenAdminValidate;