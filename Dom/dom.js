const dom = {
  /**
   * 创建
   * @param {*} string 
   * @returns 
   */
  create(string){
    const container = document.createElement("template");
    container.innerHTML = string.trim()
    return container.content.firstChild
  },
  /**
   * 创建插入下一节点
   * @param {*} node 
   * @param {*} node2 
   */
  after(node,node2){
    node.parentNode.insertBefore(node2,node.nextSibling)
  },
  before(node,node2){
    node.parentNode.insertBefore(node2,node)
  },
  append(parent,node){
    parent.append(node)
  },
  //增加一个父元素
  wrap(node,parent){
    dom.before(node,parent)
    dom.append(parent,node)
  },
  //移除当前元素
  remove(node){
    node.parentNode.removeChild(node)
    return node
  },
  //删除所有
  empty(node){
    const array = []
    let x = node.firstChild
    while(x){
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
  },
  /**
   * 如果参数是三个，则是新增属性，
   * 如果是两个，则是获取属性值
   * @param {*} node 当前节点
   * @param {*} name 属性名
   * @param {*} value 属性值
   * @returns 
   */
  attr(node,name,value){
    if(arguments&&arguments.length==3){
      node.setAttribute(name,value)
    }else{
      return node.getAttribute(name)
    }
  },
  /**
   * 如果参数是两个，则是新增text属性，
   * 如果是一个，则是获取text属性值
   * @param {*} node 节点/属性名
   * @param {*} value 属性值
   * @returns 
   */
  text(node,value){
    if(arguments&&arguments.length===2){
      // textContent兼容ie9及以上、innerText兼容ie6及以上
      // 如果元素中间包含script和style，innerText是获取不到两个元素之间的文本的，textContent可以
      // innerText 获取浏览器层面的显示，textContent 依赖于代码的显示
      if('textContent' in node){
        node.textContent = value
      }else{
        node.innerText = value
      }
    }else if(arguments&&arguments.length===1){
      if('textContent'in node){
        return node.textContent
      }else{
        return node.innerText
      }
    }
  },
  html(node,string){
    if(arguments&&arguments.length==2){
      node.innerHTML = string
    }else if(arguments&&arguments.length==1){
      return node.innerHTML
    }
  },
  //添加样式
  style(node,name,value){
    if(arguments&&arguments.length===3){
      node.style[name] = value
    }else  if(arguments.length===2){
      if(typeof name==='string'){
        return node.style[name]
      }else if(name instanceof Object){
        for(let key in name){
          node.style[key] = name[key]
        }
      }
    }
  },
  //操作class相关属性
  class:{
    add(node,className){
      node.classList.add(className)
    },
    remove(node,className){
      node.classList.remove(className)
    },
    has(node,className){
      return node.classList.contains(className)
    }
  },
  /**
   * 绑定事件
   * @param {*} node 节点
   * @param {*} eventName 事件
   * @param {*} fn 绑定函数
   * @param {*} flag 捕获还是冒泡触发
   */
  on(node,eventName,fn,flag){
    node.addEventListener(eventName,fn,flag||false)
  },
  /**
   * 解绑事件
   * @param {*} node 节点
   * @param {*} eventName 事件
   * @param {*} fn 绑定函数
   */
  off(node,eventName,fn){
    node.removeEventListener(eventName,fn)
  },
  /**
   * 找到指定元素
   * @param {*} selector 选择器
   * @param {*} scope 
   * @returns 
   */
  find(selector,scope){
    return (scope||document).querySelectorAll(selector)
  },
  /**
   * 遍历每一个节点
   * @param {*} nodeList 节点数组
   * @param {*} fn 函数
   */
  each(nodeList,fn){
    for(let i=0;i<nodeList.length;i++){
      fn.call(null,nodeList[i])
    }
  },
  //查找兄弟节点
  siblings(node){
    const children = node&&node.parent&&node.parent.children
    return Array.from(children).filter(n=>n!=node)
  },
  parent(node){
    return node.parentNode
  },
  previous(node){
    let x = node.previousSibling
    //文本节点
    while(x&&x.nodeType===3){
      x = x.previousSibling
    }
    return x
  },
  next(node){
    let x = node.nextSibling
    while(x&&x.nodeType){
      x = x.nextSibling
    }
    return x
  },
  /**
   * 获取子代孩子
   * @param {*} node 节点数
   * @returns 
   */
  children(node){
    return node.children
  },

  /**
   * 获取排行老几
   * @param {*} node 节点数
   * @returns 
   */
  index(node){
    const list = dom.children(node.parentNode)
    let i;
    for(i=0;i<list.length;i++){
      if(list[i]===node){
        break;
      }
    }
    return  i
  }
}

window.dom = dom