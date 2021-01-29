const allowedCors = ['http://localhost:3001'];
const allowedHeaders = 'authorization, content-type';
const allowedMethods = 'PATCH, DELETE, PUT';

module.exports = (req, res, next) => {
  if (allowedCors.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', allowedHeaders);
    res.header('Access-Control-Allow-Methods', allowedMethods);
    if (req.method === 'OPTIONS') return res.status(200).end();
  }
  return next();
};
