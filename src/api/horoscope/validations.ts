import { Next, Context } from 'hono';
import { validate } from 'super-easy-validator';

async function postGetHoroscopes(c: Context, next: Next) {
  try {
    const body = await c.req.json()
    c.set('body', body)

    const rules = {
      zodiac: 'string|enums:aries,taurus,gemini,cancer,leo,virgo,libra,scorpio,sagittarius,capricorn,aquarius,pieces',
      language: 'optional|string|enums:english,hindi',
      date: 'optional|dateonly',
      period: 'optional|string|enums:today,tomorrow,weekly,monthly',
      apiKey: 'optional|string|min:3',
      domainSecretCode: 'optional|string|min:3',
    }
    const {errors} = validate(rules, body)
    if(errors) {
      return c.json({message: errors[0]}, 400)
    }

    return next()
  } catch (error) {
    console.log(error)
    return c.json({message: 'server error'}, 500)
  }
}

const validations = {
  postGetHoroscopes,
}

export default validations