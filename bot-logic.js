/**
 * bot logic sample
 */

import { Service } from 'ringcentral-chatbot/dist/models'

/**
 * when chat group got new post
 * @param {string} text post text content
 * @param {object} group info
 * @param {Bot} bot instance
 */

const botName = 'welcome-bot'

function defaultWelcomeMsg() {
  return 'Welcome, new team member!:grinning:'
}

function help(id, welcomeMsg = defaultWelcomeMsg()) {
  return `Hello, I am welcome bot. I will welcome every new member who join this chatgroup with message "@newmember ${welcomeMsg}".

You can reply "![:Person](${id}) **set** your-welcome-message" if you want to set custom welcome message.`
}

exports.onBotGetPost = async ({
  group, bot, text
}) => {
  let reg = / *set +(.+)$/
  let arr = text.match(reg)
  if (arr && arr[1]) {
    let welcomeMsg = arr[1]
    await Service.update({
      data: {
        welcomeMsg
      }
    }, {
      where: {
        botId: bot.id,
        groupId: group.id,
        name: botName
      }
    })
    return await bot.sendMessage(
      group.id,
      {
        text: 'New welcome message set'
      }
    )
  }
  await bot.sendMessage(
    group.id,
    {
      text: help(bot.id)
    }
  )
}


/**
 * when bot join chat group
 * @param {object} group info
 * @param {Bot} bot instance
 */

exports.onBotJoinGroup = async ({
  bot,
  group
}) => {
  let where = {
    botId: bot.id,
    groupId: group.id,
    name: botName
  }
  let inst = await Service.findOne({
    where
  })
  if (!inst) {
    await Service.create({
      botId: bot.id,
      groupId: group.id,
      data: {
        welcomeMsg: defaultWelcomeMsg()
      },
      // use name store welcome msg
      name: botName
    })
  }
  let welcome = inst ? inst.data.welcomeMsg : defaultWelcomeMsg()
  await bot.sendMessage(
    group.id,
    {
      text: help(bot.id, welcome)
    }
  )
}

exports.onPersonsAdded = async({
  message,
  bot,
  group
}) => {
  let where = {
    botId: bot.id,
    groupId: group.id,
    name: botName
  }
  let inst = await Service.findOne({
    where
  })
  if (!inst || !inst.data) {
    return
  }
  let added = message.body.addedPersonIds
  let at = added
    .reduce((prev, id) => {
      return `${prev} ![:Person](${id})`
    }, '').trim()
  await bot.sendMessage(group.id, {
    text: `${at}
${inst.data.welcomeMsg}
    `
  })
}
