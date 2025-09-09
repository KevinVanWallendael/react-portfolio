import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Github, ExternalLink, BarChart3, Database, Brain, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile"; // Corrected import path

const BlogSection = () => {
  const isMobile = useIsMobile();
  const [activeArticle, setActiveArticle] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const articles = [
    {
      id: 0,
      title: "Empowering Financial Insights",
      subtitle: "My Stock Portfolio Analyzer Project",
      category: "Financial Analysis",
      icon: BarChart3,
      tags: ["Python", "yfinance", "pandas", "matplotlib", "plotly", "fpdf"],
      githubUrl: "https://github.com/KevinVanWallendael/StockPortfolioAnalyzer",
      content: {
        intro: "In today's fast-paced world, making informed decisions is crucial, whether in our professional or personal lives. My Stock Portfolio Analyzer project is a testament to the power of data-driven insights, particularly in the realm of personal finance.",
        description: "This project is a Python-based application designed to provide a clear and comprehensive view of stock portfolio performance. It's about taking the complexity out of investment analysis and making it accessible.",
        features: [
          {
            title: "Performance Tracking",
            points: [
              "The application calculates key performance indicators, giving users a clear understanding of how their investments are performing.",
              "It compares portfolio performance against market benchmarks, providing context and perspective."
            ]
          },
          {
            title: "Risk Assessment",
            points: [
              "The tool analyzes portfolio volatility, helping users understand the level of risk associated with their investments.",
              "This allows for better risk management."
            ]
          },
          {
            title: "Data-Driven Insights",
            points: [
              "By incorporating technical indicators, the application provides users with data-driven insights that can inform their investment decisions."
            ]
          },
          {
            title: "Accessible Reporting",
            points: [
              "The project generates easy-to-understand reports in both Excel and PDF formats, making it simple to review and share portfolio performance.",
              "Visualizations are also generated, for easy comprehension."
            ]
          }
        ],
        impact: [
          "Gain Clarity: Simplify complex financial data and gain a clear understanding of investment performance.",
          "Make Informed Decisions: Use data-driven insights to make smarter investment choices.",
          "Track Progress: Easily monitor portfolio performance over time."
        ],
        technical: [
          "Data Acquisition: Seamlessly fetching financial data from reliable sources.",
          "Data Analysis: Performing calculations and generating key performance metrics.",
          "Reporting and Visualization: Creating clear and concise reports and graphs."
        ]
      }
    },
    {
      id: 1,
      title: "Unlocking Warsaw's Real Estate Market",
      subtitle: "Otodom Scraper Project",
      category: "Web Scraping",
      icon: Database,
      tags: ["Python", "Selenium", "WebDriver", "CSV", "JSON", "Data Collection"],
      githubUrl: "https://github.com/KevinVanWallendael/OtodomScraper",
      content: {
        intro: "Real estate data is a goldmine for insights, whether you're a potential buyer, an investor, or simply curious about market trends. To explore the Warsaw apartment market, I developed a Python-based web scraper that efficiently gathers data from Otodom.pl, a popular Polish real estate portal.",
        description: "This project leverages Selenium and WebDriver Manager to automate browsing and data extraction from Otodom.pl. It navigates through multiple pages of apartment listings in Warsaw, Mazowieckie, and collects key information such as price, location, size, and property features.",
        features: [
          {
            title: "Key Features",
            points: [
              "Automated Data Collection: Uses Selenium to simulate user interaction, handling dynamic content and cookie consent popups.",
              "Comprehensive Data Extraction: Scrapes essential details like price, title, location, size, number of rooms, and various property features.",
              "Data Storage: Saves the scraped data in both CSV and JSON formats for easy analysis and manipulation.",
              "Efficient Navigation: Navigates through multiple pages of listings, maximizing data collection."
            ]
          }
        ],
        impact: [
          "Market Insights: Offers a snapshot of apartment listings in Warsaw, enabling analysis of pricing trends and property features.",
          "Data Accessibility: Provides data in structured formats (CSV and JSON) for further analysis using tools like Excel, Pandas, or data visualization libraries.",
          "Automation Skills: Demonstrates proficiency in web scraping and automation using Selenium, a valuable skill in data-driven projects."
        ],
        technical: [
          "Selenium: For web browser automation and interaction.",
          "WebDriver Manager: To automatically manage ChromeDriver installation.",
          "CSV and JSON: For data storage and serialization."
        ]
      }
    },
    {
      id: 2,
      title: "Predicting Warsaw Housing Prices",
      subtitle: "Housing Price Prediction",
      category: "Machine Learning",
      icon: Brain,
      tags: ["Python", "XGBoost", "Machine Learning", "Feature Engineering", "Data Science"],
      githubUrl: "https://github.com/KevinVanWallendael/HousingPricePrediction",
      content: {
        intro: "For this project, I delved into the world of machine learning to build a housing price prediction model for Warsaw, Poland. Using data scraped from Otodom.pl with Selenium, I aimed to create a robust model that accurately predicts apartment prices based on various features.",
        description: "This project involved a comprehensive data science workflow, from data collection and preprocessing to model training and evaluation. The dataset, containing information on property details such as size, rent, location, and amenities, was meticulously cleaned and transformed to prepare it for machine learning.",
        features: [
          {
            title: "Key Steps",
            points: [
              "Data Collection: Scraped data from Otodom.pl using Selenium.",
              "Data Preprocessing: Cleaned and transformed the data, handling missing values, outliers, and formatting issues.",
              "Feature Engineering: Created new features like price per square meter and binary amenity indicators.",
              "Model Training: Trained an XGBoost regression model using the preprocessed data.",
              "Model Evaluation: Evaluated the model's performance using appropriate metrics."
            ]
          },
          {
            title: "Data Preprocessing Highlights",
            points: [
              "Cleaning 'size' and 'Czynsz' columns: Removing units and formatting issues, converting to numeric types.",
              "Handling missing values: Imputing missing values and creating a missing indicator for 'Czynsz'.",
              "Extracting location information: Deriving city, neighborhood, and region from the location column.",
              "Creating 'price per square meter': A crucial feature for understanding pricing dynamics.",
              "Removing outliers: Using the IQR method to ensure robust model performance.",
              "Log transforming the target variable: Reducing skewness in the 'price' distribution."
            ]
          }
        ],
        impact: [
          "Applied machine learning to solve real-world housing market problems.",
          "Demonstrated the importance of thorough data preprocessing and feature engineering.",
          "Showcased XGBoost's capability in handling complex datasets for accurate predictions."
        ],
        technical: [
          "Preprocessing pipelines: Separate pipelines for numerical and categorical features.",
          "XGBoost regressor: Tuned with parameters like n_estimators, learning_rate, and max_depth.",
          "Model evaluation: Using metrics like Mean Absolute Error (MAE) to assess prediction accuracy."
        ]
      }
    },
    {
      id: 3,
      title: "The Impact of CEO Tweets on Stock Returns",
      subtitle: "An Event Study Analysis - Master Thesis",
      category: "Academic Research",
      icon: BookOpen,
      tags: ["Event Study", "Finance", "Social Media", "Sentiment Analysis", "Master Thesis"],
      pdfUrl: "/documents/Master_Thesis_Kevin_Van_Wallendael.pdf",
      content: {
        intro: "Twitter, founded in 2006, has become one of the most popular social media platforms, with over 415 million users worldwide (Statista, 2023). It is widely used by individuals, including celebrities, CEOs, and politicians, as a channel for information sharing and communication. The influence of social media information on financial markets has been studied for decades. This dissertation investigates the impact of CEO tweets on their respective company stock returns.",
        description: "This dissertation investigates the impact of CEO tweets on stock returns, focusing on the relationship between CEO sentiment expressed on Twitter and the corresponding stock market performance of their respective companies. The study utilizes an event study methodology and categorizes CEO tweets into positive, neutral, and negative sentiments. The findings indicate that while there is evidence of a weak association between CEO sentiment and stock returns, the overall impact of CEO tweets is statistically insignificant.",
        features: [
          {
            title: "Research Hypotheses",
            points: [
              "H1: CEO tweets have a statistically significant impact on stock returns.",
              "H2: The stock prices of companies experience a positive impact when a CEO tweets with a positive sentiment.",
              "H3: The stock prices of companies experience a negative impact when a CEO tweets with a negative sentiment.",
              "H4: The stock prices of companies experience minimal impact when a CEO tweets with a neutral sentiment.",
              "H5: The abnormality caused by a CEO tweet dissipates within a short period."
            ]
          }
        ],
        impact: [
          "The findings suggest that CEO sentiment on Twitter has minimal predictive power and limited influence on stock market performance.",
          "Results support the rejection of H1, H2, and H4, but support the acceptance of H3 (negative sentiment has a slight negative impact) and H5 (abnormality dissipates quickly).",
          "This study contributes empirical evidence that CEO sentiment on Twitter has a limited impact, highlighting the importance of considering other factors in financial markets."
        ],
        technical: [
          "Methodology: An event study was conducted for CEOs like Elon Musk, Tim Cook, and Jeff Bezos.",
          "Analysis Tools: Pearson correlation coefficients and Granger causality tests were used to assess the strength and predictive power of sentiment.",
          "Conclusion: Regardless of sentiment, CEO tweets did not have a statistically significant effect on their company's stock performance during three-day and one-day event windows."
        ]
      }
    }
  ];

  const currentArticle = articles[activeArticle];
  const Icon = currentArticle.icon;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 py-section pb-20 md:pb-section">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Technical Blog</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Detailed insights into my projects, methodologies, and technical approaches. 
            Exploring data science, web scraping, and machine learning through real-world applications.
          </p>
        </div>

        {isMobile ? (
          // Mobile: Simplified Card Layout
          <div className="space-y-4">
            {articles.map((article, index) => {
              const Icon = article.icon;
              const isActive = activeArticle === index;
              
              return (
                <div 
                  key={article.id} 
                  className={`bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg transition-all duration-300 ${
                    isActive ? 'ring-2 ring-accent/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge className="mb-2 bg-accent/10 text-accent border-accent/20 text-xs">
                        {article.category}
                      </Badge>
                      <h3 className="text-sm font-bold text-foreground mb-1 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {article.subtitle}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {isActive && isExpanded 
                          ? article.content.intro 
                          : `${article.content.intro.substring(0, 100)}...`
                        }
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-accent p-0 h-auto font-medium"
                            onClick={() => {
                              setActiveArticle(index);
                              setIsExpanded(!isExpanded);
                            }}
                          >
                            {isActive && isExpanded ? 'Show Less' : 'Read More'}
                          </Button>
                          {article.githubUrl && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs p-0 h-auto"
                              onClick={() => window.open(article.githubUrl, '_blank')}
                            >
                              <Github size={12} className="mr-1" />
                              Code
                            </Button>
                          )}
                          {article.pdfUrl && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs p-0 h-auto"
                              onClick={() => window.open(article.pdfUrl, '_blank')}
                            >
                              <ExternalLink size={12} className="mr-1" />
                              Thesis
                            </Button>
                          )}
                        </div>
                        {!isActive && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-accent p-1 h-auto"
                            onClick={() => setActiveArticle(index)}
                          >
                            Select
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Desktop: Original Layout
          <>
            {/* Article Navigation */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-2">
              {articles.map((article, index) => (
                <Button
                  key={article.id}
                  variant={activeArticle === index ? "default" : "nav"}
                  onClick={() => setActiveArticle(index)}
                  className="flex items-center gap-2 min-h-[44px] text-sm md:text-base px-3 md:px-4"
                >
                  <article.icon size={16} className="md:w-[18px] md:h-[18px]" />
                  <span className="hidden sm:inline">{article.category}</span>
                  <span className="sm:hidden">{article.category.split(' ')[0]}</span>
                </Button>
              ))}
            </div>

            {/* Article Content */}
            <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
              {/* Article Header */}
              <div className="bg-background/80 backdrop-blur-sm p-4 md:p-8 border-b border-border/30">
                <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-4">
                  <div className="p-2 md:p-3 bg-accent/10 rounded-xl">
                    <Icon size={24} className="text-accent md:w-8 md:h-8" />
                  </div>
                  <div className="flex-1">
                    <Badge className="mb-2 md:mb-3 bg-accent/10 text-accent border-accent/20 text-xs md:text-sm">
                      {currentArticle.category}
                    </Badge>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
                      {currentArticle.title}
                    </h3>
                    <p className="text-base md:text-xl text-muted-foreground">
                      {currentArticle.subtitle}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                  {currentArticle.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-secondary/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                {currentArticle.githubUrl && (
                  <Button 
                    variant="nav" 
                    className="gap-2 min-h-[44px] text-sm md:text-base"
                    onClick={() => window.open(currentArticle.githubUrl, '_blank')}
                  >
                    <Github size={16} className="md:w-[18px] md:h-[18px]" />
                    View on GitHub
                  </Button>
                )}
                {currentArticle.pdfUrl && (
                  <Button 
                    variant="nav" 
                    className="gap-2 min-h-[44px] text-sm md:text-base"
                    onClick={() => window.open(currentArticle.pdfUrl, '_blank')}
                  >
                    <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" />
                    View Thesis
                  </Button>
                )}
              </div>

              {/* Article Body */}
              <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-background/60 backdrop-blur-sm">
                {/* Introduction */}
                <div>
                  <p className="text-sm sm:text-base md:text-lg text-foreground leading-relaxed mb-3 md:mb-4">
                    {currentArticle.content.intro}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {currentArticle.content.description}
                  </p>
                </div>

                {/* Features */}
                {currentArticle.content.features.map((section, index) => (
                  <div key={index}>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                      {section.title}
                    </h4>
                    <ul className="space-y-2 md:space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2 md:gap-3">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Impact */}
                <div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                    Why This Project Matters
                  </h4>
                  <ul className="space-y-2 md:space-y-3">
                    {currentArticle.content.impact.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <div className="w-1.push h-1.5 md:w-2 md:h-2 bg-accent rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Implementation */}
                <div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                    Technical Implementation
                  </h4>
                  <ul className="space-y-2 md:space-y-3">
                    {currentArticle.content.technical.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-6 md:mt-8 px-2">
              <Button
                variant="nav"
                onClick={() => setActiveArticle((prev) => (prev - 1 + articles.length) % articles.length)}
                className="flex items-center gap-1 md:gap-2 min-h-[44px] text-sm md:text-base px-3 md:px-4"
              >
                <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              
              <div className="flex gap-1 md:gap-2">
                {articles.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeArticle ? 'bg-accent' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="nav"
                onClick={() => setActiveArticle((prev) => (prev + 1) % articles.length)}
                className="flex items-center gap-1 md:gap-2 min-h-[44px] text-sm md:text-base px-3 md:px-4"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;