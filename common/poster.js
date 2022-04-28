let uposter = {
  // 产品海报
  goods: {
    width: '750rpx',
    height: '1114rpx',
    background: '#feaa30',
    views: [
      {
        type: 'view',
        css: {
          position: 'fixed',
          left: '40rpx',
          top: '144rpx',
          background: '#fff',
          borderRadius: '30rpx',
          width: '670rpx',
          height: '900rpx',
          boxShadow: '0 20rpx 48rpx rgba(0, 0, 0, .05)',
        },
      },
      // 1. 会员头像
      {
        type: 'image',
        src: '',
        css: {
          position: 'fixed',
          left: '50rpx',
          top: '40rpx',
          width: '84rpx',
          height: '84rpx',
          borderRadius: '50%',
          color: '#999',
          boxShadow: '0px 0px 7px #f0f0f0',
        },
      },
      // 2. 会员名称
      {
        type: 'text',
        text: 'Usecloud',
        css: {
          position: 'fixed',
          color: '#fff',
          left: '154rpx',
          top: '40rpx',
          fontSize: '32rpx',
          fontWeight: 'bold',
        },
      },
      {
        type: 'text',
        text: '为您挑选了一个好物',
        css: {
          position: 'fixed',
          color: '#fff',
          left: '154rpx',
          top: '90rpx',
          fontSize: '24rpx',
        },
      },
      // 4. 产品图
      {
        type: 'image',
        src: '',
        css: {
          position: 'fixed',
          left: '72rpx',
          top: '176rpx',
          width: '606rpx',
          height: '606rpx',
          borderRadius: '12rpx',
        },
      },
      {
        type: 'text',
        text: '￥',
        css: {
          position: 'fixed',
          color: '#feaa30',
          left: '70rpx',
          top: '840rpx',
          fontSize: '26rpx',
        },
      },
      // 6. 产品价格
      {
        type: 'text',
        text: '1339.90',
        css: {
          position: 'fixed',
          color: '#feaa30',
          left: '94rpx',
          top: '812rpx',
          fontSize: '56rpx',
          fontWeight: 'bold',
        },
      },
      // 7. 产品介绍
      {
        type: 'text',
        text: '小米10 Xiaomi/小米手机小米10手机骁龙865 1亿像素双模5G官方正品 骁龙865旗舰处理器 1亿像素8K电影相机',
        css: {
          position: 'fixed',
          width: '450rpx',
          height: '100rpx',
          color: '#333',
          left: '76rpx',
          top: '908rpx',
          fontSize: '30rpx',
          lineHeight: '50rpx',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'wrap',
        },
      },
      // 8. 产品二维码
      {
        type: 'image',
        src: '',
        css: {
          position: 'fixed',
          left: '545rpx',
          top: '875rpx',
          width: '135rpx',
          height: '135rpx',
          background: '#fff',
        },
      },
      {
        type: 'view',
        css: {
          height: '20rpx',
          marginBottom: '25rpx',
        },
      },
    ],
  },
  // 产品海报数据
  getGoodsData: function (member, goods, qrcode) {
    // 会员头像
    this.goods.views[1].src = member.member_headimg ? member.member_headimg : '/static/images/logo.png';
    // 会员名称
    this.goods.views[2].text = member.member_nickname ? member.member_nickname : '以艺自强';
    // 产品图
    this.goods.views[4].src = goods.img;
    // 产品价格
    this.goods.views[6].text = '' + goods.price / 100;
    // 产品名称
    this.goods.views[7].text = goods.name;
    // 二维码
    this.goods.views[8].src = qrcode;
    return this.goods;
  },

  // 会员海报
  member: {},
  // 分销商海报
  fxs: {},
};

export default uposter;
