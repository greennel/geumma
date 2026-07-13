// Proxies GDELT requests through our own server.
// This avoids the browser being rate-limited/blocked directly by GDELT (429 errors),
// since the request now comes from Vercel's server IP instead of the visitor's IP.

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function fetchOnce(url){
  const response = await fetch(url);
  const raw = await response.text();
  try{
    return JSON.parse(raw);
  }catch(e){
    return null; // not JSON — GDELT gave a plain-text notice (rate limit, etc.)
  }
}

module.exports = async function handler(req, res) {
  const { query, timespan, sort } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'query is required' });
  }

  const params = new URLSearchParams({
    query,
    mode: 'artlist',
    maxrecords: '6',
    format: 'json',
    sort: sort || 'HybridRel'
  });
  if (timespan) params.set('timespan', timespan);

  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;

  try {
    let data = null;
    const delays = [0, 2000, 3500];
    for (let i = 0; i < delays.length && !data; i++){
      if (delays[i]) await sleep(delays[i]);
      data = await fetchOnce(url);
    }
    if (!data) {
      return res.status(200).json({ articles: [], warning: 'non_json_response' });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'GDELT request failed', detail: String(err && err.message || err) });
  }
};
