//Include modules
const fetch = require('cross-fetch');
const Discord = require('discord.js');

//Defining modules
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require('discord.js');

//Authentication keys
const auth = require('./auth.json');
const riotAuth = 'RGAPI-df86469f-3d05-48d3-958f-7bb0a9e35a4b';

//
const all_champion_id = {
        1: 'Annie',
        2: 'Olaf',
        3: 'Galio',
        4: 'Twisted Fate',
        5: 'Xin Zhao',
        6: 'Urgot',
        7: 'LeBlanc',
        8: 'Vladimir',
        9: 'Fiddlesticks',
        10: 'Kayle',
        11: 'Master Yi',
        12: 'Alistar',
        13: 'Ryze',
        14: 'Sion',
        15: 'Sivir',
        16: 'Soraka',
        17: 'Teemo',
        18: 'Tristana',
        19: 'Warwick',
        20: 'Nunu & Willump',
        21: 'Miss Fortune',
        22: 'Ashe',
        23: 'Tryndamere',
        24: 'Jax',
        25: 'Morgana',
        26: 'Zilean',
        27: 'Singed',
        28: 'Evelynn',
        29: 'Twitch',
        30: 'Karthus',
        31: "Cho'Gath",
        32: 'Amumu',
        33: 'Rammus',
        34: 'Anivia',
        35: 'Shaco',
        36: 'Dr.Mundo',
        37: 'Sona',
        38: 'Kassadin',
        39: 'Irelia',
        40: 'Janna',
        41: 'Gangplank',
        42: 'Corki',
        43: 'Karma',
        44: 'Taric',
        45: 'Veigar',
        48: 'Trundle',
        50: 'Swain',
        51: 'Caitlyn',
        53: 'Blitzcrank',
        54: 'Malphite',
        55: 'Katarina',
        56: 'Nocturne',
        57: 'Maokai',
        58: 'Renekton',
        59: 'JarvanIV',
        60: 'Elise',
        61: 'Orianna',
        62: 'Wukong',
        63: 'Brand',
        64: 'LeeSin',
        67: 'Vayne',
        68: 'Rumble',
        69: 'Cassiopeia',
        72: 'Skarner',
        74: 'Heimerdinger',
        75: 'Nasus',
        76: 'Nidalee',
        77: 'Udyr',
        78: 'Poppy',
        79: 'Gragas',
        80: 'Pantheon',
        81: 'Ezreal',
        82: 'Mordekaiser',
        83: 'Yorick',
        84: 'Akali',
        85: 'Kennen',
        86: 'Garen',
        89: 'Leona',
        90: 'Malzahar',
        91: 'Talon',
        92: 'Riven',
        96: "Kog'Maw",
        98: 'Shen',
        99: 'Lux',
        101: 'Xerath',
        102: 'Shyvana',
        103: 'Ahri',
        104: 'Graves',
        105: 'Fizz',
        106: 'Volibear',
        107: 'Rengar',
        110: 'Varus',
        111: 'Nautilus',
        112: 'Viktor',
        113: 'Sejuani',
        114: 'Fiora',
        115: 'Ziggs',
        117: 'Lulu',
        119: 'Draven',
        120: 'Hecarim',
        121: "Kha'Zix",
        122: 'Darius',
        126: 'Jayce',
        127: 'Lissandra',
        131: 'Diana',
        133: 'Quinn',
        134: 'Syndra',
        136: 'AurelionSol',
        141: 'Kayn',
        142: 'Zoe',
        143: 'Zyra',
        145: "Kai'sa",
        147: "Seraphine",
        150: 'Gnar',
        154: 'Zac',
        157: 'Yasuo',
        161: "Vel'Koz",
        163: 'Taliyah',
        166: "Akshan",
        164: 'Camille',
        201: 'Braum',
        202: 'Jhin',
        203: 'Kindred',
        222: 'Jinx',
        223: 'TahmKench',
        234: 'Viego',
        235: 'Senna',
        236: 'Lucian',
        238: 'Zed',
        240: 'Kled',
        245: 'Ekko',
        246: 'Qiyana',
        254: 'Vi',
        266: 'Aatrox',
        267: 'Nami',
        268: 'Azir',
        350: 'Yuumi',
        360: 'Samira',
        412: 'Thresh',
        420: 'Illaoi',
        421: "Rek'Sai",
        427: 'Ivern',
        429: 'Kalista',
        432: 'Bard',
        497: 'Rakan',
        498: 'Xayah',
        516: 'Ornn',
        517: 'Sylas',
        526: 'Rell',
        518: 'Neeko',
        523: 'Aphelios',
        555: 'Pyke',
        875: "Sett",
        711: "Vex",
        777: "Yone",
        887: "Gwen",
        876: "Lillia",
    }

//Creating client object
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

//Starting bot function
client.once('ready', () => {
console.log('DataBot is online!');
});

//Authentication
client.login(auth.token);

//Starting the bot eventListener
client.on('message', function (message) {

    //Parsing command from user
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];

        //Basic command logic
        if (cmd == 'account') {

          //Parsing user message for API requests
          var summonerName = message.content.substring(9);
          summonerName = encodeURIComponent(summonerName.trim());

          //Call to command function
          account(summonerName, message);
        }

        if(cmd == "free") {

          //Call to command function
          freeRotation(message);
        }

        if(cmd == 'rank') {

          //Parsing user message for API requests
          var summonerName = message.content.substring(5);
          summonerName = encodeURIComponent(summonerName.trim());

          //Call to command function
          rank(summonerName, message);
        }

        if(cmd == 'help') {

          //Formatting response
          const embed = new MessageEmbed()
          .setAuthor("League BOT")
          .setColor('#f7a1a1')
          .setTitle('Command Information')
          .addField('**!account [summoner name]**:',' Provides details about the given summoner. Only available for accounts on the North American server.\n')
          .addField('**!free:**', 'Provides a list of the free champions available this week.\n')
          .addField('**!rank [summoner name]**:', 'Provides the rank, wins, losses, win/lose ratio, and hot streak status for the given summoner.\n')
          .addField('\n**Application Information**', 'Made by John David Mohr.\n Functionality provided by Riot Games API, Discord.js, and Riot Games Data Dragon')
          .setTimestamp()

          //Sending response
          message.reply({embeds: [embed]});
        }



     }
});

//account rank, given summonerName and message object, responds with rank, queueType, wins, losses, W/L ratio, hotStreak
async function rank(summonerName, message) {

  //Fetching and parsing response
  let data = await fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + riotAuth);
  data = await data.json();
  let summonerID = String(data.id);
  let leagueData = await fetch('https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ summonerID +'?api_key=' + riotAuth);
  leagueData = await leagueData.json();

  //Checking if player is unranked
  if (leagueData[0] === undefined) {

    //Formatting response
    const embed = new MessageEmbed()
    .setAuthor("League BOT")
    .setColor('#f7a1a1')
    .setTitle(data.name)
    .setDescription('Player is unranked')
    .setThumbnail("https://ddragon.leagueoflegends.com/cdn/12.4.1/img/profileicon/" + data.profileIconId +".png")
    .setTimestamp()

    //Sending response
    message.reply({embeds: [embed]});
  }
  else {

  //Creating new message attachment
  const attachment = new Discord.MessageAttachment('./ranked-emblems/Emblem_' + leagueData[0].tier + '.png', 'Emblem_' + leagueData[0].tier + '.png');

  //Formatting response
  const embed = new MessageEmbed()
  .setAuthor("League BOT")
  .setColor('#f7a1a1')
  .setTitle(String(leagueData[0].summonerName) + "\nRank: " + String(leagueData[0].tier) + " " + String(leagueData[0].rank))
  .setDescription("Queue type: " + leagueData[0].queueType.replaceAll("_", " ") + "\nWins: " + leagueData[0].wins + "\nLosses: "
  + leagueData[0].losses + "\nW/L Ratio : " + (parseFloat(leagueData[0].wins)/parseFloat(leagueData[0].losses)).toFixed(2)
  + "\nHot Steak: " + leagueData[0].hotStreak)
  .setThumbnail('attachment://Emblem_' + leagueData[0].tier + '.png')
  .setTimestamp()

  //Sending response
  message.reply({embeds: [embed], files: ['./ranked-emblems/Emblem_' + leagueData[0].tier + '.png']});
} }

//free rotation, message object, list of free champions
async function freeRotation(message) {

    let list = new Array(15);

    //Fetching and parsing response
    let response = await fetch('https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=' + riotAuth);
    response = await response.json();
    var args = String(response.freeChampionIds).replaceAll(',', ' ').split(' ');

    //Matching id:key with champion_name:value
    for (let i = 0; i < args.length; i++) {
      list[i] = all_champion_id[args[i]]; }

    //Formatting response
    const embed = new MessageEmbed()
    .setThumbnail('https://cdn.mos.cms.futurecdn.net/4v4rmrxbbRs2k8rw3zegpE-320-80.jpg')
    .setAuthor("League BOT")
    .setColor('#f7a1a1')
    .setTitle("Free Rotation")
    .setDescription(list[0] + "\n" +
    list[1] + "\n" +
    list[2] + "\n" +
    list[3] + "\n" +
    list[4] + "\n" +
    list[5] + "\n" +
    list[6] + "\n" +
    list[7] + "\n" +
    list[8] + "\n" +
    list[9] + "\n" +
    list[10] + "\n" +
    list[11] + "\n" +
    list[12] + "\n" +
    list[13] + "\n" +
    list[14] + "\n" +
    list[15] + "\n")
    .setTimestamp()

    //Sending response
    message.reply({embeds: [embed]});
}

//account summary, given a summonerName responds with summonerName, summonerLevel, lastPLayed, and profileIconId
async function account(summonerName,message) {

  //Fetching and parsing response
  let data = await fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + riotAuth);
  data = await data.json();

  //Creating dateObject to turn epoch into human-readable date
  var dateObject = new Date(data.revisionDate);

  //Formatting response
  const embed = new MessageEmbed()
  .setAuthor("League BOT")
  .setColor('#f7a1a1')
  .setTitle(String(data.name))
  .setDescription("Summoner level: " + data.summonerLevel + "\nLast Played: " + dateObject.toUTCString())
  .setThumbnail("https://ddragon.leagueoflegends.com/cdn/12.4.1/img/profileicon/" + data.profileIconId +".png")
  .setTimestamp()

  //Sending response
  message.reply({embeds: [embed]});
}
