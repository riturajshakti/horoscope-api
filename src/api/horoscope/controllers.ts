import { Context } from 'hono'
import constants from '../../utils/constants'

async function postGetHoroscopes(c: Context) {
	let {
		zodiac,
		language = 'english',
		date = new Date().toISOString().split('T')[0],
		period = 'today',
		apiKey,
		domainSecretCode
	} = c.get('body')

	zodiac = zodiac[0].toUpperCase() + zodiac.slice(1)
	language = language[0].toUpperCase() + language.slice(1)
	apiKey = apiKey ?? constants.env.API_KEY
	domainSecretCode = domainSecretCode ?? constants.env.DOMAIN_SECRET_KEY

	const res = await fetch('https://connect.vinaybajrangi.com/horoscope-transit-all', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			apiKey: apiKey,
			domainSecreteCode: domainSecretCode,
			AllPlanet: [],
			rashi: zodiac,
			type: 'overall',
			language: language,
			date: date,
			horoscopeperiod: period
		})
	})
	if (!res.ok) {
		return c.json({ message: 'server error' }, 500)
	}

	const json: any = await res.json()

	const result = [
		{
			type: 'primary',
			horoscope: json?.data?.primary
		}
	]

  for(const data of (json?.data?.secondary ?? [])) {
    result.push({
      type: data?.type?.toLowerCase().trim(),
      horoscope: data?.result
    })
  }

	return c.json({ result })
}

const validations = {
	postGetHoroscopes
}

export default validations
