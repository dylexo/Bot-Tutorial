const { Client, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({disableEveryone: true});
client.commands = new Collection();

const TOKEN = "PUT YOUR BOT TOKEN HERE"

client.on("ready" () => {
  console.log(`${client.user.username} rocket arrived on Mars!`);
  client.user.setActivity(`${cliet.guilds.size} Servers`);
}
          
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("There isn't any command to load!");
    return;
  }
  console.log(`Loading ${jsfile.length} commands!`);

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} command has loaded!`);
    client.commands.set(props.help.name, props);
  });
});

          
client.on("message", async message => {
   if (message.author.bot) return; 
   if (message.channel.type === "dm") return;

   let prefix = "!"
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0].toLowerCase();
   let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client, message, args);
}

client.login(TOKEN);