const JQueryMethod = function(selectorOrArrayOrTemplate){      
  //当前dom元素
 let elements;
 if(typeof selectorOrArrayOrTemplate==="string"){
  if(selectorOrArrayOrTemplate[0]==="<"){
    //标签属性+内容
    elements = [createElement(selectorOrArrayOrTemplate)]
  }else{
    // 基础选择器
    elements = document.querySelectorAll(selectorOrArrayOrTemplate)
  }
 }else if(selectorOrArrayOrTemplate instanceof Array){
    // 获取模板数组
    elements = selectorOrArrayOrTemplate
 }

 function createElement(string){
  //生成一个文档片段
  const container = document.createElement("template")
  //把文档片段的内容设置为标签相关内容
  container.innerHTML = string.trim()
  //获取设置的文档内容 container.content.firstChild
  return container.content.firstChild
 }

 //保留Jquery原型对象的自带方法:const api = {__proto__: jQuery.prototype}
 const api = Object.create(jQuery.prototype)
 Object.assign(api,{
  elements:elements,
  oldApi:selectorOrArrayOrTemplate.oldApi
 })
 return api
}

JQueryMethod.fn = JQueryMethod.prototype = {
  //模拟jquery的写法（jquery:可以指定版本号）
  constructor:jQuery,//指定构造函数
  jquery:true,
  //获取到第几个元素
  get(index){
    return this.elements[index]
  },
  appendTo(node){
    if(node instanceof Element){
      this.each(el=>node.appendChild(el))
    }else if(node.jquery===true){
      this.each(el=>node.get(0).appendChild(el))
    }
  },
  append(children){
    if(children instanceof Element){
      this.get(0).appendChild(children)
    }else if(children instanceof HTMLCollection){
      for(let i=0;i<children.length;i++){
        this.get(0).appendChild(children[i])
      }
    }else if(children.jquery===true){
      children.each(node=>this.get(0).appendChild(node))
    }
  },
  find(selector){
    let array = []
    this.each(e=>{
      array = array.concat(Array.from(e.querySelectorAll(selector)))
    })
    return jQuery(array)
  },
  each(fn){
    for(let i=0;i<this.elements.length;i++){
      //指向window
      fn.call(null,this.elements[i],i)
    }
    return this
  },
  addClass(className){
    this.each(e=>{
      e.classList.add(className)
    })
    return this
  },
  parent(){
    const array = []
    this.each(node=>{
      if(array.indexOf(node.parentNode)===-1){
        array.push(node.parentNode)
      }
    })
    return jQuery(array)
  },
  children(){
    const array = []
    this.each(node=>{
      if(array.indexOf(node.parentNode)===-1){
        array.push(...node.children)
      }
    })
    return jQuery(array)
  },
  html(string){
    if(typeof string === 'string'){
      this.each(e=>e.innerHTML=string)
      return this
    }else if(this,jQuery===true){
      return this.get(0).innerHTML
    }
  },
  text(string){
    if(typeof string==="string"){
      this.each(e=>{
        if('textContent' in e){
          e.textContent = string
        }else{
          e.innerText = string
        }
      })
      return this
    }else if(this.jquery === true){
      const array = []
      this.each(e=>{
        if('textContent' in e){
          array.push(e.textContent)
        }else{
          array.push(e.innerText)
        }
      })
      return array
    }
  },
  print(){
    console.log(this.elements)
  },
  end(){
    return this.oldApi
  }
}

window.$ = window.jQuery = JQueryMethod