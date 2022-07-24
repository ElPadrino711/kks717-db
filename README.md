<h1 align='center'>@kks717/db</h1>

- [Examples](#examples)
	- [Database](#keyvalue)
		- [Setup](#setup)
		- [Set](#set)
		- [Get](#get)
		- [Delete](#delete)
		- [Has](#has)
		- [Size](#size)
		- [Data](#data)
		- [Save](#save)
		- [Start](#start)

## Examples

### Database

#### Setup

```js
const { Database } = require('@kks717/db');

const db = new Database({
	path: './database', // Database path.
	tables: ['main'], // Database tables.
	extension: '.json', // File extension.
	split_object: '.', // Split object.
	auto_save: true // Autosave?
});

db.on('ready', () => {
    console.log('Database Ready!!!')
});

db.start();

// Do your things after this
```

 #### Set
 ```js
 db.set('main', 'something', 'Hello');

// main: { "something": "Hello" }
 ```

 #### Get
 ```js
 db.get('main', 'something');

 // Returns "Hello"
 ```

 #### Delete
 ```js
 db.delete('main', 'something');

 // main: {}
 ```

 #### Has
```js
db.has('main', 'something');

// Returns false
```
#### Size
```js
db.size('main');
// 0

db.set('main', 'something', 'Hello');
// main: { "something": "Hello" }

db.size('main');
// 1
```

#### Data
```js
db.data('main');
// { something: 'Hello' }
```

#### Save
```js
db.set('main', 'something', 'Hello');
// <Database>.data is modified but not the file

db.save();
// Saves the data
```

#### Start
```js
db.start()

// Only use once
```