import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DemoModal } from "@/components/ui/demo-modal";
import { ExternalLink, Github, BarChart3, Database, Brain, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ProjectsSection = () => {
  const isMobile = useIsMobile();
  const [selectedDemo, setSelectedDemo] = useState<{ title: string; url: string } | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<{[key: number]: boolean}>({});
  const projects = [
    {
      id: 1,
      title: "Stock Portfolio Analyzer & Performance Tracker",
      description: "Comprehensive financial analysis tool providing real-time portfolio performance tracking, risk assessment metrics (Sharpe ratio, Beta, Treynor ratio), technical indicators (RSI, moving averages), S&P 500 benchmarking, and automated report generation in Excel and PDF formats.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "Streamlit", "yfinance", "Pandas", "Plotly", "Matplotlib", "FPDF", "NumPy"],
      category: "Financial Analytics",
      icon: TrendingUp,
      links: {
        demo: "https://kevinvw.streamlit.app/?embed=true",
        github: "https://github.com/KevinVanWallendael/StockPortfolioAnalyzer"
      }
    },
    {
      id: 2,
      title: "Warsaw Real Estate Market Scraper",
      description: "Automated web scraping solution that efficiently extracts comprehensive real estate data from Otodom.pl, handling dynamic content with Selenium WebDriver, providing structured datasets for market analysis with robust error handling and multi-format data export capabilities.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "Selenium", "WebDriver Manager", "CSV", "JSON", "Web Scraping"],
      category: "Data Engineering",
      icon: Database,
      links: {
        demo: "https://kevinvw.streamlit.app/housing_project/?embed=true",
        github: "https://github.com/KevinVanWallendael/OtodomScraper"
      }
    },
    {
      id: 3,
      title: "Warsaw Housing Price Prediction Model",
      description: "Interactive machine learning web application that predicts apartment prices in Warsaw using XGBoost regression. Features comprehensive data preprocessing, feature engineering, interactive neighborhood mapping, real-time predictions, and feature importance visualization for market insights.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "XGBoost", "Streamlit", "Pandas", "Scikit-learn", "Machine Learning", "Seaborn"],
      category: "Machine Learning",
      icon: Brain,
      links: {
        demo: "https://kevinvw.streamlit.app/housing_project/?embed=true",
        github: "https://github.com/KevinVanWallendael/HousingPricePrediction"
      }
    }
  ];

  const toggleProject = (id: number) => {
    setExpandedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-section pb-20 md:pb-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="section-heading mb-6">Featured Projects</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of data science projects showcasing expertise in Python development, 
            machine learning, financial analysis, and web scraping with interactive Streamlit applications.
          </p>
        </div>

        {isMobile ? (
          // Mobile: Compact Card Layout
          <div className="space-y-4">
            {projects.map((project) => {
              const Icon = project.icon;
              const isExpanded = expandedProjects[project.id];
              const techsToShow = isExpanded ? project.technologies : project.technologies.slice(0, 3);
              
              return (
                <div key={project.id} className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-foreground leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {isExpanded ? project.description : `${project.description.split('.')[0]}...`}
                      </p>
                      {!isExpanded && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-accent p-0 h-auto font-medium mb-3"
                          onClick={() => toggleProject(project.id)}
                        >
                          Read More
                        </Button>
                      )}
                      {isExpanded && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-accent p-0 h-auto font-medium mb-3"
                          onClick={() => toggleProject(project.id)}
                        >
                          Show Less
                        </Button>
                      )}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {techsToShow.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                            {tech}
                          </Badge>
                        ))}
                        {!isExpanded && project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs px-2 py-1">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="nav" 
                          size="sm" 
                          className="flex-1 text-xs h-8"
                          onClick={() => setSelectedDemo({ title: project.title, url: project.links.demo })}
                        >
                          <ExternalLink size={14} />
                          Demo
                        </Button>
                        <Button 
                          variant="nav" 
                          size="sm" 
                          className="flex-1 text-xs h-8"
                          onClick={() => window.open(project.links.github, '_blank')}
                        >
                          <Github size={14} />
                          Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Desktop: Original Grid Layout
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div key={project.id} className="card-elegant rounded-2xl overflow-hidden group">
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <Icon size={64} className="text-accent/50" />
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Category Badge */}
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      {project.category}
                    </Badge>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant="nav" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedDemo({ title: project.title, url: project.links.demo })}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </Button>
                      <Button 
                        variant="nav" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.open(project.links.github, '_blank')}
                      >
                        <Github size={16} />
                        View Code
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8 md:mt-12">
          <Button variant="hero">
            View All Projects
          </Button>
        </div>

        <DemoModal
          isOpen={!!selectedDemo}
          onClose={() => setSelectedDemo(null)}
          title={selectedDemo?.title || ""}
          demoUrl={selectedDemo?.url || ""}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;