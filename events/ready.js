const client = require("../index");
const config = require("../config.json")
const Database = require("@replit/database");
const db = new Database();
const colors = require("colors");

client.on("ready", () => {
 console.log(`[CLIENT] ${client.user.tag} is up and ready to go!`.bold.brightGreen);
  
  db.get("client_status").then(status => {
    try {
      client.user.setStatus(status.toLowerCase() || "online");
    } catch (e) {
      client.user.setStatus("online");
    }
  });

  db.get("client_activity").then(activity => {
    client.user.setActivity(activity || `${config.prefix}help`, { type: "WATCHING"});
  });
  
});