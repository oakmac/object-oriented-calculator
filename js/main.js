// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// IMPORTANT: do not modify this file!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/* global Calculator */

// a user can have multiple Calculator instances on the page
// each calculator instance is separate from one another
let calculator1 = new Calculator('calc1Container')
let calculator2 = new Calculator('calc2Container')
let calculator3 = new Calculator('calc3Container')
let calculator4 = new Calculator('calc4Container')
let calculator5 = new Calculator('calc5Container')

// calculator objects have the "press" method
calculator1.press('5')
calculator1.press('+')
calculator1.press('3')
calculator1.press('=')
// after this string of commands, the calculator should be showing "8"

// the .value() method returns a number value after '=' has been pressed
console.assert(calculator1.value() === 8)
// or null if the calculator is not showing a value currently
console.assert(calculator2.value() === null)

// A calculator can be in a "locked" state.
// Button presses should have no effect if the calculator is locked.
// The "locked" state should look visually disabled.
calculator2.lock()
calculator2.press('9') // this command should do nothing
console.assert(calculator2.value() === null)
setTimeout(function () {
  calculator2.unlock()
  calculator2.press('8') // this command should work
}, 5000)

// you should be able to pass numbers to the .press() method
// also there is the .pressButton() method which is an alias of .press()
// ie: they do the same thing
calculator3.press(4)
calculator3.pressButton('-')

// the .press() method should ignore anything that is not a valid button
calculator3.press('45') // this should do nothing

// the calculator should have a .toString() method that returns what is showing
// on the screen
console.assert(calculator3.toString() === '4 -')

// there should be an Easter Egg method called .sayHello() that clears whatever
// is on the screen and sets it to "0.7734" (hello upside down)
// Note: the calculator should work after this is called, for example:
calculator4.press('3')
calculator4.press('+')
calculator4.sayHello()
calculator4.press('+')
calculator4.press('1')
calculator4.press('=')
console.assert(calculator4.value() === 1.7734)

// calculators can be completely removed from the DOM after calling the .destroy()
// method
setTimeout(calculator3.destroy, 8 * 1000)

// the calculator should ignore any input that does not make sense
// ie: just like a real calculator
calculator5.press('3')
calculator5.press('.')
calculator5.press('.')
calculator5.press('2')
calculator5.press('+')
calculator5.press('7')
console.assert(calculator5.toString() === '3.2 + 7')

// TODO:
// - write .press() methods and then console.assert their .value()
// - setInterval lock/unlock a calculator every 1 seconds
