const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Sem token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tenta pegar o user do payload ou o próprio payload (depende de como foi gerado no login)
    req.user = decoded.user || decoded; 
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token não é válido' });
  }
};