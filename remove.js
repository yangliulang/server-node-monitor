/**
 * created by liufei 2019-3-11
 * 用法：node remove 'test'
 * 作用：删除pages中的test文件夹
 *
 * 用法：node remove 'components,test'
 * 作用：删除components中的test文件夹
 */
let fs = require('fs')

let names = process.argv[2].split(',')

let fileUrl = names.length === 1 ? './src/pages/' : `./src/${names[0]}/`
let name = names.length === 1 ? names[0] : names[1]

;(function () {
  fs.access(`${fileUrl}${name}`, fs.R_OK | fs.W_OK, function (err) {
    if (err) {
      console.log(`${name}文件夹不存在！`)
    } else {
      var files = fs.readdirSync(`${fileUrl}${name}`)
      files.forEach(function (file) {
        var stats = fs.statSync(`${fileUrl}${name}/${file}`)
        if (stats.isDirectory()) {
          emptyDir(`${fileUrl}${name}/${file}`)
        } else {
          fs.unlinkSync(`${fileUrl}${name}/${file}`)
          console.log(`删除文件${fileUrl}${name}/${file}成功`)
        }
      })
      fs.rmdir(`${fileUrl}${name}`, function () {
        console.log(`${name}文件夹已删除！`)
      })
    }
  })
})()
