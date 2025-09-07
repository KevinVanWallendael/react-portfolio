import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Knowledge base - comprehensive information about Kevin
const KNOWLEDGE_BASE = `
About Kevin Van Wallendael:
Kevin is a Business Intelligence Engineer with a passion for leveraging data to drive informed decisions. 
He enjoys working with data analysis, automation, and machine learning, and is always eager to explore new ways to solve problems. 
His experience at Amazon has provided him with valuable opportunities to develop and implement data-driven solutions that improve operational efficiency.

Skills & Expertise:
Business Intelligence & Data Warehousing:
- Data Pipelines & ETL
- Dashboarding (Quicksight, Power BI, Streamlit)

Automation & Optimization:
- Process Automation
- Efficiency Improvements (Amazon Experience)

Collaboration & Languages:
- Team Collaboration
- Languages: Dutch, English, Polish

Data Analysis & Machine Learning:
- Data Visualization (Python, Power BI)
- ML (NLP, Time Series)

Cloud Platforms:
- AWS Infrastructure
- Scalable Data Solutions

Certifications:
- MicroStrategy Analyst
- AZ-900 Azure Fundamentals

Featured Projects:
- Portfolio Analysis: https://github.com/KevinVanWallendael/StockPortfolioAnalyzer
- Otodom Web Scraper: https://github.com/KevinVanWallendael/OtodomScraper
- Warsaw Housing Prediction: https://github.com/KevinVanWallendael/HousingPricePrediction

Contact Information:
- Email: kev.vanwallendael@gmail.com
- LinkedIn: https://www.linkedin.com/in/kevin-van-wallendael/
- GitHub: https://github.com/KevinVanWallendael

Fun Facts:
- Vinyl record collector, always hunting for new additions
- Passionate about travel and exploring new cultures, seeking the perfect cup of coffee
- Double nationality: half Belgian and half Polish
- Has lived in Belgium, Finland, Poland, and currently resides in Luxembourg
- Enjoys playing squash in free time
- Big fan of fantasy TV shows like The Wheel of Time and Game of Thrones
- Loves attending concerts, especially Taylor Swift performances!

Project Details:
1. Stock Portfolio Analyzer:
   - Python application for clear stock portfolio performance analysis
   - Tracks performance, assesses risk, and provides data-driven insights
   - Generates reports in Excel and PDF, with visualizations
   - Uses yfinance, pandas, matplotlib, plotly, and fpdf

2. Otodom Scraper:
   - Python web scraper for Warsaw real estate data from Otodom.pl
   - Automates data collection using Selenium and WebDriver Manager
   - Extracts price, location, size, and property features
   - Saves data in CSV and JSON formats

3. Warsaw Housing Price Prediction:
   - Machine learning model to predict housing prices in Warsaw
   - Uses data scraped from Otodom.pl with Selenium
   - Involves data preprocessing, feature engineering, and XGBoost regression
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userMessage } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: "system",
            content: `You are W.A.L.L.Y, Kevin Van Wallendael's helpful AI assistant. Your core functionality is to answer questions about Kevin Van Wallendael. You are his personal coding portfolio assistant for external people to interact with. Here is information about him: ${KNOWLEDGE_BASE}

When responding to user questions, please summarize or extract only the relevant information from the provided knowledge. Limit your response length when talking specifically about him. We want to encourage follow up questions and a flowing conversation. Feel free to use emojis to make you appear friendly and cool. Kevin is Gen-Z and loves the cool emojis.`
          },
          ...messages.slice(-5), // Keep last 5 messages for context
          userMessage
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantReply = data.choices[0].message?.content || "I'm having trouble processing that. Can you try rephrasing your question?";

    return new Response(JSON.stringify({ content: assistantReply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-wally function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});