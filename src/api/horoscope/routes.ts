import {Hono} from 'hono/tiny'
import validations from './validations'
import controllers from './controllers'

const router = new Hono()

router.post('/', validations.postGetHoroscopes, controllers.postGetHoroscopes)

export default router