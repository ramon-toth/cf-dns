import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { updateDNS } from './cf.js';
import { timestamp } from './utils.js';

dotenv.config();

const INTERVAL = process.env.INTERVAL;

const ipAPI = 'http://ipv4bot.whatismyipaddress.com';

run();

setInterval(run, INTERVAL * 1000);

async function run() {
  try {
    const publicIP = await fetch(ipAPI).then((res) => res.text());

    updateDNS(publicIP)
      .then((res) => console.log(timestamp(), `IP Updated: ${res.result.content}`))
      .catch((e) => console.log(timestamp(), `IP Update Error: ${e}`));
  } catch (error) {
    console.log(timestamp(), `IP Update Error: ${error}`);
  }
}
