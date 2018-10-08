module.exports = (ws, request, res) => {
  res.date = new Date();
  ws.send(JSON.stringify(res));
  console.log(`Response to '${request}' sent.`);
};
