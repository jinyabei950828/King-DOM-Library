
let main = document.querySelector("#main")
console.log("window.dom",window.dom)

//添加属性
dom.attr(main,'title','hi,I am ting')
//获取属性
console.log(dom.attr(main,'title'))

//添加文本
dom.text(main,'添加文本内容')

//添加样式
dom.style(main,{
  backgroundColor:"red",
  border:'1px solid red'
})

//添加class（如果有重复的，则不继续添加）
dom.class.add(main,'blue')
dom.class.add(main,'box')

//移除class
dom.class.remove(main,'box')

//判断是否有某个class
console.log(dom.class.has(main,'blue'))

//绑定和解绑事件
const fn = ()=>{
  console.log("点击了哦！")
}

dom.on(main,'click',fn)
dom.off(main,'click',fn)

// 找到元素节点
const box = dom.find('#box1')[0]
console.log(box)

const box3 = document.querySelector('#box3')
console.log(dom.find('#box1'))

//给每个节点增加样式
const dom3 = dom.find('#box3')
dom.each(dom3,(n)=>dom.style(n,'color','red'))

//得到某个节点的子节点
console.log(dom.children(box3)[0])

//找到元素属于box1
console.log(dom.index(box3))

//创建
const div = dom.create("<div>newDiv</div>")
main.appendChild(div)
console.log(div)

