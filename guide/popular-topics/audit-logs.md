# Working with Audit Logs

## Some quick background
Audit logs are an excellent moderation tool offered by Discord to know what happened in a server and usually by whom. At the moment, these are the only method to help you determine who the executor of a mod action was on the server. Relevant events such as `messageDelete` and `guildMemberLeave` unfortunately do not provide info on the moderation actions having triggered them, making the fetch for audit logs a necessity.

There are quite a few cases where you may use audit logs. This guide will limit itself to the most common use cases. Feel free to consult the [relevant Discord API page](https://discord.com/developers/docs/resources/audit-log) for more information.

::: warning
It is crucial that you first understand two details about audit logs:
1) They are not guaranteed to arrive when you expect them (if at all).
2) There is no event which triggers when an audit log is created.
:::

Let us start by glancing at the `fetchAuditLogs` method and how we want to work with it. Like many discord.js methods, it returns a Promise containing what we want–the GuildAuditLogs object. In most cases, only the `entries` property will be of interest, as it holds a collection of GuildAuditLogsEntry objects, and consequently, the information we usually want. You can always take a look at the options <docs-link path="class/Guild?scrollTo=fetchAuditLogs">in the discord.js docs</docs-link>.

The following examples will explore a straightforward case for some auditLog types. Some basic error handling is performed, but these code segments are by no means foolproof and are meant to teach you how fetching audit logs work. You will most likely need to expand on the examples based on your own goals for a rigorous system.

## Who deleted a message?
Let us dive right into it with probably the most common use of audit logs, understanding who deleted any given message in a Discord server.

::: warning
At the time of writing, Discord does not emit an audit log if the person who deleted the message is a bot deleting a single message or is the author of the message itself.
:::

For now, we will look only at the `messageDelete` event.

```js
client.on('messageDelete', message => {
	console.log(`A message by ${message.author.tag} was deleted, but we don't know by who yet.`);
});
```

So far, nothing should seem new or complicated. We get the message deleted event and log that a message was removed from a channel. We could use more information from the message object, but that is left as an exercise for the reader.

For our interests, we will set a fetch limit of 1 and only care about the type `MESSAGE_DELETE`.

Placing this into the previous code, we get the following. Note that we will also make the function async to make use of `await`. As well, we will make sure to ignore DMs.

```js {2-9,11-12,14-16,18-25}
client.on('messageDelete', async message => {
	// Ignore direct messages
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Let's perform a coherence check here and make sure we got *something*
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

	// We now grab the user object of the person who deleted the message
	// Let us also grab the target of this action to double-check things
	const { executor, target } = deletionLog;

	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same author's message
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
	} else {
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
	}
});
```

With this, we now have a very simple logger telling us who deleted a message authored by another person.

## Who kicked a user?

Similar to the `messageDelete` case, let's look at the `guildMemberRemove` event.

```js
client.on('guildMemberRemove', member => {
	console.log(`${member.user.tag} left the guild... but was it of their own free will?`);
});
```

We will again fetch audit logs while limiting ourselves to 1 entry and looking at the `MEMBER_KICK` type.

```js {2-7,9-10,12-14,16-22}
client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const kickLog = fetchedLogs.entries.first();

	// Let's perform a coherence check here and make sure we got *something*
	if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

	// We now grab the user object of the person who kicked our member
	// Let us also grab the target of this action to double-check things
	const { executor, target } = kickLog;

	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same kicked member
	if (target.id === member.id) {
		console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
	} else {
		console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
	}
});
```

## Who banned a user?

The logic for this will be very similar to the above kick example, except that this time we have an event specifically for guild bans, that is `guildBanAdd`.

```js
client.on('guildBanAdd', async (guild, user) => {
	console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}.`);
});
```

As was the case in the previous examples, we can see what happened, to whom it happened, but not who executed the action. Enter once again audit logs to limit ourselves to 1 entry and look at the `MEMBER_BAN_ADD` type. Our `guildBanAdd` listener then becomes.

```js {2-7,9-10,12-14,16-22}
client.on('guildBanAdd', async (guild, user) => {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const banLog = fetchedLogs.entries.first();

	// Let's perform a coherence check here and make sure we got *something*
	if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

	// We now grab the user object of the person who banned the user
	// Let us also grab the target of this action to double-check things
	const { executor, target } = banLog;

	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same kicked member
	if (target.id === user.id) {
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
	} else {
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
	}
});
```
