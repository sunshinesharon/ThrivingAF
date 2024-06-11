# Project Title
ThrivingAF (Thriving as Freelancers)

Market Like a Boss. 

![ThrivingAF Demo](src/assets/images/Features.gif)

## Overview
ThrivingAF is an AI-powered Marketing tool designed to empower Freelancers and  solopreneurs to craft compelling personal brands and execute effective marketing strategies.

### Problem

Freelancers and Solopreneurs wear many hats and they often lack the time and resources to effectively market themselves. More often than not they need help with; 

- Developing and maintaining a clear and consistent brand identity that sets them apart from their competition.
- Crafting targeted marketing messages that resonate with their prospects.
- Creating high-quality content to promote across online channels.
- Navigating the complexities of social media marketing to reach and engage their target audience.

ThrivingAF addresses these challenges by providing a user-friendly platform encompassing features and resources designed to streamline the marketing process.

### User Profile

ThrivingAF targets; 
- **Freelancers**: Individuals who offer their skills and services on a project basis.
- **Solopreneurs**: Independent business owners managing their own operations.

These groups may have varying levels of marketing experience, regardless of whether they do, they share a common desire to build a strong personal brand. You may ask, why can't they rely on general AI platforms like ChatGPT, Gemini and Perplexity? Though these platforms provide valuable insights, ThrivingAF aims to offer a specialized approach with marketing strategies that are not only personalized to one's brand nuances but also resonate with current trends. This tailored support ensures authenticity in branding, giving back time to freelancers to focus their efforts on other brand objectives, ultimately helping them stand out in a competitive landscape. 

### Features

- Access to **personalized marketing plans** based on industry and personal goals.
- Coming Soon: **Industry Insights** to help enhance their online presence and engagement.
- Single platform management for all aspects of personal brand building.
- Effortless measurement and tracking of performance since implementing action plan provided. (Coming Soon)

## Implementation

### Tech Stack

**Frontend:**
- **React**
- **SCSS**
- **MUI (Material-UI)**
- **Axios**
- **jsPDF**: For enabling the user to generate their marketing plan in the form a pdf.
- **Firebase**: For Gmail authentication. 
- **React Router DOM**: For routing in React applications.

**Build Tools:**
- **Vite**: For fast build and hot module replacement.
- **CSS Loader**: For processing CSS files.
- **Sass Loader**: For compiling Sass to CSS.
- **Style Loader**: For injecting styles into the DOM.

**Backend:**
- **Python**: For AI-Agents.
- **Flask**

**Environment Management:**
- **Virtual Environment (venv)**: For managing main.py

**APIs:**
- **Llama3 API**: For generating personalized marketing plans.
- **Firebase**: For authentication and database services.

**Dependency Management:**
- **npm**


### Setup Instructions 

**Client Setup**
- Navigate to client directory - cd client
- npm install 
- npm run dev 

**AI Agent Setup**
- Navigate to the ai_agent directory - cd ai_agent
- Install the required Python3 packages - 
python3 -m pip install crewai
python3 -m pip install flask
python3 -m pip install pyyaml
python3 -m pip install Flask-Cors

- (**Optional**) If you face version conflicts or issues installing the python packages, activate the virtual environment by: 
- source ai-agents-env/bin/activate

- Then navigate to the src directory and run the main.py file:
- cd src
- python3 main.py
   
### Sitemap
- Log in / Sign Up (a.k.a Home)
- Question Page to help craft a holistic Marketing Plan 
- Response Page with AI-generated Marketing Plan
- Nav Bar - Why Thriving (About ThrivingAF), Pricing (Currenly in Beta hence, encouraging Sign ups), Freelance Hub (Coming Soon)

### API Usage

Here's an example of how we use the Llama3 API to generate personalized marketing plans:

**Input:**
```json
{
  "question_and_answer": [
    {
      "id": 1,
      "question": "What's your secret sauce?",
      "answer": "I offer industry updates to my followers on Instagram. My followers get to know the latest updates, developments and trends in the Tech Industry. I'm a Genz Influencer and I seek to inform and educate."
    },
    {
      "id": 2,
      "question": "Who's your dream client?",
      "answer": "My clients are tech brands who'd like to collaborate with me to feature their product."
    },
    {
      "id": 3,
      "question": "What's your story?",
      "answer": "I have a passion for all things software and tech. I love to tech-nically do what excites!"
    },
    {
      "id": 4,
      "question": "What are your marketing goals?",
      "answer": "I'd like to partner with more tech brands, garner more followers on my Instagram and YouTube. Eventually, be renowned in the industry as I offer great tech recommendations."
    },
    {
      "id": 5,
      "question": "Are you currently using any marketing channels?",
      "answer": "Yes, Instagram and YouTube. I have 400K followers on YouTube."
    },
    {
      "id": 6,
      "question": "What's your budget for marketing each month?",
      "answer": "Around $500 each month depending on important events in the tech industry."
    },
    {
      "id": 7,
      "question": "How will you measure success?",
      "answer": "Brand Collab inquiries, video views, video saves, and profile followers."
    },
    {
      "id": 8,
      "question": "Who's your competition?",
      "answer": "Other Tech passionate individuals keeping people informed on the latest trends and updates in the tech industry, also the Instagram algorithm that is constantly changing."
    },
    {
      "id": 9,
      "question": "What are your biggest roadblocks?",
      "answer": "I'm great at tech but not with crafting a marketing plan."
    },
    {
      "id": 10,
      "question": "How do you stay connected with clients after a project?",
      "answer": "I reach out to them with any further suggestions since the Marketing landscape is shifting swiftly."
    }
  ]
}

{
  "title": "Personalized Marketing Plan",
  "executive_summary": "Your executive summary here...",
  "target_audience": "Detailed description of the target audience...",
  "marketing_goals": "List of marketing goals...",
  "marketing_strategies": "Proposed marketing strategies...",
  "content_marketing": "Content marketing plan...",
  "social_media_engagement": "Social media engagement tactics...",
  "industry_networking": "Networking strategies within the industry...",
  "search_engine_optimization": "SEO strategies...",
  "client_retention": "Client retention plans...",
  "budget_allocation": "Budget allocation details...",
  "additional_recommendations": "Any additional recommendations..."
}

## Nice-to-haves

- Forgot password functionality
- A more robust content recommendation engine that offers insights into what's trending across social platforms.
- Enabling social media login to facilitate data integration and thereafter offer valuable inights. 
- Providing more detailed analytics on user engagement. 
- User Rewards extended to users who have launched successful campaigns with ThrivingAF's assistance. 