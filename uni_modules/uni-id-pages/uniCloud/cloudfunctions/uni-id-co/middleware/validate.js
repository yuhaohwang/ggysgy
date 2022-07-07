const {
  validate
} = require('../common/validator')

module.exports = function (value = {}, schema = {}) {
  const validateRes = validate(value, schema)
  if (validateRes) {
    delete validateRes.schemaKey
    throw validateRes
  }
}
