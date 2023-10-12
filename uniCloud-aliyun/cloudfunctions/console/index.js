'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
  uniCloud.logger.log(123);
  return {};
};
