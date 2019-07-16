/**
 * created by liufei 2019-3-11
 * 用法：node create 'test,test-list,test-header,test-footer'
 * 作用：在pages文件中快速创建test文件夹并包含index.vue模板，并在components中创建test文件夹，并包含test-list.vue,test-header.vue,test-footer.vue组件模板
 */
let fs = require('fs');

let names = process.argv[2].split(',');

let pros = ['pages', 'components'];

(function() {
    fs.access(`./src/${pros[0]}/${names[0]}`, fs.R_OK | fs.W_OK, function(err) {
        if (err) {
            fs.mkdir(`./src/${pros[0]}/${names[0]}`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${pros[0]}文件夹创建${names[0]}成功！`)
                    create(pros[0], names[0], 'index');
                }
            })
            fs.mkdir(`./src/${pros[1]}/${names[0]}`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${pros[1]}文件夹创建${names[0]}成功！`)
                    for (let i = 0; i < names.length; i++) {
                        if (i === 0) {
                            continue;
                        }
                        create(pros[1], names[0], names[i]);
                    }
                }
            })
        } else {
            console.log(`${pros[0]}文件夹中${names[0]}文件夹已存在！`)
        }
    })
})();


function create (src, file, name) {
    fs.appendFile(`./src/${src}/${file}/${name}.vue`, `<template>\n\t<div>\n\t</div>\n</template>\n<script>\n\texport default {\n\t\tname: '${name}',\n\t\tdata () {\n\t\t\treturn {}\n\t\t},\n\t\tcreated () {},\n\t\tmounted () {},\n\t\tcomponents: {},\n\t\tprops: {},\n\t\tcomputed: {},\n\t\twatch: {},\n\t\tmethods: {},\n\t\tbeforeDestroy () {}\n\t}\n</script>\n<style lang="less" scoped>\n</style>`, 'utf8', function(err){
        if (err) {
            console.log(err);
        } else {
            console.log(`${src}目录${file}文件夹下创建${name}成功！`)
        }
    })
}