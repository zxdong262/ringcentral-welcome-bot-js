import serverlessHTTP from 'serverless-http'
import app from './app'

exports.app = serverlessHTTP(app)
