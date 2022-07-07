import $api from '@/common/common.js'
import $store from '@/common/store.js'
export default async function(e = {}) {
  const {
    errCode = 0, showToast = true, toastText = '登录成功', autoBack = true
  } = e

  console.log({
    errCode,
    toastText,
    autoBack
  });

  if (!errCode) {
    $store.commit('login', e)
    uni.showLoading({
      title: "请求中",
      mask: true
    })
    await $api.getUserInfo()
    uni.hideLoading()
  } else {
    $store.commit('logout')
  }

  if (showToast) {
    uni.showToast({
      title: toastText,
      icon: 'none'
    });
  }
  if (autoBack) {
    let delta = 0; //判断需要返回几层
    let pages = getCurrentPages();
    // console.log(pages);
    pages.forEach((page, index) => {
      if (pages[pages.length - index - 1].route.split('/')[2] == 'login') {
        delta++
      }
    })
    console.log('判断需要返回几层:', delta);
    uni.navigateBack({
      delta
    })
  }
}
