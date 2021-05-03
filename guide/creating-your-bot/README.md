# Getting your bot up & running

We're finally getting to the exciting parts! Since your bot is in your server now, the next step is to start coding and get it online!

## Creating the bot file

Open up your preferred code editor (whether it be [Visual Studio Code](https://code.visualstudio.com/), [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), or any other editor of your choice) and create a new file. If you're brand new and aren't sure what to use, go with Visual Studio Code.

We suggest that you save the file as `index.js`, but you may name it whatever you wish, as long as it ends with `.js`.

::: tip
You can quickly create a new file using the `Ctrl + N` shortcut on your keyboard and then using `Ctrl + S` to save the file.
:::

## Logging in to Discord

Once you've created a new file, do a quick check to see if you have everything setup correctly. Copy & paste the following code into your file and save it. Don't worry if you don't understand it right away—we explain more in-depth after this.

```js
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login('your-token-goes-here');
```

Head back to your console window, type in `node your-file-name.js`, and press enter. If you see the `Ready!` message after a few seconds, you're good to go! If not, try going back a few steps and make sure you followed everything correctly.

::: tip
Don't feel like typing the file name each time? Open up your `package.json` file, look for something like `"main": "index.js"`, and change `"index.js"` to whatever your file name is. After saving, you can run the `node .` shortcut in your console to start the process!
:::

### Start-up code explained

Here's the same code with comments, so it's easier to understand what's going on.
```js
// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login('your-token-goes-here');
```

Although it's not a lot, it's good to know what each bit of your code does. But, as it currently is, this won't do anything. You probably want to add some commands that run whenever someone sends a specific message, right? Let's get started on that, then!

## Listening for messages

First, make sure to close the process in your console. You can do so by pressing `Ctrl + C` inside the console. Go back to your code editor and add the following piece of code above the `client.login()` line.

```js
client.on('message', message => {
	console.log(message.content);
});
```

Notice how the code uses `.on` rather than `.once` like in the ready event. This means that it can trigger multiple times. Save the file, go back to your console, and start the process up again. Whenever a message is sent inside a channel your bot can access, the console will log the message's content. Go ahead and test it out!

::: tip
Inside your console, you can press the up arrow on your keyboard to bring up the latest commands you've run. Pressing `Up` and then `Enter` after closing the process is a convenient, quick way to start it up again (instead of typing out the name each time).
:::

## Replying to messages

Logging to the console is great and all, but it doesn't provide any feedback for the end-user. Let's create a basic ping/pong command before you move on to making real commands. Remove the `console.log(message.content)` line from your code and replace it with the following:

```js {2-5}
client.on('message', message => {
	if (message.content === '!ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}
});
```

Restart your bot and then send `!ping` to a channel your bot has access to. If all goes well, you should see something like this:

<div is="discord-messages">
	<discord-message profile="user">
		!ping
	</discord-message>
	<discord-message profile="bot">
		Pong.
	</discord-message>
</div>

You've successfully created your first Discord bot command! Exciting stuff, isn't it? This is only the beginning, so let's move on to making some more commands.

## Resulting code

<resulting-code path="creating-your-bot/up-and-running" />
