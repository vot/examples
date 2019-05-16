const request = require('sync-request');
const rs = require('text-readability');

// Let's define some APIs here
const apiPerson = 'http://uinames.com/api/?region=england';
const apiTrump = 'https://api.whatdoestrumpthink.com/api/v1/quotes';
const apiKanye = 'https://api.kanye.rest/';

function getFromAPI(url) {
  return JSON.parse(request('GET', url).getBody('utf-8'));
}

// (2) This is where the execution of our app starts - see (1) for execution
function main() {
  console.log('SuperApp (beta) ready');
  const person = getFromAPI(apiPerson);
  const kanye = getFromAPI(apiKanye);
  const trump = getFromAPI(apiTrump);

  const trumpInsults = trump.messages.personalized;
  const randomInsultIndex = Math.floor(Math.random() * trumpInsults.length);
  

  const fullName = person.name + ' ' + person.surname;

  let description = fullName;
  description += ' famously said "' + kanye.quote + '".';
  description += ' Trump responded "' + fullName + ' ' + trumpInsults[randomInsultIndex] + '".';

  console.log(description);

  const readabilityLevel = rs.textStandard(description);
  console.log('Readability Level:', readabilityLevel);
}


// I am executed when the app launches
console.log('Initialising SuperApp (beta).');

// (1) execution of our app - see (2) for actual logic
main();

