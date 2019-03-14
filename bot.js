const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

const prefix = "-";
const token = "NTU1ODIxOTM4MzY3NTI4OTY1.D2xBMw.7epMwngMhKC8spd5T2C7wsEjk9c";

client.on("ready", () => {
  console.log("Vulnix | Logged in! Server count: ${client.guilds.size}");
  client.user.setGame(`Support Berlin |${prefix}new`);
});


client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: Vulnix Help`)
    .setColor(#f784f2)
    .setDescription(`مرحبآ ، انا رآمي ، بوتنأ يحتوي على أكثر من كومند نستعرضها لكم : `)
    .addField(`التذكرة`[${prefix}new]() > لفتح تذكرة من أجل المسآعددة\n[${prefix}close]() > لغلقق تذكرة مأ فتحتهأ`)
    .addField(`أشيآء أخرى`, `[${prefix}help]() > لرؤية مآ يحتويه البوت من أوآمر`)
    message.channel.send({ embed: embed });
  }
if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(` نت معك تكت أصلآ`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`لقد تم إنشآء تذكرتك, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`مرحبآ ${message.author.username}!`, نرجوأ منك كتابة مشكلتك مع عدم ازعاج الادارة فضلا و ليس امرآ`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`لآ يمكنك تقفيل تذكرة إلآ اذا كنت فيهأ.`);

    message.channel.send(`هل أنت متأكد من تقففيل هذه التذكرة ؟ , إذآ تريد تقفيلها قم بكتآبه الامر الآتي \`-confirm\` `)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('يجب الإسرآع في تقفيل التذكرة').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});

client.login(token);
