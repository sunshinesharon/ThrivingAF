# Project Title
ThrivingAF (Thriving as Freelancers)

Market Like a Boss. 

## Overview
ThrivingAF is a web-based marketing tool designed to empower Freelancers and  solopreneurs to craft compelling personal brands and execute effective marketing strategies.

### Problem

Freelancers and Solopreneurs wear many hats and they often lack the time and resources to effectively market themselves. More often than not they need help with; 

Developing and maintaining a clear and consistent brand identity that helps set themselves apart from their competition.
Crafting targeted marketing messages that resonate with their prospects.
Creating high-quality content to promote across online channels.
Navigating the complexities of social media marketing to reach and engage their target audience.

ThrivingAF addresses these challenges by providing a user-friendly platform encompassing features and resources designed to streamline the marketing process.

### User Profile

ThrivingAF targets; 
Freelancers: Individuals who offer their skills and services on a project basis.
Solopreneurs: Independent business owners managing their own operations.

These groups may have varying levels of marketing experience, regardless of whether they do, they share a common desire to build a strong personal brand. You may ask, why can't they rely on general AI platforms like ChatGPT, Gemini and Perplexity? Though these platforms provide valuable insights, ThrivingAF aims to offer a specialized approach with marketing strategies that are not only personalized to one's brand nuances but also resonate with current trends. This tailored support ensures authenticity in branding, giving back time to freelancers to focus their efforts on other brand objectives, ultimately helping them stand out in a competitive landscape. 

### Features

- As a Freelancer/Solopreneur, I want access to personalized marketing plans based on my industry and personal goals. 

- As a Freelancer, I want to understand the analytics behind my online presence and engagement.

- As a Freelancer, I want to manage all aspects of my personal brand building from a single platform. 

- As a Freelancer/Solopreneur, I want to create a professional portfolio and interactive website, effortlessly. 
## Implementation

### Tech Stack

- React
- Node.js
- MySQL or MongoDB
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express
    - mongoose for MongoDB
    - bcrypt for password hashing

### APIs

- APIs for analytics tracking 
- APIs for personalized marketing plans 
- APIs for user authentication and management

### Sitemap

- Welcome Screen
- Log in / Sign Up
- Homepage 
- Prompt Library, Chat History, New Chat, Voice
- Explore More 
- Profile 

### Endpoints

**POST/ users/signup**

- Signs up a new freelancer/Solopreneur 

Parameters:
- 'email': The email address of the user 
- 'password': The user's choice of password


Response:
```
[
    {
        "token": "generated_jwt_token",
        "userId": 1, 
        "message": "Woohoo! You're all set to thrive! 🚀 Let's make some magic happen with your brand."
    },
    ...
]
```

**POST /users/login**

- Authenticates a freelancer/solopreneur and returns a JWT token.

Parameters:
- 'email': The user's email address
- 'password': The user's password

Response:
```
{
        "token": "generated_jwt_token",
        "userId": 1, 
        "message": "Back to boost your brand? 🌈 We've missed you! Keep thriving!"
}
```

**GET /profile**

- Retrieves the authenticated user's profile and brand-building progress thus far. 

Parameters:
- id: UserId
- token: JWT of the logged in user

Response:
```
{
    "userId": 1,
    "email": "user@example.com",
    "brandStrength": 75,  // Percentage
    "marketingPlansCompleted": 5,
    "message": "You are ThrivingAF! 🎯 Keep shining!"
}
```
**GET /marketing-plan/survey**
- A questionnaire that gathers details from the freelancer or solopreneur to tailor an effective marketing plan that caters specifically to their needs. 

Response:
{
  "questions": [
    {
      "questionId": 1,
      "text": "Describe your primary target audience.",
      "type": "text"  // This could be 'text', 'multiple-choice', 'checkbox', etc.
    },
    {
      "questionId": 2,
      "text": "What are your top three marketing goals?",
      "type": "checkbox",
      "options": ["Increase brand awareness", "Boost customer engagement", "Generate leads", "Other"]
    },
    {
      "questionId": 3,
      "text": "Which industries are you targeting?",
      "type": "dropdown",
      "options": ["Technology", "Healthcare", "Education", "Food & Beverage", "Other"]
    },
    // Additional questions as needed
  ]
}

**POST /marketing-plans**

- Submits a request to generate a personalized marketing plan

Parameters:
- 'userId': ID of the authenticated user.
- token: JWT of the logged in user
- 'responses': A list of all the user's responses to the questionnaire. 

Response:
```
{
  "planId": 1,
  "status": "Personalized Marketing Ready",
  "details": "Your tailore-made Marketing Plan is here, packed with insights and next steps. Let's get ThrivingAF! 🌟"
}

```
**GET /analytics**

- Provides analytics about the freelancers'online presence

Parameters:

- userID: ID of the authenticated user.

Response:
```
{
  "visits": 1200,
  "engagements": 350,
  "conversionRate": 5.8,  // Percentage
  "message": "Data alert! 📊 Your latest brand insights are in. Let's decode this together and skyrocket your reach!"
}
```

**GET /social-media/trends**

- Provides insights into current social media relevant to the freelancer's industry. 

Parameters:
- 'industry': The user's industry of service

Response:
```
{
  "success": true,
  "industry": "Corporate Life",
  "trends": {
    "soundtracks": [
      {"title": "Let's Dance - Emma Stone", "artist": "Sunny", "usage": "high"},
      {"title": "Shalom", "artist": "City Life Worship", "usage": "medium"}
    ],
    "influencers": [
      {"name": "chloe.shih", "followers": 219000},
      {"name": "cloudsjoo", "followers": 188000}
    ],
    "contentStrategies": [
      {"type": "Instagram Stories", "recommendations": "Use vibrant visuals with interactive polls"},
      {"type": "Facebook Posts", "recommendations": "Engage users with weekly fashion tips"}
    ]
  },
  "message": "Explore the latest trends by Influencers in the Corporate Industry to enhance your brand's social media presence!"
}

```
**POST /feedback**

- Collects feedback from users about the platform. 

Parameters:
- 'userId'
- 'feedback' - Feedback from the user

Response:

{ 
    "success": true,
    "message": "Thank you for your feedback! We strive to get your path to thriving in the industry, better."

}
### Auth

- JWT auth
    - Upon logging in via POST users/login, the user received a JWT which is used for subsequent requests made to endpoints. 
    - Thereafter, JWTs are stored in the browser's sessionStorage and is cleared upon tab closure. 

## Roadmap

**Initial Setup**
- Create client
    - Set up a React project with routing and boilerplate pages

- Create server
    - Set up an Express project with basic routing and HTTP responses.

**Database Setup**
- Define Schema - the Users' Credentials table, Marketing Plans Table, Analytics Table and Survey Responses Table.

- Create SQL migration scripts

- Seed the database with initial data for development testing. 

**Core Features Setup** 

- Implement sign up and login pages

- Develop 'POST /users/signup' and 'POST /users/login' endpoints. 

- Implement JWT for user authentication and session management.

**ThrivingAF Main Function Development** 
- Draft a detailed survey page to collect user input. 

- Implement 'GET /marketing-plan/survey' endpoint to serve survey questions.

- Develop functionality to create personalized marketing plans based on survey responses. 

- Implement the 'POST /marketing-plans' endpoint. 

- Apply a feature to fetch and list current social media trends relevant to the user's industry. 

- Develop the 'GET /social-media/trends endpoint for the same. 

**UI/UX Improvisation** 

- Develop a response and interactive website that adjusts based on user interactions and input. 

- Allow users to share their feedback. 

**Development and Testing** 

- Ensure all commits are pushed to the repository for real-time testing and feedback. 

- Set up CI/CD pipelines to automate deployment process. 

**Final Stages**

- Regularly adjust and fix any issues that arise while testing the application. 

- Prepare a Presentation deck showcasing key features and scope of 'ThrivingAF' in the near future on DEMO Day. 

## Nice-to-haves

- Forgot password functionality
- A more robust content recommendation engine that offers insights into what's trending across social platforms.
- Enabling social media login to facilitate data integration and thereafter offer valuable inights. 
- Providing more detailed analytics on user engagement. 
- User Rewards extended to users who have launched successful campaigns with ThrivingAF's assistance. 
-