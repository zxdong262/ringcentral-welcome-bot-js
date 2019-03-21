
import createApp from 'ringcentral-chatbot/dist/apps'
import handle from './handler'

const app = createApp(handle)

app.get('/', (req, res) => {
  res.end('server running')
})
app.get('/favicon.ico', (req, res) => {
  res.end('')
})
app.get('/test', (req, res) => res.send('server running'))

export default app
