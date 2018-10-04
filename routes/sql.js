module.exports = (app, jsonParser) => {
  app.post('/sql', jsonParser, (req, res) => {
    if (req.body.username) {
      if (!user.password) {
        console.log('Bad password'); res.status(400).send('No Password! You must provide one!');
        // console.log('Bad password'); res.status(400).send('Incorrect password. Check your spelling and try again.');
      } else {
        res.status(200).json(setConfig({ ok: true }));
      }
    } else console.log('Bad username'); res.status(400).send('No Username! You must provide one!');
  });
};
