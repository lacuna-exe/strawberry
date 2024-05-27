import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    messageLink,
} from 'discord.js';
import config from '../config/config.js';

// TODO: format all the discord links create components
// TODO: pull this out to a handler

const rulesEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('Rules')
    .addFields(
        {
            name: '`1`. **Be Civil & Respectful.**',
            value:
                '> Treat others with kindness and respect at all times. Do not lie about your age. Lying about age is a instant ban always. Avoid offensive behavior, personal attacks, and disrespectful language. Disagreements are acceptable, but keep discussions constructive and avoid being overly confrontational. [Read More](https://canary.discord.com/channels/1135300957572431902/1244419116098650184)',
        },
        {
            name: '`2`. **No Spam or Self-Promotion.**',
            value: '> Do not flood the server with irrelevant or repetitive messages. Self-promotion, such as sharing links or content related to external products or services, is only allowed if explicitly approved by the server administrators. This includes the promotion or offering invites to other discord servers. Even if you yourself don\'t own it. It still is promoting another discord server, and forbidden.',
        },
        {
            name: '`3`. **No Doxxing or Sharing Personal Info.**',
            value: '> Sharing personal information of any user without their consent is strictly prohibited. This includes real names, addresses, contact details, or any other private information.',
        },
        {
            name: '`5`. **No Breaking the Discord TOS or Community Guidelines.**',
            value: '> Being under 13 is [not allowed](<https://support.discord.com/hc/en-us/articles/360040724612-Why-is-Discord-asking-for-my-birthday>). Furthermore discussions or sharing of any illegal content, including but not limited to malicious software, illegal drugs, or any other illicit activities, are also not allowed in the server.',
        },
        {
            name: '`6`. **Absolutely No Bigotry.**',
            value: '> There is a zero-tolerance policy towards any form of bigotry. This includes transphobia, homophobia, racism, sexism, and any discriminatory attitudes towards individuals based on their identity or orientation.',
        },
        {
            name: '`7`. **No Pedophilia Apologism.**',
            value: '> Under no circumstances should pedophilia be normalized or defended. This includes any attempts to compare it favorably to non-heterosexual sexualities or discussions involving drawn/animated child pornography. No slurs in ANY way.',
        },
        {
            name: '`8.` **Age-Appropriate Content Only.**',
            value: '> Please avoid sharing any suggestive or explicit content, as well as engaging in explicit discussions. We have minors in our community, and such content shouldn\'t be seen by minors. **Breaking rule 8 will result in 2 warns as it is a serious offense.** [Read More](https://canary.discord.com/channels/1135300957572431902/1244419061270712361)',
        },
        {
            name: '`9.` **Please keep stuff to the right channels.**',
            value: '> Venting in venting channels, VC Related chat in no mic or the voice call channel itself, etc\n> This includes Mention of commiting, Anything to do with Eating Disorders, Suicide, Self harm.',
        },
        {
            name: '`10.` **Do not spam the any of the ping roles.**',
            value: '** **',
        },
        {
            name: '`11.` **Do not Minimod.**',
            value: '> Mini-modding is against the guidelines because it gets in the way of actual mods doing their job. If every user started taking on the position of a mod without the proper tools to do so, it would be chaos. Here is why Minimodding is bad [Example on why its bad and what it is by Hypixel ](<https://hypixel.net/threads/3370860/>) ',
        },
        {
            name: '`12.` **Do not impersonate other users without their permission.**',
            value: '> It can cause others to become uncomfortable. Additionally users should be allowed to control their own image.',
        },
        {
            name: '`13.` **Respect plural members, and only use PK for our allowed use cases.**',
            value: '> If you see users talking with the bot tag, they\'re talking through PluralKit. Due to Discord limitations, these messages will show up with the [BOT] tag - however, they are not bots, they are users. Additionally, PluralKit is not for any form of roleplay. Any form of discrimination or hate against alters will be met with a ban, all forms and origins of plurality are accepted here.\n> All users of an account are responsible for its conduct. This includes plural users. It is up to the collective users of an account to be responsible for what happens on their account.',
        },
        {
            name: '`14.` **Moderator Discretion.**',
            value: '> Used by moderators when something is not strictly against the rules, but is blatantly wrong.',
        },
        {
            name: '`15.` **Keep #lies to harmless fun.**',
            value: '> Please avoid venting in ⁠lies. we have serious channels if you need to vent somewhere, but please keep it out of the general channels because it can be triggering.',
        },
        {
            name: '`16.` **Keep all conversations in English.**',
            value: '> Short phrases or jokes in another language are allowed, but we cannot effectively moderate non-English extensive discussions.',
        },
        {
            name: '`17.` **This server uses automod to block messages deemed nsfw, violent, or triggering. Do not circumvent the automod.**',
            value: '** **',
        },
        {
            name: '`18.` **The most important one.**',
            value: '> If you haven\'t already make sure to check out our subreddit https://www.reddit.com/r/GenderAnarchy/ <3',
        },
        {
            name: '** **\n**By joining this server you agree to the following guidelines**',
            value: '[Discord ToS](https://discord.com/terms)\n[Discord Community Guidelines](https://discord.com/guidelines)',
        },
    )
    .setImage('https://i.imgur.com/CBbbw0d.png'); // tiny image that ensures constant embed width

const notesReportEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('Notes / Report to staff')
    .setDescription('**Please be the bigger person**—if you see someone trying to start a fight, don\'t fight back; DM staff. Similarly, if you see anything that may cause issues or someone possibly willingly causing them, don’t try to argue them into submission. *Don’t feed the trolls, nor your own trauma responses*.\n\nIf you see something against the rules or something that makes you feel unsafe, let staff know. We want this space to be as inclusive and safe as possible. \n\n**To do this:**\n`Right-Click A Message > Apps > Report Message`\n\n***This directly reports the message to our server staff for us to best handle the situation as fast as possible <3 ***\n\n> *This does not report the message to discord, just our server staff*')
    .setImage('https://i.imgur.com/jxEcGvl.gif')
    .setFooter({
        text: 'If you are ever unsure if something is allowed, feel free to ask.',
    });

const mentalHealthEmbed = new EmbedBuilder()
    .setColor(0xDF585B)
    .setTitle('🔴 IMPORTANT 🔴')
    .setDescription('We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications to render proper assistance with mental health issues, nor are we able to give professional advice. Thank you for understanding ❤️')
    .setImage('https://i.imgur.com/CBbbw0d.png');

function buildWelcomeComponents(client, magicMessage) {
    /* Magic number. Appears to be the id of a message sent before the current welcome message.
       From original Theo code */

    return [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(messageLink(config.channels.lobby, magicMessage, config.guild))
                    .setLabel('Scroll To Rules!')
                    .setStyle(ButtonStyle.Link),
                client.getButton('startVerification'),
            ),
    ];
}

const welcomeEmbeds = [
    rulesEmbed,
    notesReportEmbed,
    mentalHealthEmbed,
];

export {
    welcomeEmbeds,
    buildWelcomeComponents,
};
