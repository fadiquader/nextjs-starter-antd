const { getLocales } = require('../server/utils/lang');

module.exports = (expressApp, functions) => {

  if (expressApp === null) {
    throw new Error('expressApp option must be an express server instance')
  }
  expressApp.get('/api/locale', (req, res) => {
    const lang = req.session.lang;
    const data = getLocales(req)
    if(lang) {
      res.json({
        ...data
      })
    } else {
      res.status(403).end()
    }
  })
};