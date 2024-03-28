const truecallerjs = require('truecallerjs');
const TC_KEY = process.env.TC_KEY;

const getInfoObj = async (number) => {
  try {
    const personData = await getInfo(number);
    return {
      statusCode: 200,
      body: personData,
    };
  } catch (error) {
    console.error('Error getting phone number information:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get phone number information' }),
    };
  }
};

async function getInfo(number) {
    if (number.length !== 10) {
      console.log('Please enter a valid 10 digit number');
      return false;
    }
  
    const searchData = {
      number: number,
      countryCode: 'IN',
      installationId: TC_KEY,
    };
  
    const format = await truecallerjs.search(searchData);
  
    // Get the information
    const data = format.json().data[0];
  
    const personData = {
      name: data.name ?? '',
      altName: data.altName ?? '',
      access: data.access ?? '',
      city: (data.addresses && data.addresses[0]?.city) ?? '',
      country: (data.addresses && data.addresses[0]?.countryCode) ?? '',
      email: (data.internetAddresses && data.internetAddresses[0]?.id) ?? '',
      carrier: data.phones[0]?.carrier ?? '',
      badges: data.badges ?? '',
      score: data.score ?? '',
      ruleName: data.searchWarnings[0]?.ruleName ?? ''
    };
  
    return personData;
  }
  
  module.exports = { getInfoObj };