const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const config = require("../config.json");
const colors = require("colors");

const globPromise = promisify(glob);

module.exports = async (client) => {
  
    // ---------------------------| Commands:
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
          const properties = { directory, ...file };
          console.log(`[HANDLER] Status: ✅ | Command loaded: ${file.name}.js`)
          client.commands.set(file.name, properties);
        } else {
          console.log(`[HANDLER] Status: ❌ | Couldn't load the command: ${file.name}.js`)
        }
    });
    console.log(`[HANDLER] Successfully loaded ${client.commands.size} commands.`.bold.brightGreen);

    // ---------------------------| Events:
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // ---------------------------| Slash Commands:

       // Check "index.js" and "events" > "interactionCreate.js".

    // ---------------------------| Mongoose:
    const mongooseConnectionString = process.env.MONGO;
    if (!mongooseConnectionString) {
      console.warn("[ERR] Mongo DB URL was not found in secrets.".bold.red);
    } else {
      mongoose.connect(mongooseConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('[MONGO] Connected to mongodb!'.bold.brightGreen)).catch(() => console.warn("[ERR] Mongo DB was found in secrets, But the URL is invalid.".bold.red));
    }

};