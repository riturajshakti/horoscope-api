import { Hono } from 'hono/tiny'
import constants from './utils/constants'
import { Env } from 'hono/types'
import horoscopeRouter from './api/horoscope/routes'

const app = new Hono({ strict: false })

app.use('*', (c, next) => {
	c.res.headers.set('Access-Control-Allow-Origin', '*')
	return next()
})

app.get('/', (c) => c.json({ message: 'server running.. ⚡⚡' }))

app.route('/horoscope', horoscopeRouter)

app.notFound((c) => c.json({ message: 'route not implemented' }, 405))
app.onError((error, c) => {
	console.log(error)
	return c.json({ message: 'server error' }, 500)
})

// https://horoscope-api.riturajshakti.workers.dev
export default {
	async fetch(request, env, ctx): Promise<Response> {
		constants.env = env as any
		if (request.method.toLowerCase() === 'options') {
			return new Response('ok', {
				headers: {
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
					'Access-Control-Allow-Origin': '*',
				},
				status: 200
			},);
		}
		return app.fetch(request, env, ctx)
	}
} satisfies ExportedHandler<Env>
