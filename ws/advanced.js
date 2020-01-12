const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require("body-parser");
const path = require('path')
const { Client } = require('discord.js')
var client = new Client()
const request = require("request-promise");
const Discord = require('discord.js');
const config = require('./config/config.json')

var accuser = config.username;
var accpass = config.password;

/**
 * @param {string}         token  
 * @param {number}         port   
 * @param {discord.Client} client 
 */


class WebSocket {

    constructor(token, port, client) {
        this.token = token
        this.port = port
        this.client = client
        this.app = express()

        this.app.engine('hbs', hbs({
            extname: 'hbs',                     
            defaultLayout: 'layout',            
            layoutsDir: __dirname + '/layouts'  
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.registerRoots()

        this.server = this.app.listen(port, () => {
            console.log("Websocket API set up at port " + this.server.address().port)
        })
   
    }

    /**
     * @param {string} _token 
     * @returns {boolean}
     */

    checkToken(_token) {
        return (_token == this.token)
    }
    

    registerRoots() {
        this.app.get('/', (req, res) => {
           res.render('login', { title: "Welcome" })
            return
        
        })

        this.app.post('/guest', (req, res) => {               
            res.render('community', { title: "Welcome" })
            console.log("Logged in as guest.")
            return
           
        })

        this.app.post('/Auth', (req, res) => {        
                                 
            var username = req.body.username
            var password = req.body.password

             if(username == "aquatic" && password == "aquatic1998") {
                res.render('index', { title: "Aquatic Dashboard" })
                return
             }
             else if(username == "KarmaKitten" && password == "KarmaKitten1!") {
                res.render('index', { title: "Aquatic Dashboard" })
                return
             }
             else
             {
                res.send('This program is private please get a login from a developer!');
             }
        })

        this.app.post('/SendDiscordLogin', (req, res) => {        
                                 
            var text = req.body.text
            try {
                client.login(text)                
                console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
                
            }
            catch(err) {
            }     
        })

        // DISCORD MESSAGE HANDLER //

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);

            client.user.setPresence({
                game: {
                    name: 'Fortnite Bot Dashboard | Created By @AquaPlaysYT On Twitter',
                    type: "PLAYING",
                    url: "https://www.twitch.tv/aquaplays_yt"
                }
            });
            try {


            } catch {
                console.log(err)
            }
           
        })

        client.on("message", async message => {
            if(message.author.bot) return;
            const args = message.content.slice("!").trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            if(command === "!ping") {
                const m = await message.channel.send("Ping?");
                m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
              }


              if(command === "!setup") {
                message.channel.send("Please create a channel to use for logs! | Make The Name logs (All Lower-Case)! Enter !setup once your done!")
                                            

                const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription('Discord Intergration Online :white_check_mark:')
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');

                try 
                {
                    client.channels.find("name", "logs").send(exampleEmbed)   
                }                                  
                catch 
                {

                }

              }
        })

        this.app.post('/SendCID', (req, res) => {        
            var text = req.body.text       
            request({
                url: 'http://benbotfn.tk:8080/api/cosmetics/search/multiple?displayName=' + text,
                json: true
            }).then(query => {    
            try {
                Object.keys(query).forEach(function(key) {
                  if(query[key].type == "Outfit") {

                  var output = `${query[key].id}`;    
                  
                  console.log(output)     
                  
                  try {

                    const exampleEmbed = new Discord.RichEmbed()
	                    .setColor('#0099ff')
	                    .setTitle('Aquatic Dashboard Logs')
	                    .setURL('https://aquaplaysbot.herokuapp.com/')
	                    .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
	                    .setDescription('Cid Output: ' + output)
                        .setTimestamp()
	                    .setFooter('Created By Aqua Plays#0001');

                    client.channels.find("name", "logs").send(exampleEmbed)    

                  }
                  catch (err) {
                      console.log(err)
                  }
            
                  throw new Error("Successfully found")             
                  }
                });
              }
              catch(err) {
               
              }
            })
        })

        this.app.post('/SendLogin', (req, res) =>  {

            const EGClient = require('epicgames-client').Client;
            const Fortnite = require('epicgames-fortnite-client');
            const { ESubGame } = Fortnite;
            var username = req.body.username
            var password = req.body.password
            var rNetCL = request('https://fnserver.terax235.com/api/v1.2/build',{ json: true }, (err, res, body) => {
            rNetCL = body.fortnite.netCL    
            console.log(rNetCL)
            })

            let eg = new EGClient({
                        email: username,
                        password: password,
                        debug: console.log,
                    });
              eg.init().then(async (success) => {
                console.log("Client startup successful")
                if(!success)
                  throw new Error('Cannot initialize EpicGames launcher.');
                if(!await eg.login())
                  throw new Error('Cannot login on EpicGames account.');
                  const fortnite = await eg.runGame(Fortnite, {
              netCL: rNetCL,
              partyBuildId: `1:1:${rNetCL}`,
              });
              const exampleEmbed = new Discord.RichEmbed()
              .setColor('#0099ff')
              .setTitle('Aquatic Dashboard Logs')
              .setURL('https://aquaplaysbot.herokuapp.com/')
              .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
              .setDescription('Fortnite Lobby Bot Started!')
              .setTimestamp()
              .setFooter('Created By Aqua Plays#0001');

             client.channels.find("name", "logs").send(exampleEmbed)
                const br = await fortnite.runSubGame(ESubGame.BattleRoyale);
                fortnite.communicator.on('party:member:joined', async (member) => {
                    const account = await eg.getProfile(member.id);
                    eg.communicator.sendMessage(member.id, `Welcome ${account.name}`);
                    console.log(`Member ${account.name} joined!`);
                    console.log(`Members count: ${fortnite.party.members.length}`);
            
                const exampleEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('Aquatic Dashboard Logs')
                .setURL('https://aquaplaysbot.herokuapp.com/')
                .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                .setDescription('Member Joined: ' + account.name + ' Current Player Count: ' + `${fortnite.party.members.length}`)
                .setTimestamp()
                .setFooter('Created By Aqua Plays#0001');

                client.channels.find("name", "logs").send(exampleEmbed)    

                  fortnite.party.me.setOutfit("/Game/Athena/Items/Cosmetics/Characters/CID_313_Athena_Commando_M_KpopFashion.CID_313_Athena_Commando_M_KpopFashion");
                  fortnite.party.me.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/BID_138_Celestial.BID_138_Celestial");
                  fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/EID_Breakboy.EID_Breakboy");
                  fortnite.party.me.setBattlePass(true, 99999999999999999999999999999999999999999999999999999999999, 420, 99999999999999999999999999999999999999999999999999999999999);
                });
                fortnite.communicator.on('party:member:left', async (member) => {
                    const account = await eg.getProfile(member.id);
                    console.log(`Member ${account.name} Left!`);
                    console.log(`Members count: ${fortnite.party.members.length}`);

                    const exampleEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('Aquatic Dashboard Logs')
                .setURL('https://aquaplaysbot.herokuapp.com/')
                .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                .setDescription('Member Left: ' + account.name + ' Current Player Count: ' + `${fortnite.party.members.length}`)
                .setTimestamp()
                .setFooter('Created By Aqua Plays#0001');

                client.channels.find("name", "logs").send(exampleEmbed)    
                })
                fortnite.communicator.on('party:invitation', async (invitation) => {
                    await invitation.accept()
                    console.log("Party Joined!")
                  });
                  var Player = await eg.getProfile('name');

                  fortnite.communicator.on('friend:request', async data => {
                    console.log("Accepting freind request!")
                    await eg.acceptFriendRequest(data.friend.id);
        
                  });
                fortnite.communicator.on('friend:message', async (data) => {

                    var prefix = '!'
                    var args = data.message.split(" ");
                    var commandargs = data.message.slice(prefix.length).split(/ +/);
                    var command = commandargs.shift().toLowerCase();
      
                    if (command == "devs") {                     
                      fortnite.communicator.sendMessage(data.friend.id, "test");
                    }

                    console.log("test");
      
                });  

                this.app.post('/SendSkin', (req, res) => {        
                        
            
                    var text = req.body.text           
                    if(text.includes('CID_')){
                        fortnite.party.me.setOutfit("/Game/Athena/Items/Cosmetics/Characters/" + text + "." + text);
                        console.log("Skin Set To " + text)    
                    const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription('Skin Set To ' + text)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)    
                        
                }})
                this.app.post('/SendEmote', (req, res) => {        
                        
            
                    var text = req.body.text           
                    if(text.includes('EID_')){
                        fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + text + "." + text);
                        console.log("Emote Set To " + text)   
                        const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription('Emote Set To ' + text)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)     
                        
                }})
                this.app.post('/SendBackBling', (req, res) => {        
                        
            
                    var text = req.body.text           
                    if(text.includes('BID_')){
                        fortnite.party.me.setOutfit("/Game/Athena/Items/Cosmetics/Backpacks/" + text + "." + text);
                        console.log("Backbling Set To " + text) 
                        const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription('BackBling Set To ' + text)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)        
                        
                }})
                this.app.post('/SendPickaxe', (req, res) => {        
                        
            
                    var text = req.body.text           
                    if(text.includes('PickaxeID_')){
                        fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Pickaxes/" + text + "." + text);
                        console.log("Pickaxe Set To " + text)    
                        const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription('Pickaxe Set To ' + text)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)     
                        
                }})
                this.app.post('/SendXpBoost', (req, res) => {        
                        
            
                    var xp = req.body.xp
                    var bp = req.body.bp
                    var team = req.body.team

                    fortnite.party.me.setBattlePass(true, xp, bp, team);
                    console.log("Boost Set To " + xp + " " + bp + " " + team)   
                    
                    const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription("Boost Set To " + xp + " " + bp + " " + team)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)     
                        
                })
                this.app.post('/SendBanner', (req, res) => {        
                        
                    var level = req.body.level
                    var id = req.body.id
                    var color = req.body.color
                              
                    fortnite.party.me.setBanner(level, id, color);
                    console.log("Banner Set To " + level + " " + id + " " + color)    

                    const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription("Banner Set To " + level + " " + id + " " + color)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)     
                        
                })
                this.app.post('/SendKick', (req, res) => {        
                        
                    var text = req.body.text 
                    if(text == "e24e28c71a834f379bdbf8485a0fee83")  {
                        console.log("Player " + text + " Is whitelisted!")
                    }   
                    else
                    {
                        try {
                            fortnite.party.kick(text);
                            console.log("Kicked user " + text)
                            const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription("Kicked User " + text)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)     
                        }
                        catch {
                            console.log("Failed To Kick User " + text)
                        }   
                    }                                     
                })
                this.app.post('/SendHost', (req, res) => {        
                        
                    var text = req.body.text 
                    try {
                            fortnite.party.promote(text);
                            console.log("promoted user " + text)
                            const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription("Promoted User " + text)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed) 
                        }
                        catch {
                            console.log("Failed To promote User " + text)
                        }                   
                })
                this.app.post('/SendError', (req, res) => {        
                        
                    var text = req.body.text 
                    try {
                        fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/EID_Wave.EID_Wave");
                        fortnite.party.me.setOutfit("/Game/Athena/Items/Cosmetics/Characters//./");
                            console.log("Crashed User " + text)
                            const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription("Crashed Party")
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed) 
                        }
                        catch {
                            console.log("Failed To Crash User " + text)
                        }                   
                })
                this.app.post('/SendStatus', (req, res) => {        
                                 
                    var text = req.body.text           
                    fortnite.communicator.updateStatus(text);
                    console.log("Status Set To " + text)   
                    const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription("Set Staus To " + text)
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)  
                        
                })

             
            });
        
        })
    }

}

module.exports = WebSocket