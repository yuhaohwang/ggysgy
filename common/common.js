'use strict'

import $config from '@/common/config.js'
import $store from '@/common/store.js'

class Common {
  constructor(arg) {}

  /**
   * @description 日期格式化
   */
  format(date, fmt) {
    if (typeof date === 'string') {
      date = date.replace(/\.|\-/g, '/')
    }
    if (typeof date !== 'object') {
      date = new Date(date)
    }

    fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
    let o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return fmt
  }

  format_price(_number, _sep) {
    _number = typeof _number != 'undefined' && _number > 0 ? _number + '' : ''
    if (_number.indexOf('.') != -1) {
      _number = _number.split('.')[0]
    }
    _number = _number
      .replace(new RegExp('^(\\d{' + (_number.length % 3 ? _number.length % 3 : 0) + '})(\\d{3})', 'g'), '$1 $2')
      .replace(/(\d{3})+?/gi, '$1 ')
      .trim()
    if (typeof _sep != 'undefined' && _sep != ' ') {
      _number = _number.replace(/\s/g, _sep)
    }
    return _number
  }

  get_price_decimal(_price) {
    _price = _price + ''

    if (_price.indexOf('.') != -1) {
      return '.' + _price.split('.')[1]
    } else {
      _price = Math.random(2).toFixed(2)
    }

    return this.get_price_decimal(_price)
  }

  /**
   * @description 全球唯一 guid
   */
  guid() {
    return (
      this.__s4() + this.__s4() + '-' + this.__s4() + '-' + this.__s4() + '-' + this.__s4() + '-' + this.__s4() +
      this.__s4() + this.__s4()
    )
  }
  __s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  /**
   * @description 消息提示 toast
   */
  async msg(title, autoBack = false, duration = 1500, mask = false, icon = 'none') {

    if (!title) return

    uni.showToast({
      title,
      duration,
      mask,
      icon,
    })

    await new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve("成功!"); //代码正常执行！
      }, duration);
    })

    if (autoBack) this.toBack()

  }

  /**
   * @description 消息提示 alert
   */
  alert(content, callback) {
    uni.showModal({
      title: '提示',
      content: content,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          if (typeof callback === 'function') {
            callback()
          }
        } else if (res.cancel) {}
      },
    })
  }

  /**
   * @description 获取路径参数
   */
  get_params(data) {
    let params = ''
    if (typeof data === 'object') {
      for (let _ in data) {
        params += '&' + encodeURIComponent(_) + '=' + encodeURIComponent(data[_])
      }
      params = '?' + params.slice(1)
    } else if (typeof data === 'string') {
      if (data.indexOf('?') != -1) params = data
      else params = '?' + data
    } else {
      params = data
    }

    return params
  }

  /**
   * @description 去除两端空格
   * */
  trim(str) {
    return str.replace(/\s+/g, '')
  }

  /**
   * @description 注册当前环境
   * */
  register_env(callback) {
    const __timer = setTimeout(() => {
      uni.getSystemInfo({
        success(sis) {
          let env = {
            platform: '',
          }

          if (uni.canIUse('getAccountInfoSync')) {
            {
              const accountInfo = uni.getAccountInfoSync()
              if (accountInfo && accountInfo.miniProgram) {
                env.appid = accountInfo.miniProgram.appId
              }
            }
          }

          env.brand = sis.brand
          env.language = sis.language
          env.model = sis.model
          env.platform = sis.platform
          env.screenHeight = sis.screenHeight
          env.screenWidth = sis.screenWidth
          env.statusBarHeight = sis.statusBarHeight
          env.system = sis.system
          env.version = sis.version
          env.windowHeight = sis.windowHeight
          env.windowWidth = sis.windowWidth
          env.pixelRatio = sis.pixelRatio
          env.pixelRatio = sis.pixelRatio
          env.mobileType = sis.platform
          env.is_mp = false
          env.is_wx = false
          env.is_h5 = false
          env.is_app = false

          if (uni.canIUse('SDKVersion')) {
            env.sdkversion = my.SDKVersion
          }

          // #ifdef MP-WEIXIN
          env.platform = 'weixin'
          env.platform_name = '微信'
          env.is_mp = true
          env.is_wx = true
          // #endif
          // #ifdef MP-QQ
          env.platform = 'qq'
          env.platform_name = 'QQ'
          env.is_mp = true
          env.app_name = sis.AppPlatform
          // #endif
          // #ifdef MP-ALIPAY
          env.platform = 'alipay'
          env.platform_name = '支付宝'
          env.is_mp = true
          env.app_name = sis.app
          // #endif
          // #ifdef MP-BAIDU
          env.platform = 'baidu'
          env.platform_name = '百度'
          env.is_mp = true
          env.app_name = sis.host
          // #endif
          // #ifdef MP-TOUTIAO
          env.platform = 'toutiao'
          env.platform_name = '头条'
          env.is_mp = true
          env.app_name = sis.appName
          // #endif
          // #ifdef MP-360
          env.platform = '360'
          env.platform_name = '360'
          env.is_h5 = true
          env.app_name = '360小程序'
          // #endif
          // #ifdef H5-WX
          env.platform = 'h5-wx'
          env.platform_name = '微信服务号'
          env.is_h5 = true
          env.is_wx = true
          // #endif
          // #ifdef H5
          env.platform = 'h5'
          env.platform_name = 'h5'
          env.is_h5 = true
          // #endif
          // #ifdef APP-VUE || APP-NVUE || APP-PLUS || APP-PLUS-NVUE
          env.platform = 'app'
          env.platform_name = 'app'
          env.is_mp = true
          // #endif

          env.platform_icon = 'icon' + env.platform
          env.sis = sis

          uni.getNetworkType({
            success(res) {
              console.log(res.networkType)
              env.networkType = res.networkType
            },
            complete() {
              console.log('set storage env', env)
              uni.setStorage({
                key: '__env',
                data: env,
              })

              if (typeof callback === 'function') {
                callback(env)
              }
            },
          })
        },
      })

      clearTimeout(__timer)
    }, 1)
  }

  /**
   * @description 运行环境
   * */
  get_env(callback) {
    // return uni.getStorageSync('env');
    uni.getStorage({
      key: '__env',
      success(res) {
        if (typeof callback === 'function') {
          callback(res.data || {})
        }
      },
    })
  }

  /**
   * @description 获取用户信息
   * */
  async getUserInfo(e) {
    const db = uniCloud.database()
    const usersTable = db.collection('uni-id-users')
    await usersTable
      .where("'_id' == $cloudEnv_uid")
      .field('nickname,mobile,avatar_file')
      .get()
      .then(res => {
        if (res.result.data.length) {
          $store.commit('putMember', res.result.data[0])
        }
      })
      .catch(e => {
        console.log(e.message, e.errCode)
      })
      .finally(() => {
        uni.stopPullDownRefresh()
      })
  }

  dom(a, b) {
    if (arguments.length === 1 && typeof arguments[0] == 'string') {
      if (document.querySelector) {
        return document.querySelector(arguments[0])
      }
    } else if (arguments.length === 2) {
      if (typeof a === 'string') a = this.dom(a)
      if (a.querySelector) {
        return a.querySelector(b)
      }
    }
    return a
  }

  domAll(a, b) {
    if (arguments.length === 1 && typeof arguments[0] == 'string') {
      if (document.querySelectorAll) {
        return document.querySelectorAll(arguments[0])
      }
    } else if (arguments.length === 2) {
      if (typeof a === 'string') a = this.dom(a)
      if (a.querySelectorAll) {
        return a.querySelectorAll(b)
      }
    }
    return a
  }

  /**
   * @description 打印 info 日志
   * */
  info(msg) {
    console.info(msg)
  }

  /**
   * @description 当前页面数组
   * */
  pages() {
    return getCurrentPages()
  }

  /**
   * @description 返回上一级页面|跳转首页
   * */
  back() {
    if (getCurrentPages().length > 1) {
      uni.navigateBack({})
      return
    }
		
		uni.switchTab({
			url: $config.route.home,
		})
  }

  /**
   * @description 指定元素选择器 offset
   */
  offset(selector, callback) {
    let query = uni.createSelectorQuery().select(selector)
    // console.log('offset query', query);
    if (typeof callback === 'function') {
      query.boundingClientRect(res => {
        callback(res)
      })
    }
  }

  /**
   * @description 超时
   */
  timerout(callback, timer = 1000) {
    let _timer = setTimeout(() => {
      if (typeof callback === 'function') {
        callback()
      }
      clearTimeout(_timer)
    }, timer)
  }

  /**
   * @description 跳转页面
   */
  toUrl(url, type = 0) {
    switch (type) {
      case 0:
        uni.navigateTo({
          url,
        })
        break
      case 1:
        uni.switchTab({
          url,
        })
        break
      default:
        uni.navigateTo({
          url: `/pages/content/web?url=${url}`,
        })
        break
    }
  }

  /**
   * @description 跳转登录页
   */
  toLogin() {
    uni.navigateTo({
      url: $config.route.login,
    })
  }

  /**
   * @description 根据错误码返回上一页或者回到首页
   */
  toBack(errCode = 0) {
    let pages = getCurrentPages()
    switch (errCode) {
      case 0:
        pages.length ? uni.navigateBack() : uni.switchTab({
					url: $config.route.home,
				})
        break
    }
  }

  /**
   * @description 跳转首页
   */
  toHome() {
    uni.switchTab({
      url: $config.route.home,
    })
  }

  /**
   * @description 跳转订单页
   */
  toOrder() {
    uni.redirectTo({
      url: $config.route.order,
    })
  }

  /**
   * @description 跳转支付页
   */
  toPay(params) {
    params.money = params.money || 0
    params.type = params.type || 'navigate'

    if (params.type == 'redirect') {
      uni.redirectTo({
        url: $config.route.pay + this.get_params(params),
      })
      return
    }

    uni.navigateTo({
      url: $config.route.pay + this.get_params(params),
    })
  }

  /**
   * @description 跳转搜索页
   */
  toSearch() {
    uni.reLaunch({
      url: $config.route.search,
    })
  }

  /**
   * @description 跳转产品详情页
   */
  toGood(params) {
    uni.navigateTo({
      url: $config.route.goods + this.get_params(params),
    })
  }

  /**
   * @description 跳转产品列表页
   */
  toGoodList(params) {
    uni.navigateTo({
      url: $config.route.goodList + this.get_params(params),
    })
  }

  /**
   * @description 获取路径文件名称
   */
  getFileName(path) {
    if (path.indexOf('/') === -1) return ''

    return path.split('/').reverse()[0]
  }

  /**
   * @description 防抖函数
   */
  debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function() {
      var context = this;
      var args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        // 如果已经执行过，不再执行
        var callNow = !timeout;
        timeout = setTimeout(function() {
          timeout = null;
        }, wait)
        if (callNow) result = func.apply(context, args)
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args)
        }, wait);
      }
      return result;
    };
    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };
    return debounced;
  }

  /**
   * @description 节流函数
   */
  throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = null;
    };

    return throttled;
  }
}
export default new Common()
