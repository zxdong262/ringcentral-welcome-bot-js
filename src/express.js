
import app from './app'
import initDb from './init-db'

const { RINGCENTRAL_CHATBOT_EXPRESS_PORT } = process.env

app.listen(RINGCENTRAL_CHATBOT_EXPRESS_PORT, () => {
  console.log(
    `server runs on http://localhost:${RINGCENTRAL_CHATBOT_EXPRESS_PORT}`
  )
  initDb()
})
