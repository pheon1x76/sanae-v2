module.exports = {
	name: "channel-info",
	description: "Shows info about the current channel.",
	execute(message) {
		message.channel.send(`Channel Name: ${message.channel.name}\nChannel Description: ${message.channel.topic}`);
	},
};