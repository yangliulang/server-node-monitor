let domain
try {
  let arr = window.location.hostname.split('.')
  domain = arr[arr.length - 2] + '.' + arr[arr.length - 1]
} catch (e) {
  domain = 'lianbe.com'
}
const env = 'test'
export default {
  env,
  // cookie domain
  domain,
  // href domain
  // 58coin
  mainDomain: `http://goods-main.${env}.${domain}/`,
  // account
  userDomain: `http://goods-user.${env}.${domain}/`,
  registerDomain: `http://goods-register.${env}.${domain}/`,
  // otc
  otcDomain: `http://goods-otc.${env}.${domain}/`,
  // usdt
  usdtDomain: `http://goods-usdt.${env}.${domain}/`,
  // 特会平台
  specialDomain: `http://goods-special.${env}.${domain}/`,
  // api
  //baseURL: `http://${env}-tbex-cfd-admin.cfd${env}.${domain}/`, // 主要接口 dev环境
  // 特会
  baseURL: `http://${env}-tbex-cfd-web-controller.cfd${env}.${domain}/`, // 58coin 58spot

  otcURL: `http://${env}-tbex-cfd-otc-web.cfd${env}.${domain}/cfd/`, // otc
  // zendeskURL: 'https://58coin-support.zendesk.com/',
  oosImgUrl: `https://tianbi-${env}.oss-cn-beijing.aliyuncs.com/`
}
