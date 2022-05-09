import { Handler, HandlerEvent } from '@netlify/functions';
import Airtable from 'airtable';

// Initialiase Airtable connection
const { AIRTABLE_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base('appHl98Vu8VLuEL2A');

const handler: Handler = async (event: HandlerEvent, context: any) => {
  try {
    // Parse the body of the request
    const data = JSON.parse(event.body || '');

    // Make sure we got all data
    if (!data.email || !data.name) {
      return {
        statusCode: 400,
        body: 'Please include email and name.',
      };
    }

    // Insert our data into the table columns
    await base('tblRVUk15quoGSOiU').create({
      Email: data.email,
      Name: data.name,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Thanks for signing up!',
      }),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};

export { handler };
