import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from '@koa/router'
import { oas } from 'koa-oas3'
import { join } from 'path'
import { MetricService } from './metric'

interface State extends Koa.DefaultState {
  metricService: MetricService
}

const app = new Koa()
const router = new Router<State>()

router.get('/', ctx => {
  ctx.body = {}
})

router.post('/metric', ctx => {
  const metric = ctx.request.body
  ctx.state.metricService.log(metric)
  ctx.body = true
})

app.use(async (ctx, next) => {
  ctx.state.metricService = new MetricService()
  await next()
})
app.use(bodyParser())
app.use(
  oas({
    file: join(__dirname, '..', 'api.yaml'),
    endpoint: '/openapi.json',
    uiEndpoint: '/openapi',
  }),
)
app.use(router.routes())
app.listen(3000, () => {
  console.log('listening on 3000')
})
