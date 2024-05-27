import { Events } from 'discord.js';
import config from '../../config/config.js';
import Event from '../Event.js';

const userMap = new Map();

/**
 * Handler for messageCreate event
 */
class MessageCreate extends Event {
    /**
     * @param {Client} client The Discord Client that will handle this interaction
     * @param {String} name The name of this interaction
     */
    constructor(client, name = Events.MessageCreate) {
        super(client, name);
    }

    /**
     * Looks up the interaction from the interaction's client and runs it.
     * @param {Message} message The interaction whose creation triggered this event
     */
    async run(message) {
        if (
            message.author.bot
            || message.channel.type !== 12
            || !message.channel.parent
            || message.channel.parent.id !== config.channels.lobby
        ) {
            return;
        }

        if (message.member.roles.cache.has(config.roles.verified)) { return; }
        userMap.set(message.author.id, message.id);

        setTimeout(async () => {
            if (userMap.get(message.author.id) === message.id) {
                userMap.delete(message.author.id);

                const thread = await message.channel.parent.threads.fetch(message.channel);
                if (thread && !thread.archived) {
                    const messages = await message.channel.messages.fetch({ limit: 50 });

                    // Check if there is a reminder message
                    if (messages.some((m) => m.webhookId && m.content.includes('[Reminder]'))) {
                        return;
                    }

                    const components = messages.filter((m) => m.author.id === config.clientId
                        && m.components.length > 0);

                    if (components.size > 0
                        && !components
                            .every((m) => m.components[0].components
                                .some((c) => c.data.disabled === true))) {
                        const webhooks = await message.channel.parent.fetchWebhooks();

                        if (!webhooks.size) {
                            await message.channel.parent.createWebhook({
                                name: 'Verification Caitlin Proxy',
                            });
                        }

                        const webhook = (await message.channel.parent.fetchWebhooks()).first();

                        await webhook.send({
                            content: `\`[Reminder]\`\n${message.author} Please make sure to click the \`"Finished Answering!"\` or \`"I Need Help Please."\` buttons at the top of the channel after you've finished answering to complete the verification process. ^^`,
                            username: 'Caitlin ♡ [She/Her]',
                            avatarURL: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5338ca53-41c2-462d-be16-6526b3fc62e4/de8nmsp-a45871f4-82e5-49b3-8e7c-86968edf307b.png/v1/fill/w_894,h_894,q_70,strp/new_canvas______2__by_nradiowave_de8nmsp-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzUzMzhjYTUzLTQxYzItNDYyZC1iZTE2LTY1MjZiM2ZjNjJlNFwvZGU4bm1zcC1hNDU4NzFmNC04MmU1LTQ5YjMtOGU3Yy04Njk2OGVkZjMwN2IucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.SHs-1WN4BcMz1NjJF8Q9K51Tigfak2GaTxZwWqy_I4A',
                            threadId: message.channel.id,
                        });
                    }
                }
            }
        }, 900000);
    }
}

export default MessageCreate;
