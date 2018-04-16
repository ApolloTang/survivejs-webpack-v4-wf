import component from './component'
import _get from 'lodash/get'

import './main.less'
document.body.appendChild(component())



// test es6
class MyClass {
  static x = {'x':'x'}
  constructor() {
    console.log('MyClass instantiated')
  }
}
console.log(_get(MyClass, 'x', ''))

const myClass = new MyClass()

const a = {a:'a'}
const b = {...a}
console.log('b', b)
