# Understanding async/await

If you aren't very familiar with ECMAScript 2017, you may not know about async/await. It's a useful way to handle Promises in a hoisted manner. It's also slightly faster and increases overall readability.

## How do Promises work?

Before we can get into async/await, you should know what Promises are and how they work because async/await is just a way to handle Promises. If you know what Promises are and how to deal with them, you can skip this part. 

Promises are a way to handle asynchronous tasks in JavaScript; they are the newer alternative to callbacks. A Promise has many similarities to a progress bar; they represent an unfinished and ongoing process. An excellent example of this is a request to a server (e.g., discord.js sends requests to Discord's API).

A Promise can have three states; pending, resolved, and rejected

The **pending** state means that the Promise still is ongoing and neither resolved nor rejected.
The **resolved** state means that the Promise is done and executed without any errors.
The **rejected** state means that the Promise encountered an error and could not execute correctly.

One important thing to know is that a Promise can only have one state simultaneously; it can never be pending and resolved, rejected and resolved, or pending and rejected. You may be asking, "How would that look in code?". Here is a small example:

::: tip
This example uses ES6 code. If you do not know what that is, you should read up on that [here](/additional-info/es6-syntax.md).
:::

```js
function deleteMessages(amount) {
	return new Promise(resolve => {
		if (amount > 10) throw new Error('You can\'t delete more than 10 Messages at a time.');
		setTimeout(() => resolve('Deleted 10 messages.'), 2000);
	});
}

deleteMessages(5).then(value => {
	// `deleteMessages` is complete and has not encountered any errors
	// the resolved value will be the string "Deleted 10 messages"
}).catch(error => {
	// `deleteMessages` encountered an error
	// the error will be an Error Object
});
```

In this scenario, the `deleteMessages` function returns a Promise. The `.then()` method will trigger if the Promise resolves, and the `.catch()` method if the Promise rejects. But with our function, we resolve the Promise after 2 seconds with the String "Deleted 10 messages.", so the `.catch()` method will never be executed. You can also pass the `.catch()` function as the second parameter of `.then()`.

## How to implement async/await

### Theory

The following information is essential to know before working with async/await. You can only use the `await` keyword inside a function declared as `async` (you put the `async` keyword before the `function` keyword or before the parameters when using a callback function). 

A simple example would be:

```js
async function declaredAsAsync() {
	// ...
}
```

or

```js 
const declaredAsAsync = async () => {
	// ...
};
```

You can use that as well if you use the arrow function as an event listener.

```js
client.on('event', async (first, last) => {
	// ...
});
```

An important thing to know is that a function declared as `async` will always return a Promise. In addition to this, if you return something, the Promise will resolve with that value, and if you throw an error, it will reject the Promise with that error.

### Execution with discord.js code

After knowing how Promises work and what they are for, as well as the theory, let's look at an example in which we'll handle multiple Promises. Let's say you want to react with letters (regional indicators) in a specific order. For this example, you will take the basic template for a discord.js bot with some ES6 adjustments.

```js
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '?';

client.once('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if (message.content === `${prefix}react`) {
		// ...
	}
});

client.login('your-token-goes-here');
```

So now we need to put the code in. If you don't know how Node.js asynchronous execution works, you would probably try something like this:

```js {3-5}
client.on('message', message => {
	if (message.content === `${prefix}react`) {
		message.react('🇦');
		message.react('🇧');
		message.react('🇨');
	}
});
```

But since all of these react methods are started at the same time, it would just be a race to which server request finished first, so there would be no guarantee that it would react in the order you wanted it to. In order to make sure it reacts in order (a, b, c), we need to use the `.then()` callback from the Promises that these methods return. As a result the code we want would mostly look like this:

```js {3-8}
client.on('message', message => {
	if (message.content === `${prefix}react`) {
		message.react('🇦')
			.then(() => message.react('🇧'))
			.then(() => message.react('🇨'))
			.catch(error => {
				// handle failure of any Promise rejection inside here
			});
	}
});
```

In this piece of code, we [chain resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#Chaining) Promises with each other, and if one of the Promises gets rejected, the function we passed to `.catch()` get called. So let's look at how the same code would look with async/await.

```js {1,3-5}
client.on('message', async message => {
	if (message.content === `${prefix}react`) {
		await message.react('🇦');
		await message.react('🇧');
		await message.react('🇨');
	}
});
```

That would mostly be the same code with async/await, but how do we catch Promise rejections now since we won't use `.catch()` anymore? That is also a useful feature with async/await; the error will be thrown if you await it so that you can wrap the awaited Promises inside a try/catch, and you're good to go. 

```js {1,3-9}
client.on('message', async message => {
	if (message.content === `${prefix}react`) {
		try {
			await message.react('🇦');
			await message.react('🇧');
			await message.react('🇨');
		} catch (error) {
			// handle failure of any Promise rejection inside here
		}
	}
});
```

This code looks clean and is also easy to read.

So you may be asking, "How would I get the value the Promise resolved with?".

Let's look at an example where you want to delete a sent message.

<branch version="11.x">

```js {2-8}
client.on('message', message => {
	if (message.content === `${prefix}delete`) {
		message.channel.send('this message will be deleted')
			.then(sentMessage => sentMessage.delete(10000))
			.catch(error => {
				// handle error
			});
	}
});
```

</branch>
<branch version="12.x">

```js {2-8}
client.on('message', message => {
	if (message.content === `${prefix}delete`) {
		message.channel.send('this message will be deleted')
			.then(sentMessage => sentMessage.delete({ timeout: 10000 }))
			.catch(error => {
				// handle error
			});
	}
});
```

</branch>
The return value of a `.send()` is a Promise what resolves with the sent Message object, but how would the same code with async/await look?

<branch version="11.x">

```js {1,3-8}
client.on('message', async message => {
	if (message.content === `${prefix}delete`) {
		try {
			const sentMessage = await message.channel.send('This message will be deleted in 10 seconds.');
			await sentMessage.delete(10000);
		} catch (error) {
			// handle error
		}
	}
});
```

</branch>
<branch version="12.x">

```js {1,3-8}
client.on('message', async message => {
	if (message.content === `${prefix}delete`) {
		try {
			const sentMessage = await message.channel.send('This message will be deleted in 10 seconds.');
			await sentMessage.delete({ timeout: 10000 });
		} catch (error) {
			// handle error
		}
	}
});
```

</branch>

With async/await, you can assign the awaited function to a variable representing the returned value. Now you know how you use async/await.
