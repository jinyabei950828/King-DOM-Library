//整体功能测试
//实例化
console.log(jQuery("<p>123131</p>"))
console.log(jQuery(['template','template']))

//获取元素
console.log(jQuery(".box").get(0))

//打印当前元素
console.log(jQuery(".box").print())

//增加class
console.log(jQuery(".box").addClass("box1"))

//获取父级
console.log(jQuery(".box").parent())

//获取子集
console.log(jQuery(".box").children())

//修改文字内容
console.log(jQuery("span").text("ABC"))

//返回oldApi
console.log(jQuery("span").end())

//find
console.log(jQuery("span").find("span"))

console.log(jQuery("<p>这个是测试哦</p>").appendTo(jQuery("body")))

console.log(jQuery("body").append(jQuery("<p>这个是测试哦append</p>")))