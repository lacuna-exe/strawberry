import "dotenv/config";
import { ChannelType, ThreadAutoArchiveDuration } from "discord.js";
import { FatalError } from "../bot/utils/errors.js";

// for easier reading
/* eslint-disable max-len */
/**
 * @property {boolean}   debug      - Whether debug mode is enabled
 * @property {boolean}   verbose    - Whether verbose output is enabled
 * @property {function}  debugOut   - Function to be called for debug output
 * @property {function}  verboseOut - Function to be called for verbose output
 * @property {Snowflake} clientId   - The id of the bot to which application commands are registered, in the form of a Discord Snowflake
 * @property {string}    token      - The token of the bot
 * @property {Snowflake} guild      - Id of a guild to register commands in
 * @property {Object}    channels   - Relevant channels
 * @property {Snowflake} channels.lobby               - The channel unverified users start verification from
 * @property {Snowflake} channels.verifyLogs          - Main log channel for verification logs
 * @property {Snowflake} channels.verifyLogsSecondary - Secondary log channel for verification logs. Currently used for verify kick logs
 * @property {Snowflake} channels.welcome             - Secondary log channel for verification logs. Currently used for verify kick logs
 * @property {Snowflake} channels.general             - General channel
 * @property {Snowflake} channels.introduce           - Channel for self-introductions
 * @property {Object}    roles   - Relevant roles
 * @property {Snowflake} roles.verifier - Verifier: the chief agents of the verification process
 * @property {Snowflake} roles.verified - Verified: the role that is awarded to people who get verified
 * @property {Object}    roles.catagories   - Relevant role catagories
 * @property {Snowflake} roles.catagories.isTrans       - Trans: roles for trans people
 * @property {Snowflake} roles.catagories.isQuestioning - Questioning: roles for trans questioning people
 * @property {Snowflake} roles.catagories.isCis         - Cis: roles for cisgender people
 */
const config = {
  verboseOut: () => {},
  clientId: "",
  token: process.env.TOKEN,
  verifyTicketAutoArchiveDuration: 0,
  privateThread: ChannelType.PublicThread,
  guild: "",
  channels: {
    lobby: "",
    verifyLogs: "",
    verifyLogsSecondary: "",
    welcome: "",
    general: "",
    introduce: "",
  },
  roles: {
    staffRoles: [],
    verifier: "",
    verified: "",
    member: "",
    catagories: {
      isTrans: [""],
      isQuestioning: [""],
      isCis: [""],
    },
  },
};

const production = {
  debugOut: () => {},
  verboseOut: () => {},
  clientId: "1244421306598822024", // theo
  verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
  privateThread: ChannelType.PrivateThread, // test server does not have server premium level for private threads
  guild: "1135300957572431902", // Gender Anarchy
  channels: {
    lobby: "1244418752217485364", // Gender Anarchy - Verify
    verifyLogs: "1244422429468655706", // Gender Anarchy - Verify Logs
    verifyLogsSecondary: "1244422507776446514", // Gender Anarchy - Verify Kick Logs
  },
  roles: {
    staffRoles: [
      // Used for bans and kicks
      "1135440960835309610", // Admin
      "1155319873552003142", // Sr Mod
      "1135428559792508996", // Discord Mod
      "1160658705092714576", // Trial Mod
      "1244425148480749670", // Verifier
    ],
    verifier: "1244425148480749670",
    verified: "1135575202709909575",
    noImages: "1204541395726106686",
    member: "1198798476813811712",
    inactivityPing: "1244425552010678313",
    catagories: {
      isTrans: [
        "1135590332021624854", // Trans
        "1135590440310145054", // Transfem
        "1135590493791731722", // Transmasc
        "1135590532320595988", // Nonbinary
        "1149046767783006279", // Agender
        "1152386445332459540", // Pangender
        "1150941011250516058", // Genderfluid
        "1211388591725346927", // Two Spirited
        "1152386602836951083", // Demiboy
        "1152386528979464213", // Demigrl
        "1152386678086979655", // Demiqueer
      ],
      isQuestioning: [
        "1146451104763228182", // Questioning
      ],
      isCis: [
        "1135590367148908625", // Cis
        "1135590615095189625", // Queer
        "1135590584468385792", // Unlabeled
      ],
    },
  },
};

if (process.env.NODE_ENV === "development") {
  Object.assign(config, development);
} else if (process.env.NODE_ENV === "devServ") {
  Object.assign(config, devServ);
} else if (process.env.NODE_ENV === "production") {
  Object.assign(config, production);
} else {
  throw new FatalError(
    "Invalid value for environmental variable NODE_ENV: Must be either 'development' or 'production'"
  );
}

export default config;
