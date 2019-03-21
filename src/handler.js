import {
  onBotGetPost,
  onBotJoinGroup,
  onPersonsAdded
} from './default-bot-logic'
import { Bot } from 'ringcentral-chatbot/dist/models'

export default async event => {
  const { type, message } = event
  if (type === 'Message4Bot') {
    await onBotGetPost(event)
  } else if (type === 'BotJoinGroup') {
    let { bot, group } = event
    await onBotJoinGroup({
      bot,
      group
    })
  } else if (type === 'PostAdded') {
    let {type} = message.body
    if (type !== 'PersonsAdded') {
      return // not a text message
    }
    const botId = message.ownerId
    const groupId = message.body.groupId
    const bot = await Bot.findByPk(botId)
    await onPersonsAdded({
      bot,
      message,
      group: {
        id: groupId
      }
    })
  }
}
