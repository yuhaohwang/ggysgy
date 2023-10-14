<template>
  <view class="h-full bg-dark">
    <!-- 00. 未授权登录 -->
    <use-empty
      v-if="!islogin"
      e-style="round"
      e-type="unauthorized"
      tip="当前未授权"
      btn-tip="去登录"
      :auto="false"
      @goto="toLogin"
    ></use-empty>

    <scroll-view scroll-y class="h-full plr bg-main" v-else>
      <u-toast ref="uToast"></u-toast>
      <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
      <u--form labelPosition="top" labelWidth="auto" :model="publishData" :rules="rules" ref="form1">
        <u-form-item required label="作品名称" prop="name" borderBottom>
          <u-input v-model="publishData.name" border="none"></u-input>
        </u-form-item>
        <u-form-item label="作品简介" prop="content" borderBottom>
          <u-input v-model="publishData.content" border="none"></u-input>
        </u-form-item>
        <u-form-item required label="图片上传" prop="imgs" borderBottom>
          <!-- <use-upload class="w-full" v-model="publishData.imgs" @upload="uploadImgs" :limit="9"></use-upload> -->
          <uni-file-picker v-model="publishData.imgs" fileMediatype="image" mode="grid" :image-styles="imageStyle" @delete="imgDelete" />
        </u-form-item>
        <u-form-item required label="作品分类" prop="fdata" borderBottom>
          <u-radio-group class="x-s-c-w x-3" v-model="publishData.fdata" @change="fdataChange">
            <u-radio class="p-xs" v-for="(item, index) in fdatas" :key="index" :label="item.name" :name="item._id"></u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item required label="子分类" prop="sdata" borderBottom>
          <u-radio-group class="x-s-c-w x-4" @change="sdataChange">
            <block v-for="(item, index) in sdatas" :key="index">
              <u-radio class="p-xs" v-if="item.pid == publishData.fdata" :label="item.name" :name="item._id"></u-radio>
            </block>
          </u-radio-group>
        </u-form-item>
        <u-form-item required label="规格" prop="authType">
          <view class="y-c-c text-center">
            <view class="x-a-c x-3 w-full">
              <view></view>
              <view><text>价格</text></view>
              <view><text>库存</text></view>
            </view>

            <view class="x-a-c x-3 w-full" v-for="(item, index) in publishData.spec" :key="index">
              <view>
                <text>{{ item }}</text>
              </view>
              <view>
                <u-input v-model="publishData.skus[index].price" type="digit" inputAlign="right">
                  <u--text text="￥" slot="prefix" type="tips"></u--text>
                </u-input>
              </view>
              <view><u-input v-model="publishData.skus[index].stock_num" type="number" inputAlign="right"></u-input></view>
            </view>
          </view>
        </u-form-item>
      </u--form>

      <u-checkbox-group @change="agreementChecked = !agreementChecked">
        <u-checkbox></u-checkbox>
        <view class="">
          <text>我已阅读</text>
          <text style="color: #3c9cff" @click="toUrl('/pages/service/agreement', 0)">《全国艺术院校公益助学平台发布作品协议》</text>
        </view>
      </u-checkbox-group>
      <view class="p"><u-button type="primary" text="提交" @click="submitData" :disabled="!agreementChecked"></u-button></view>
    </scroll-view>
  </view>
</template>

<script>
  const _goodscategory = 'ggysgy-goods-category';
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState(['islogin']),
    },
    data() {
      return {
        isInit: false,

        agreementChecked: false,

        imageStyle: {
          height: '200rpx',
          width: '200rpx',
        },

        // 一级数据
        fdatas: [],
        // 二级数据
        sdatas: [],

        goods: {
          cid: '',
          cids: [],
          sort: 0,
          name: '',
          name_pw: '',
          limited: 0,
          hot: 0,
          tags: [],
          price: 0,
          market_price: 0,
          limit: 0,
          stock_num: 999,
          sale_cnt: 0,
          sale: 0,
          visit_cnt: 0,
          visit: 0,
          collect_cnt: 0,
          collect: 0,
          share_cnt: 0,
          share: 0,
          state: '待审核',
        },
        detail: { desc_mobile: '' },
        skus: [],

        publishData: {
          name: '',
          content: '',
          imgs: [],
          fdata: '',
          sdata: '',
          spec_s: '规格',
          spec: ['电子版(个人授权)', '纸质版(个人授权)', '电子版(商业授权)', '纸质版(商业授权)'],
          skus: [],
        },
        rules: {
          name: {
            type: 'string',
            required: true,
            message: '请填写作品名称',
            trigger: ['blur', 'change'],
          },
        },
      };
    },
    onLoad() {},
    mounted() {
      // #ifdef H5 || MP-360
      this.navHeight = 50;
      // #endif
    },
    onShow() {
      console.log(uniCloud.getCurrentUserInfo());
      if (this.islogin && !this.isInit) {
        this.init(this.affirm);
        this.$nextTick(function () {
          this.loadData();
        });
      }
    },
    onReady() {},
    mounted() {
      // #ifdef H5 || MP-360
      this.navHeight = 50;
      // #endif
    },
    //下拉刷新
    onPullDownRefresh() {
      this.init(this.affirm);
      this.loadData();
    },
    methods: {
      toLogin() {
        this.$api.toLogin();
      },
      toUrl() {
        let arr = [].concat.apply([], arguments);
        this.$api.toUrl(...arr);
      },
      async loadData() {
        this.$refs.uToast.show({
          type: 'loading',
        });

        this.$db[_goodscategory]
          .where(`'state'=='启用'`)
          .tolist({
            rows: 500,
            page: 1,
          })
          .then(res => {
            if (res.code === 200) {
              this.fdatas = [];
              this.sdatas = [];

              res.datas.forEach(item => {
                if (!item.pid) {
                  // pid为父级id, 不存在 pid || pid=0 为一级分类
                  this.fdatas.push(item);
                } else {
                  // 二级分类
                  this.sdatas.push(item);
                }
              });

              if (this.fdatas.length > 0) {
                this.publishData.fdata = this.fdatas[0]._id;
              }

              this.$refs.uToast.show({
                type: 'loading',
                duration: 0,
              });
              uni.stopPullDownRefresh();

              this.isInit = true;
            }
          });
      },

      init(callback) {
        this.publishData = {
          name: '',
          content: '',
          imgs: [],
          fdata: '',
          sdata: '',
          spec_s: '规格',
          spec: ['电子版(个人授权)', '纸质版(个人授权)', '电子版(商业授权)', '纸质版(商业授权)'],
          skus: [],
        };
        callback();
      },

      affirm() {
        // 规格
        if (this.publishData.spec.length > 0) {
          this.publishData.spec.forEach((spec, spec_idx) => {
            if (!this.publishData.skus.find(x => x.spec == spec))
              this.publishData.skus.push({
                price: null,
                stock_num: null,
                spec: spec,
                spec_s: spec_idx,
              });
          });
          this.publishData.skus = this.publishData.skus.filter(x => this.publishData.spec.find(s => s == x.spec));
        }
      },

      uploadImgs(options) {
        if (options.length > 0) this.publishData.imgs = options;
        console.log('uploadImgs', this.publishData.imgs);
      },

      submitData() {
        if (!this.publishData.name) {
          this.$refs.uToast.show({
            type: 'error',
            message: '请输入作品名称',
          });
          return;
        }

        // if (!this.publishData.content) {
        //   this.$refs.uToast.show({
        //     type: 'error',
        //     message: '请输入作品简介',
        //   })
        //   return
        // }

        if (this.publishData.imgs.length < 1) {
          this.$refs.uToast.show({
            type: 'error',
            message: '请上传图片',
          });
          return;
        }

        if (!this.publishData.sdata) {
          this.$refs.uToast.show({
            type: 'error',
            message: '请选择子分类',
          });
          return;
        }

        for (let row of this.publishData.skus) {
          if (!row.price || !row.stock_num) {
            this.$refs.uToast.show({
              type: 'error',
              message: '请输入价格库存',
            });
            return;
          }
        }

        this.$refs.uToast.show({
          type: 'loading',
          message: '正在提交',
        });

        this.goods.name = this.publishData.name;
        this.goods.cid = this.publishData.sdata;
        this.goods.cids = [];
        this.goods.cids.push(this.publishData.fdata, this.publishData.sdata);
        this.goods.price = this.publishData.skus[0].price * 100;
        this.goods.market_price = this.publishData.skus[3].price * 100;
        this.goods.skus = JSON.stringify({
          spec_s: this.publishData.spec_s,
          spec: this.publishData.spec,
        });
        this.goods.imgs = this.publishData.imgs;
        this.goods.img = this.publishData.imgs[0].url;
        for (const key in this.goods) {
          if (this.goods.hasOwnProperty(key)) {
            if (typeof this.goods[key] === 'string') {
              if (/^[0-9]*$/.test(this.goods[key])) {
                this.goods[key] = parseInt(this.goods[key]);
              } else if (/^[0-9]+(.[0-9]{1,3})?$/.test(this.goods[key])) {
                this.goods[key] = parseFloat(this.goods[key]);
              }
            }
          }
        }

        let obj = this.publishData.skus;
        let copy = JSON.parse(JSON.stringify(obj));
        copy.forEach(row => {
          row.price = row.price * 100;
        });
        this.skus = copy;

        this.publishData.imgs.forEach(img => {
          this.detail.desc_mobile += `<p><img style="max-width:100%;display:block;" src="${img.url}" ></p>`;
        });

        console.log(this.goods);

        let goods = this.goods;
        let detail = this.detail;
        let skus = this.skus;
        this.$func.useadmin
          .call('goods/add', {
            goods,
            detail,
            skus,
          })
          .then(res => {
            console.log('res', res);
            if (res.code == 200) {
              this.init(this.affirm);
              this.$refs.uToast.show({
                type: 'success',
                message: '发布成功(待审核)',
              });
            } else {
              this.$refs.uToast.show({
                type: 'error',
                message: res.msg,
              });
            }
          });
      },

      fdataChange(e) {
        this.publishData.fdata = e;
      },
      sdataChange(e) {
        this.publishData.sdata = e;
      },
    },
  };
</script>

<style lang="scss">
  page {
    height: 100%;
  }

  .u-radio-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;

    > view {
      width: 33.3%;
      padding: 10rpx;
    }
  }
</style>
