// staticPaths.js
const StaticPaths = {
  "user": {
    "default": "/static/user/default.png"
  },
  "logo": {
    "logo": "/static/logo/logo.png",
    "logo-alpha": "/static/logo/logo-alpha.png"
  },
  "uni-center": {
    "headers": "/static/uni-center/headers.png"
  },
  "empty": {
    "search": "/static/empty/search.jpg"
  },
  "uni-fab-login": {
    "sms": "/static/uni-fab-login/sms.png",
    "apple": "/static/uni-fab-login/apple.png",
    "weixin": "/static/uni-fab-login/weixin.png",
    "taobao": "/static/uni-fab-login/taobao.png",
    "google": "/static/uni-fab-login/google.png",
    "qq": "/static/uni-fab-login/qq.png"
  },
  "login": {
    "apple": "/static/login/apple.png",
    "weixin": "/static/login/weixin.png"
  },
  "tabbar": {
    "category": "/static/tabbar/category.png",
    "category-active": "/static/tabbar/category-active.png"
  },
  "user-category": {
    "wfbd": "/static/user-category/wfbd.png",
    "wfbd1": "/static/user-category/wfbd1.png",
    "wmcd": "/static/user-category/wmcd.png",
    "wmdd": "/static/user-category/wmdd.png"
  },
  "limeClipper": {
    "photo": "/static/limeClipper/photo.svg",
    "rotate": "/static/limeClipper/rotate.svg"
  },
  "app": {
    "search-fill": "/static/app/search-fill.png"
  },
  "sinaweibo": {
    "sinaweibo": "/static/sinaweibo/sinaweibo.png"
  }
};

const ossApi = "https://mp-2e4a24ee-f1fc-460a-96b8-b09ff67c5b8a.cdn.bspapp.com";

function addBaseApiPrefix(obj, baseApi = baseApi) {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        // 如果值是对象，则递归调用函数
        newObj[key] = addBaseApiPrefix(obj[key], baseApi);
      } else {
        // 如果值不是对象，则添加前缀
        newObj[key] = baseApi + obj[key];
      }
    }
  }
  return newObj;
}

export const getOssFileByPath = (path, baseApi = ossApi) => {
  // 移除path和baseApi开头的斜杠，确保不重复添加斜杠
  const cleanPath = path.replace(/^\//, '');
  const cleanBaseApi = baseApi.replace(/\/$/, '');

  // 使用模板字符串将baseApi和cleanPath组合成完整的URL
  return `${cleanBaseApi}/${cleanPath}`;
};

// 使用函数添加前缀
const PathsWithBaseApi = addBaseApiPrefix(StaticPaths, ossApi);

export default PathsWithBaseApi;
