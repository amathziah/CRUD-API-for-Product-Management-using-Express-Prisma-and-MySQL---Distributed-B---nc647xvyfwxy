const validKey = '8a60348b-d4a4-564a-9b45-aab518adb7f4';

module.exports = (req, res, next) => {
  const apiauthkey = req.headers['apiauthkey'];
  if (!apiauthkey) {
    return res.status(401).json({ message: "Access denied, apiauthkey is missing" });
  }
  if (apiauthkey !== validKey) {
    return res.status(401).json({ message: "Failed to authenticate apiauthkey" });
  }
  next();
};
