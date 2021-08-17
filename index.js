// Symbols!

// A symbol is a primitive like a string, number, boolean
// A call to Symbol creates a unique primitive value
const ok = Symbol('ok');
const okString = 'ok';
console.log(ok === okString); // false
console.log(ok.toString() === okString); // false

// Symbols can be used to create hidden-ish, unique properties
const obj = {};
obj[ok] = 1;
// Will not override symbol property
obj[okString] = 2;
console.log(obj); // { ok: 2, [Symbol(ok)]: 1 }

// Symbol property will not show up in for in loop
for (let prop in obj) {
    console.log( `${prop}: ${obj[prop]}`);
}
// Logs: ok: 2

// Symbol property will not show up in Object.keys
console.log(Object.keys(obj)) // [ 'ok' ]


// Another call will create a new unique symbol
const ok2 = Symbol('ok');
console.log(ok === ok2); // false
// Assignment to new property Will not override string prop or other symbol prop
obj[ok2] = 3;
console.log(obj); // { ok: 2, [Symbol(ok)]: 1, [Symbol(ok)]: 3 }


// But what if you want to override?
// For that, you need to create and override with Symbol.for
const ok3 = Symbol.for('ok');
// Still a new symbol; will not override any of the previous
obj[ok3] = 4
console.log(obj); // { ok: 2, [Symbol(ok)]: 1, [Symbol(ok)]: 3, [Symbol(ok)]: 4 }

// Before creating a new symbol, the following assignment will first search for existing symbols and update if found
const ok4 = Symbol.for('ok');
// The following assignment will override obj[ok3]
obj[ok4] = 5;
console.log(obj); //{ ok: 2, [Symbol(ok)]: 1, [Symbol(ok)]: 3, [Symbol(ok)]: 5 }


/*
    Why would you use a Symbols?
        * Add descriptive meta properties to DOM elements or other objects
        * Hide a property from loops/keys
        * Prevent collision of string constants
        * JS library authors use them all the time for backwards compatibility
*/

// Sample use case
const noData = Symbol('noData');
// Pretend we fetch data here and get one of the following responses
const data = { message: 'Good job', bids: [] };
// const data = { message: 'Good job', bids['Hi']};
// const data = null;
if (data && data.bids && !data.bids.length) {
    data[noData] = true;
}
// Later in the code
if (data && data[noData]) {
    console.log('Show empty state'); 
} else if (data) {
    console.log('Show data')
} else {
    console.error('Show error')
}

// Sure, we could have used a check for the length of bids, but it might be nice to have a standard way to indicate the absence of data
