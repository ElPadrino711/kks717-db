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
		- [Ping](#ping)

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
 db.set('something', 'Hello', 'main');

// main: { "something": "Hello" }
 ```

 #### Get
 ```js
 db.get('something', 'main');

 // Returns "Hello"
 ```

 #### Delete
 ```js
 db.delete('something', 'main');

 // main: {}
 ```

 #### Has
```js
db.has('something', 'main');

// Returns false
```
#### Size
```js
db.size('main');
// 0

db.set(something', 'Hello', 'main');
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
db.set('something', 'Hello', 'main');
// <Database>.data is modified but not the file

db.save('main');
// Saves the data
```

#### Start
```js
db.start()

// Only use once
```

#### Ping
```js
db.ping()

// number
```