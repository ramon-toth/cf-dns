import fetch from 'node-fetch';

import dotenv from 'dotenv';

dotenv.config();

export function updateDNS(ip) {
  return new Promise((resolve, reject) => {
    const record = {
      name: process.env.DOMAIN,
      type: 'A',
      content: ip,
      ttl: 1
    };

    fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE}/dns_records/${process.env.CF_RECORD}`, {
      method: 'put',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CF_TOKEN}`
      }
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}
