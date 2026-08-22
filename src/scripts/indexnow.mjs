// Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Naver, Seznam,
// DuckDuckGo and ChatGPT search all read the shared IndexNow index; Google does not).
// Run after a deploy that adds or changes pages:  npm run indexnow
// The key file lives at public/<key>.txt and must be served from the site root.
const HOST = 'www.gentleway.ink'
const KEY = '575ac35260c385378ba9d11fea58bbcb'

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
if (!urls.length) throw new Error('sitemap returned no <loc> entries')

const keyUrl = `https://${HOST}/${KEY}.txt`
const keyRes = await fetch(keyUrl)
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) throw new Error(`key file not served at ${keyUrl}`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList: urls })
})
console.log(`IndexNow: submitted ${urls.length} URLs -> HTTP ${res.status} ${res.statusText}`)
if (!res.ok) console.log(await res.text())
