import component from "./component"

import './main.less'
document.body.appendChild(component())


// test es6
class MyClass {
  static x = {'x':'x'}
  constructor() {
    console.log('MyClass instantiated')
  }
}
console.log(MyClass.x)
const myClass = new MyClass()

const a = {a:'a'}
const b = {...a}
console.log('b', b)
