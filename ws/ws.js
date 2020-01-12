const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require("body-parser");
const path = require('path')
const { Client } = require('discord.js')
var client = new Client()
const request = require("request-promise");
const Discord = require('discord.js');
const config = require('./config/config.json')

var phpExpress = require('php-express')({

    binPath: 'php'
  });

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

        this.app.engine("php", hbs({
            extname: 'php',                     
            defaultLayout: 'layout',            
            layoutsDir: __dirname + '/layouts'  
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'php')
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
        return (_token == "aquatictestc4c")
    }
    

    registerRoots() {
        this.app.get('/', (req, res) => {
            var _token = req.query.token
            if (!this.checkToken(_token)) {
                res.render('downtime', { title: "Error" })
                return
            }
            
            res.render('login', { 
                title: "Welcome", 
                token: _token, 
            })
        })
        this.app.post('/guest', (req, res) => {               
            res.render('community', { title: "Welcome" })
            console.log("Logged in as guest.")
            return
           
        })

        this.app.post('/Auth', (req, res) => {        
                                 
            var username = req.body.username
            var password = req.body.password

             if(username == "aquatic" && password == "aquatickyle1998") {
                res.render('index', { title: "Aquatic Dashboard" })
                return
             }
             else if(username == "karmakitten" && password == "KarmaKitten1!") {
                res.render('index', { title: "Aquatic Dashboard" })
                return
             }
             else if (username == "vip-account" && password == "!passwordc11") {
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
                    type: "PLAYING", // URL not needed unless type: "STREAMING"
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
                message.channel.send("Please create a channel to use for logs! | Make the name logs (All Lower-Case)! Enter !setup once your done!")
                                            

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
	                    .setDescription('CID Output: ' + output)
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
            
            client.login("NjQyMDU1MjA2NDA1NjY4ODk0.Xhn9WA.8LmCYlcO_8U8ZA5WpMW7tB6qkqk");  

            console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)

            const EGClient = require('epicgames-client').Client;
            const Fortnite = require('epicgames-fortnite-client');
            const { ESubGame } = Fortnite;
            var username = req.body.username
            var password = req.body.password

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
                const fortnite = await eg.runGame(Fortnite);
                const br = await fortnite.runSubGame(ESubGame.BattleRoyale);


                let myServer = client.guilds.get("615900429313900555");
                let servercount = myServer.channels.get("665599612161097741");

                var count = servercount.name;
                count++;

                servercount.setName("" + count)

                fortnite.communicator.updateStatus("This bot is using Aquatics Web Dashboard! Discord: https://discord.gg/J22ZmTa | YouTube: https://www.youtube.com/c/aquaplaysyt");

                const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle('Aquatic Dashboard Logs')
                        .setURL('https://aquaplaysbot.herokuapp.com/')
                        .setAuthor('Aquatic', 'https://cdn.discordapp.com/attachments/622820015393079296/645299976469086240/LOGO_V2.png', 'https://aquaplaysbot.herokuapp.com/')
                        .setDescription('New client logged in ' + username + '\n Total users: ' + count) 
                        .setTimestamp()
                        .setFooter('Created By Aqua Plays#0001');
        
                        client.channels.find("name", "logs").send(exampleEmbed)    

                fortnite.communicator.on('party:member:joined', async (member) => {
                    const account = await eg.getProfile(member.id);
                    eg.communicator.sendMessage(member.id, `Welcome ${account.name}`);
                    console.log(`Member ${account.name} joined!`);
                    console.log(`Members count: ${fortnite.party.members.length}`);
                    fortnite.party.me.setOutfit("CID_624_Athena_Commando_M_TeriyakiWarrior");
                    fortnite.party.me.setBackpack("BID_333_Reverb");
                    fortnite.party.me.setEmote("EID_ElectroShuffle");
                    fortnite.party.me.setBattlePass(true, 420, 420, 420, 420);
                });
                fortnite.communicator.on('party:member:left', async (member) => {
                    const account = await eg.getProfile(member.id);
                    console.log(`Member ${account.name} Left!`);
                    console.log(`Members count: ${fortnite.party.members.length}`);
                })
                fortnite.communicator.on('party:invitation', async (invitation) => {
                    await invitation.accept()
                    console.log("Party Joined!")
                  });                 
                  fortnite.communicator.on('friend:request', async (data) => {
                    console.log(`Accepting friend request!`)
                    await eg.acceptFriendRequest(data.friend.id);
        
                  });
                fortnite.communicator.on('friend:message', async (data) => {
                    let args = data.message.split(" ");
                    if (args[0].toLowerCase().startsWith("cid_")) {
                        try {
                            fortnite.party.me.setOutfit(`${args[0]}`)
                            eg.communicator.sendMessage(data.friend.id, `Skin set to ${args[0]}`);
                            console.log(`Set skin To ${data.message}`);
                        } catch (error) {
                            eg.communicator.sendMessage(data.friend.id, `Failed to set Skin to ${args[0]}`);
                        }
                    }
                    
                    else if (args[0].toLowerCase().startsWith("eid_")) {
                        try {
                            fortnite.party.me.setEmote(`${args[0]}`)
                            eg.communicator.sendMessage(data.friend.id, `Emote set to ${args[0]}`);
                            console.log(`Set emote To ${data.message}`);
                        } catch (error) {
                            eg.communicator.sendMessage(data.friend.id, `Failed to set emote to ${args[0]}`);
                        }
                    }      
                    
                    else if (args[0].toLowerCase().startsWith("bid_")) {
                        try {
                            fortnite.party.me.setBackpack(`${args[0]}`)
                            eg.communicator.sendMessage(data.friend.id, `backpack set to ${args[0]}`);
                            console.log(`Set backpack To ${data.message}`);
                        } catch (error) {
                            eg.communicator.sendMessage(data.friend.id, `Failed to set backpack to ${args[0]}`);
                        }
                    }     

                    else if (args[0].toLowerCase().startsWith("Pickaxe_ID_")) { 
                        try {
                            fortnite.party.me.setPickaxe(`${args[0]}`)
                            eg.communicator.sendMessage(data.friend.id, `pickaxe set to ${args[0]}`);
                            console.log(`Set pickaxe To ${data.message}`);
                        } catch (error) {
                            eg.communicator.sendMessage(data.friend.id, `Failed to set pickaxe to ${args[0]}`);
                        }
                    }            

                    else if (args[0].toLowerCase().startsWith("!status")) {
                        try {
                            args[1] = args[1].replace("_", " ");
                            fortnite.communicator.updateStatus(`${args[1]}`)
                            eg.communicator.sendMessage(data.friend.id, `status set to ${args[1]}`);
                            console.log(`Set status To ${data.message}`);
                        } catch (error) {
                            eg.communicator.sendMessage(data.friend.id, `Failed to set status to ${args[1]}`);
                        }
                    }     

                    else if (args[0].toLowerCase().startsWith("!kick")) {
                        try {
                            if(text == "e24e28c71a834f379bdbf8485a0fee83")  {
                                console.log("Player " + text + " Is whitelisted!")
                            }
                            else {

                            fortnite.party.kick(`${args[1]}`)
                            eg.communicator.sendMessage(data.friend.id, `status set to ${args[1]}`);
                            console.log(`Set status To ${data.message}`);

                            }   
                        } catch (error) {
                            eg.communicator.sendMessage(data.friend.id, `Failed to set status to ${args[1]}`);
                        }
                    } 

                    else if (args[0].toLowerCase().startsWith("!host")) {
                        try {
                            fortnite.party.promote(`${args[1]}`)
                            eg.communicator.sendMessage(data.friend.id, `host set to ${args[1]}`);
                            console.log(`Set host To ${data.message}`);
                        } catch (error) {
                            eg.communicator.sendMessage(data.friend.id, `Failed to set host to ${args[1]}`);
                        }
                    } 

                    else if (args[0].toLowerCase().startsWith("!banner")) {
                        try {
                            fortnite.party.me.setBanner(`${args[1]}`)
                            eg.communicator.sendMessage(data.friend.id, `banner set to ${args[1]}`);
                            console.log(`Set banner To ${data.message}`);
                        } catch (error) {
                            eg.communicator.sendMessage(data.friend.id, `Failed to set banner to ${args[1]}`);
                        }
                    }     

                    else if (args[0].toLowerCase().startsWith("!help")) {                    
                      eg.communicator.sendMessage(data.friend.id, `Thank you for using Aquatics Lobby Bot web panel created by Aqua Plays, Karma Kitten if you have any questions ask in the discord https://discord.gg/J22ZmTa - Commands | CID_ (rest of skin id) | EID_ (rest of emote id) | BID_ (rest of backbling id) | Pickaxe_ID_ (rest of pickaxe id) | !status (word_word_word_word)| !kick (username) | !host (username) | !banner (rest of banner id)|`);   
                    }     

                });   

                this.app.post('/SendSkin', (req, res) => {        
                        
            
                    var text = req.body.text           
                    if(text.includes('CID_')){
                        fortnite.party.me.setOutfit(text);
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
                        fortnite.party.me.setEmote(text);
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
                        fortnite.party.me.setOutfit(text);
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
                        fortnite.party.me.setEmote(text);
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
