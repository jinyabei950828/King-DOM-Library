# King-DOM-Library
简易版本JavaScript操作DOM的方法

## DOM 库
```
//创建元素
create(string)

//插入下一个节点
after(node, node2)

//前面插入节点
before(node, node2)

//插入子节点
append(parent, node)

//增加父元素
wrap(node, parent)

//删除节点
remove(node)

//删除所有子节点
empty(node)

//如果两个参数就set，如果三个就get
attr(node, name, value)

//适配，IE,添加文本
text(node, string)

//添加html元素
html(node, string)

//添加样式
style(node, name, value)

//操作class属性
class.add(node, className)
class.remove(node, className)
class.has(node, className)

//绑定事件和移除事件
on(node, eventName, fn, flag)
off(node, eventName, fn, flag)

//获取元素数组,第二个参数指定范围
find(selector, scope)

//查兄弟节点
siblings(node)

//查父元素
parent(node)

//查下一个元素节点
next(node)

//获取排行老几
index(node)
```
