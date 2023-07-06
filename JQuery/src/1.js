window.$ = window.jQuery = function(selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // 创建 div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      // 查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  // api 可以操作elements
  const api = Object.create(jQuery.prototype);// 创建一个对象，这个对象的 __proto__ 为括号里面的东西
  // const api = {__proto__: jQuery.prototype}
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi
  });
  // api.elements = elements
  // api.oldApi = selectorOrArrayOrTemplate.oldApi
  return api
};

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
  get(index) {
    return this.elements[index];
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each(el => node.appendChild(el));
    } else if (node.jquery === true) {
      this.each(el => node.get(0).appendChild(el));
    }
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each(node => this.get(0).appendChild(node));
    }
  },
  find(selector){
    let array = [];
    this.each((e)=>{
      array = array.concat(Array.from(e.querySelectorAll(selector)));
    });
    return jQuery(array)
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each(node => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each(node => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(...node.children);
      }
    });
    return jQuery(array);
  },
  html(string){
      if(typeof string === 'string'){
        this.each(e =>e.innerHTML = string);
        return this;
      }else if(this.jquery === true){
        return this.get(0).innerHTML
      }
  },
  text(string){
    if(typeof string === 'string'){
    this.each(e =>{
      if('innerText' in e){
        e.innerText = string;
      }else{
        e.textContent = string;
      }
    });
      return this;
    }else if(this.jquery === true){
      const array = [];
    this.each(e =>{
      if('innerText' in e){
        array.push(e.innerText);
      }else {
        array.push(e.textContent);
      }
    });
      return array;
    }
  },
  print() {
    console.log(this.elements);
  },
  // 闭包：函数访问外部的变量
  addClass(className){
    this.each((e)=>{
      const element = e;
      element.classList.add(className);
    });
    return this;
  },
  end() {
    return this.oldApi; // this 就是新 api
  }
};