import component from './component'
import fontAwesome from './font-awesome'

import _get from 'lodash/get'

import './assets/fonts/index.js'  // this bootstrap font system
import './main.less'
document.body.appendChild(component())
document.body.appendChild(fontAwesome)



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
