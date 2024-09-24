const httpStatus = require('http-status');
const { google } = require('googleapis');
const fs = require('fs').promises; // Use promises API for async/await
const readline = require('readline');
const { Event } = require('../models');

// Path to credentials and token files
const CREDENTIALS_PATH = './src/google-api/credentials2.json';
const TOKEN_PATH = './src/google-api/token.json';

// Main function to save events
const saveEvent = async (data) => {
  try {
    // Load client secrets
    const content = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(content);
    const oAuth2Client = authorize(credentials);

    // Check for existing token or get a new one
    let token;
    try {
      token = await fs.readFile(TOKEN_PATH);
      oAuth2Client.setCredentials(JSON.parse(token));
      // List events if token is valid
      let data = await listEvents(oAuth2Client);
      return data;
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Token file does not exist, get a new one
        await getAccessToken(oAuth2Client);
      } else {
        throw err;
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
};
const getEvent = async (data) => {
  try {
    // Calculate the date for three months ago
    let threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
   let formattedDate =  new Date(threeMonthsAgo.getTime())
    // Query the database for events in the last three months
    const events = await Event.find({
      date: { $gte: formattedDate },
    }).exec();
    console.log(events, '00000');
    return events
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

// Function to create OAuth2 client
const authorize = (credentials) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
};

// Function to get a new access token
const getAccessToken = async (oAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
  console.log('Authorize this app by visiting this URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const code = await new Promise((resolve) => {
    rl.question('Enter the code from that page here: ', (input) => {
      rl.close();
      resolve(input);
    });
  });

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
    console.log('Token stored to', TOKEN_PATH);
    await listEvents(oAuth2Client);
  } catch (err) {
    console.error('Error retrieving access token:', err);
  }
};

// Function to list calendar events
const listEvents = async (auth) => {
  const calendar = google.calendar({ version: 'v3', auth });

  // Get the current date and calculate the date 1 year ago
  const currentDate = new Date();
  const lastYearDate = new Date();
  lastYearDate.setFullYear(currentDate.getFullYear() - 1);

  try {
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: lastYearDate.toISOString(), // From 1 year ago
      timeMax: currentDate.toISOString(), // Up to the current date
      singleEvents: true, // Return single events
      orderBy: 'startTime', // Order by start time
    });

    const events = res.data.items;

    if (events.length) {
      await Event.deleteMany({})
      events.forEach((event) => {
        const start = event.start.dateTime || event.start.date;
        let eventObj = {
          eventName: event.summary,
          description: event.description,
          attendees: event.attendees,
          date: new Date(start).toISOString(),
        };
       new Event(eventObj).save();
      });
      return events;
    } else {
      console.log('No events found from the last year.');
    }
  } catch (err) {
    return err;
    console.error('The API returned an error:', err);
  }
};

module.exports = {
  saveEvent,
  getEvent,
};
