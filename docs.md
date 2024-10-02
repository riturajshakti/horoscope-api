# Notes

- API Base URL: `https://horoscope-api.riturajshakti.workers.dev`
- question mark (?) represents optional fields

---

# 🌍 GET `/`

## Response Body

```json
{
  "message": "server running.. ⚡⚡"
}
```

## Description

- This api just checks if server is live or not

---

# 🌍 POST `/horoscope`

## Request Body

```ts
{
  zodiac: 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pieces',
  language?: 'english' | 'hindi',
  date?: '2024-10-02',
  period?: 'today' | 'tomorrow' | 'weekly' | 'monthly',
  apiKey?: 'Sd_12547455dhseunhT_ksdfln',
  domainSecretCode?: '8f9da951515975a3fbccc9fd582eb7bf'
}
```

## Response Body

```json
{
  "result": [
    {
      "type": "primary",
      "horoscope": "<primary horoscope>"
    },
    {
      "type": "love",
      "horoscope": "<love horoscope>"
    },
    {
      "type": "career",
      "horoscope": "<career horoscope>"
    },
    {
      "type": "health",
      "horoscope": "<health horoscope>"
    },
    {
      "type": "general",
      "horoscope": "<general horoscope>"
    }
  ]
}
```

## Description

- Returns horoscope as per the given data
- If `date` is not given, then it assumes today's date
- If `period` is not given then it assumes `today`
- If `language` is not given then it assumes `english`
- If `apiKey` and `domainSecretCode` is not given then it assumes their default value.

**NOTE:** These keys can change any time in future, so its better to always send keys from your side

---

# Original API Reference

https://www.vinaybajrangi.com/horoscope/daily-horoscope/capricorn.php