import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from '@koa/router'
import client from 'prom-client'
import { v4 as uuidv4 } from 'uuid'

interface Context extends Koa.DefaultContext {
  metrics: client.metric[]
}

const guage = new client.Gauge({
  name: 'someTag',
  help: 'someTag_help',
  labelNames: ['id', 'label', 'createdAt'],
})

const app = new Koa<Koa.DefaultState, Context>()
const router = new Router()

router.get('/', ctx => {
  ctx.body = client.register.getMetricsAsJSON()
})

router.post('/metric', ctx => {
  const metric = ctx.request.body

  const id = uuidv4()
  const createdAt = new Date().toISOString()

  guage.set({ id, label: 'duration', createdAt }, metric.duration)
  guage.set({ id, label: 'interval:one_two', createdAt }, metric.intervals[0])
  guage.set({ id, label: 'interval:two_three', createdAt }, metric.intervals[1])
  guage.set(
    { id, label: 'interval:three_four', createdAt },
    metric.intervals[2],
  )
  ctx.body = id
})

app.use(bodyParser())
app.use(router.routes())
app.listen(3000, () => {
  console.log('listening on 3000')
})
