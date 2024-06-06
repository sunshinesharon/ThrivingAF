require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5001;

// Logging env variables to ensure they are working correctly
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_REDIRECT_URI:', process.env.GOOGLE_REDIRECT_URI);
console.log('GOOGLE_REFRESH_TOKEN:', process.env.GOOGLE_REFRESH_TOKEN);

app.use(cors());
app.use(bodyParser.json());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI
}, (accessToken, refreshToken, profile, done) => {
  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);
  console.log('Profile:', profile);

  if (!accessToken || !profile) {
    console.error('Access token or profile is missing.');
    return done(new Error('Invalid credentials'), null);
  }

  // Save refresh token if it is available
  if (refreshToken) {
    process.env.GOOGLE_REFRESH_TOKEN = refreshToken;
  }

  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/'
}), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send('<h1>Home</h1><a href="/auth/google">Login with Google</a>');
});

// OAuth2 Setup below 
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Refresh token setup below
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Email sending functionality
const sendMail = async (email, code) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const emailBody = `
      From: "Your App" <your-email@gmail.com>
      To: ${email}
      Subject: Your Verification Code
      Content-Type: text/plain; charset="UTF-8"

      Your verification code is: ${code}
    `;

    const encodedMessage = Buffer.from(emailBody)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

app.post('/api/send-code', (req, res) => {
  const email = req.body.email;
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code

  sendMail(email, code)
    .then(() => res.status(200).send({ message: 'Code sent successfully' }))
    .catch(error => res.status(500).send(error.toString()));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
