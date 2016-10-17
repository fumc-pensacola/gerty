import url from 'url';
import testURL from '../utils/test-url';

const sites = {
  api: 'https://api.fumcpensacola.com/v3/calendars',
  website: 'http://fumcpensacola.com'
};

const makeURL = site => (
  /^https?:\/\//.test(site) ? site : `http://${site}`
);

module.exports = robot => {
  robot.hear(/is( the)? (.+) (up|down)/i, res => {
    const site = res.match[2];
    const url = sites[site] || makeURL(site);
    testURL(url).then(statusCode => {
      res.reply(`${url} is up with status code ${statusCode}.`);
    }, statusCodeOrError => {
      if (statusCodeOrError instanceof Error) {
        res.reply(`Encountered an error pinging ${url}: ${statusCodeOrError.message}`);
      } else {
        res.reply(`Looks like ${url} is DOWN, with status code ${statusCodeOrError}.`);
      }
    });
  });
};
