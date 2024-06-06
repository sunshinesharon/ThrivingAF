const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getAccessToken = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  rl.question('Enter the code from that page here: ', async (code) => {
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token);

      oAuth2Client.setCredentials(tokens);
      rl.close();
    } catch (error) {
      console.error('Error retrieving access token', error);
      rl.close();
    }
  });
};

getAccessToken().catch(console.error);
