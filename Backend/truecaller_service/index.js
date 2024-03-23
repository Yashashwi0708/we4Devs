const truecallerjs = require('truecallerjs');

const getInfoObj = async (number) => {
  try {
    const personData = await getInfo(number);
    return {
      statusCode: 200,
      body: JSON.stringify(personData),
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
    // scam spam : 9327208440
    // predicted_buisness : 8595933741
    // jyot patil : 8421006401
    // verify the number is 10 digit or not
    if (number.length !== 10) {
      console.log('Please enter a valid 10 digit number');
      return false;
    }
  
    // Create a SearchData object
    const searchData = {
      number: number,
      countryCode: 'IN',
      installationId: 'a1i0N--lkjhjvV1k0eY-iA9S1BGQb-7FE2GJ2xiTQeqCJcyfifAxq7i3c7CBWIgw',
    };
  
    // Search for the phone number
    const format = await truecallerjs.search(searchData);
  
    // Get the information
    const data = format.json().data[0];
    
    // console.log('Name:', data.name ?? '');
    // console.log('Alt Name:', data.altName ?? '');
    // console.log('Access:', data.access ?? '');
    // console.log('City:', (data.addresses && data.addresses[0]?.city) ?? '');
    // console.log('Country:', (data.addresses && data.addresses[0]?.countryCode) ?? '');
    // console.log('Email:', (data.internetAddresses && data.internetAddresses[0]?.id) ?? '');
    // console.log('Carrier:', data.phones[0]?.carrier ?? '');
    // console.log('Badges:', data.badges ?? '');
    // console.log('Score:', data.score ?? '');      // information avialable about that person on scale of 0 to 1
    // console.log('ruleName:', data.searchWarnings[0]?.ruleName ?? '');
  
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