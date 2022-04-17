<template>
  <view class="margin-sm padding-lr-sm">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form labelPosition="top" labelWidth="auto" :model="model" :rules="rules" ref="form1">
      <u-form-item required label="作品名称" prop="publish.name" borderBottom ref="item1"
        ><u--input v-model="model.publish.name" border="none"></u--input
      ></u-form-item>
      <u-form-item label="作品简介" prop="publish.desc" borderBottom ref="item1"
        ><u--input v-model="model.publish.desc" border="none"></u--input
      ></u-form-item>
      <u-form-item label="图片上传" prop="publish.image" borderBottom ref="item1">
        <u-upload
          :fileList="imgList"
          @afterRead="afterRead"
          @delete="deletePic"
          uploadText="只能上传1张"
          name="2"
          :maxCount="1"
          accept="image"
        ></u-upload>
      </u-form-item>
      <u-form-item label="视频上传" prop="publish.video" borderBottom ref="item1">
        <u-upload
          :fileList="videoList"
          @afterRead="afterRead"
          @delete="deletePic"
          uploadText="只能上传1个"
          name="2"
          :maxCount="1"
          accept="video"
          :compressed="false"
        ></u-upload>
      </u-form-item>
      <u-form-item required label="作品分类" prop="publish.classify" borderBottom ref="item1">
        <u-radio-group
          class="radio-row-center"
          v-model="classifyRadioValue"
          placement="row"
          @change="groupChange"
        >
          <u-radio
            :customStyle="{ margin: '25rpx' }"
            v-for="(item, index) in classifyRadioList"
            :key="index"
            :label="item.name"
            :name="item.name"
            @change="radioChange"
          ></u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item required label="品类" prop="publish.subclassify" borderBottom ref="item1">
        <u-radio-group
          class="radio-row-center"
          v-model="subclassifyRadioValue"
          placement="row"
          @change="groupChange"
        >
          <u-radio
            :customStyle="{ margin: '25rpx' }"
            v-for="(item, index) in subclassifyRadioList"
            :key="index"
            :label="item.name"
            :name="item.name"
            @change="radioChange"
          ></u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item required label="授予权限" prop="publish.authType" borderBottom ref="item1">
        <u-radio-group
          class="radio-row-center"
          v-model="authTypeValue"
          placement="row"
          @change="groupChange"
        >
          <u-radio
            :customStyle="{ margin: '25rpx' }"
            v-for="(item, index) in authTypeList"
            :key="index"
            :label="item.name"
            :name="item.name"
            @change="radioChange"
          ></u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item required label="价格" prop="publish.price" borderBottom ref="item1"
        ><u--input v-model="model.publish.price" border="none" type="digit"></u--input
      ></u-form-item>
    </u--form>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showSex: false,
        model: {
          publish: {
            name: '',
            desc: '',
            image: '',
            video: '',
            classify: '',
            subclassify: '',
            authType: '',
            price: '',
          },
        },
        rules: {
          'publish.name': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change'],
          },
        },
        imgList: [],
        videoList: [],
        classifyRadioList: [
          {
            name: '美术类',
            disabled: false,
          },
          {
            name: '设计类',
            disabled: false,
          },
          {
            name: '文学类',
            disabled: false,
          },
        ],
        subclassifyRadioList: [
          {
            name: '油画',
            disabled: false,
          },
          {
            name: '水彩',
            disabled: false,
          },
          {
            name: '国画',
            disabled: false,
          },
          {
            name: '素描',
            disabled: false,
          },
          {
            name: '雕塑',
            disabled: false,
          },
          {
            name: '摄影',
            disabled: false,
          },
          {
            name: '书法',
            disabled: false,
          },
          {
            name: '漆画',
            disabled: false,
          },
          {
            name: '版画',
            disabled: false,
          },
          {
            name: '数绘',
            disabled: false,
          },
          {
            name: '其他',
            disabled: false,
          },
        ],
        authTypeList: [
          {
            name: '商业使用',
            disabled: false,
          },
          {
            name: '私人使用',
            disabled: false,
          },
        ],
        classifyRadioValue: '',
        subclassifyRadioValue: '',
        authTypeValue: '',
      }
    },
    methods: {
      groupChange(n) {
        console.log('groupChange', n)
      },
      radioChange(n) {
        console.log('radioChange', n)
      },
    },
    onLoad() {},
    mounted() {
      // #ifdef H5 || MP-360
      this.navHeight = 50
      // #endif
    },
  }
</script>

<style lang="scss">
  .u-radio-group--row,
  .radio-row-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
