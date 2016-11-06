import auth from 'basic-auth';
const serviceUsers = process.env.SERVICE_USERNAMES.split(',');
const serviceKeys = process.env.SERVICE_API_KEYS.split(',');

export default (req, res, next) => {
  const credentials = auth(req);
  if (credentials) {
    const userIndex = serviceUsers.indexOf(credentials.name);
    if (credentials.pass.length && credentials.pass === serviceKeys[userIndex]) {
      req.user = { username: credentials.name };
      return next();
    }
  }

  res.status(401).end();
}