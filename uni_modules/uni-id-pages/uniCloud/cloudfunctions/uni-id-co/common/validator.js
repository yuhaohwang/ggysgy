const {
  isValidString,
  getType
} = require('./utils.js')
const {
  ERROR
} = require('./error')

const validator = Object.create(null)

validator.username = function (username) {
  const errCode = ERROR.INVALID_USERNAME
  if (!isValidString(username)) {
    return {
      errCode
    }
  }
  if (/^\d+$/.test(username)) {
    // 用户名不能为纯数字
    return {
      errCode
    }
  };
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    // 用户名仅能使用数字、字母、“_”及“-”
    return {
      errCode
    }
  }
}

validator.password = function (password) {
  const errCode = ERROR.INVALID_PASSWORD
  if (!isValidString(password)) {
    return {
      errCode
    }
  }
  if (password.length < 6) {
    // 密码长度不能小于6
    return {
      errCode
    }
  }
}

validator.mobile = function (mobile) {
  const errCode = ERROR.INVALID_MOBILE
  if (!isValidString(mobile)) {
    return {
      errCode
    }
  }
  if (!/^1\d{10}$/.test(mobile)) {
    return {
      errCode
    }
  }
}

validator.email = function (email) {
  const errCode = ERROR.INVALID_EMAIL
  if (!isValidString(email)) {
    return {
      errCode
    }
  }
  if (!/@/.test(email)) {
    return {
      errCode
    }
  }
}

validator.nickname = function (nickname) {
  const errCode = ERROR.INVALID_NICKNAME
  if (nickname.indexOf('@') !== -1) {
    // 昵称不允许含@
    return {
      errCode
    }
  };
  if (/^\d+$/.test(nickname)) {
    // 昵称不能为纯数字
    return {
      errCode
    }
  };
  if (nickname.length > 100) {
    // 昵称不可超过100字符
    return {
      errCode
    }
  }
}

validate['array<string>'] = function (arr) {
  if (getType(arr) !== 'array') {
    return {
      errCode: ERROR.INVALID_PARAM
    }
  }
  if (arr.some(item => !isValidString(item))) {
    return {
      errCode: ERROR.INVALID_PARAM
    }
  }
}

const baseType = ['string', 'boolean', 'number']

baseType.forEach((type) => {
  validator[type] = function (val) {
    if (getType(val) === type) {
      return
    }
    return {
      errCode: ERROR.INVALID_PARAM
    }
  }
})

function validate (value = {}, schema = {}) {
  for (const schemaKey in schema) {
    let schemaValue = schema[schemaKey]
    if (getType(schemaValue) === 'string') {
      schemaValue = {
        required: true,
        type: schemaValue
      }
    }
    const {
      required,
      type
    } = schemaValue
    // value内未传入了schemaKey或对应值为undefined
    if (value[schemaKey] === undefined) {
      if (required) {
        return {
          errCode: ERROR.PARAM_REQUIRED,
          errMsgValue: {
            param: schemaKey
          },
          schemaKey
        }
      } else {
        continue
      }
    }
    const validateMethod = validator[type]
    if (!validateMethod) {
      throw new Error(`invalid schema type: ${type}`)
    }
    const validateRes = validateMethod(value[schemaKey])
    if (validateRes) {
      validateRes.schemaKey = schemaKey
      return validateRes
    }
  }
}

function checkClientInfo (clientInfo) {
  const stringNotRequired = {
    required: false,
    type: 'string'
  }
  const numberNotRequired = {
    required: false,
    type: 'number'
  }
  const schema = {
    uniPlatform: 'string',
    appId: 'string',
    deviceId: stringNotRequired,
    osName: stringNotRequired,
    locale: stringNotRequired,
    clientIP: stringNotRequired,
    appName: stringNotRequired,
    appVersion: stringNotRequired,
    appVersionCode: stringNotRequired,
    channel: stringNotRequired,
    userAgent: stringNotRequired,
    uniIdToken: stringNotRequired,
    deviceBrand: stringNotRequired,
    deviceModel: stringNotRequired,
    osVersion: stringNotRequired,
    osLanguage: stringNotRequired,
    osTheme: stringNotRequired,
    romName: stringNotRequired,
    romVersion: stringNotRequired,
    devicePixelRatio: numberNotRequired,
    windowWidth: numberNotRequired,
    windowHeight: numberNotRequired,
    screenWidth: numberNotRequired,
    screenHeight: numberNotRequired
  }
  const validateRes = validate(clientInfo, schema)
  if (validateRes) {
    if (validateRes.errCode === ERROR.PARAM_REQUIRED) {
      console.warn('- 如果使用HBuilderX运行本地云函数/云对象功能时出现此提示，请改为使用客户端调用本地云函数方式调试，或更新HBuilderX到3.4.12及以上版本。\n- 如果是缺少clientInfo.appId，请检查项目manifest.json内是否配置了DCloud AppId')
      throw new Error(`"clientInfo.${validateRes.schemaKey}" is required.`)
    } else {
      throw new Error(`Invalid client info: clienInfo.${validateRes.schemaKey}`)
    }
  }
}

module.exports = {
  validate,
  validator,
  checkClientInfo
}
