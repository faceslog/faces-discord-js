module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async(client, message, args) => {
        const msg = await message.channel.send(`Testing Your Ping ...`);
        msg.edit(
            `:signal_strength: Your Ping is ${Math.abs(Math.floor(
        msg.createdAt - message.createdAt
      ) - Math.round(client.ws.ping))}ms\n:desktop: API Latency ${Math.round(client.ws.ping)}ms`
        );
    }
}