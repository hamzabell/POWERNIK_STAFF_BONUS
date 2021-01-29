module.exports = (event) => {
  return event.path.match(/([^\/]*)\/*$/)[0];
};
