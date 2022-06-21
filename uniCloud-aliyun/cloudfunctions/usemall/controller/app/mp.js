'use strict'

const {
  Controller
} = require('uni-cloud-router')

module.exports = class MpController extends Controller {
  // 首页
  async home() {
    let {
      rows
    } = this.ctx.data
    rows = rows || 8

    let response = {
      carousel: [],
      graphicCategory: [],
      cardCategory: [],
      limited: [],
      hot: []
    }
    let start = new Date().getTime()

    const carousel = this.db.collection('usemall-app-carousel').orderBy('sort', 'asc').get()
    const graphicCategory = this.db.collection('usemall-app-category').where({
      ctype: 0
    }).orderBy('sort', 'asc').get()
    const cardCategory = this.db.collection('usemall-app-category').where({
      ctype: 1
    }).orderBy('sort', 'asc').get()
    const limited = this.db.collection('usemall-goods').where({
      limited: 1
    }).limit(rows).orderBy('sort', 'asc').get()
    const hot = this.db.collection('usemall-goods').where({
      hot: 1
    }).limit(rows).orderBy('sort', 'asc').get()

    const datas = await Promise.all([carousel, graphicCategory, cardCategory, limited, hot])

    response.carousel = datas[0] && datas[0].data
    response.graphicCategory = datas[1] && datas[1].data
    response.cardCategory = datas[2] && datas[2].data
    response.limited = datas[3] && datas[3].data
    response.hot = datas[4] && datas[4].data

    let end = new Date().getTime()
    console.log(`耗时：${end - start}ms`)
    response.code = 0
    response.msg = `耗时：${end - start}ms`
    return response
  }
}
