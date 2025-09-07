import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Database, Code, Brain, TrendingUp, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SkillsSection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("data");
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});

  const skillCategories = {
    data: {
      title: "Data & BI",
      icon: BarChart3,
      skills: [
        "Power BI", "Tableau", "SQL Server", "Amazon QuickSight",
        "Python", "R", "Excel Advanced", "DAX", "PowerQuery",
        "Data Modeling", "ETL Processes", "Statistical Analysis"
      ]
    },
    tech: {
      title: "Tech & Tools",
      icon: Code,
      skills: [
        "Amazon Web Services", "SQL", "Python", "Git",
        "APIs", "Automation", "Cloud Computing", "Database Design"
      ]
    },
    business: {
      title: "Business Skills",
      icon: TrendingUp,
      skills: [
        "Strategic Planning", "Project Management",
        "Business Analysis", "Process Optimization", "KPI Development",
        "Financial Analysis", "Reporting", "Presentation Skills"
      ]
    },
    leadership: {
      title: "Soft Skills",
      icon: Users,
      skills: [
        "Cross-functional Collaboration", "Mentoring",
        "Change Management", "Communication", "Problem Solving",
        "Decision Making", "Innovation", "Training & Development"
      ]
    }
  };

  const toggleCategory = (key: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 py-section pb-20 md:pb-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Skills & Expertise</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set spanning data analytics, business intelligence, 
            and technology leadership developed through years of hands-on experience.
          </p>
        </div>

        {isMobile ? (
          // Mobile: Compact Grid Layout
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(skillCategories).map(([key, category]) => {
              const Icon = category.icon;
              const isExpanded = expandedCategories[key];
              const skillsToShow = isExpanded ? category.skills : category.skills.slice(0, 4);
              
              return (
                <div key={key} className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={20} className="text-accent" />
                    <h3 className="text-sm font-bold text-foreground">{category.title}</h3>
                  </div>
                  <div className="space-y-1">
                    {skillsToShow.map((skill, index) => (
                      <div key={index} className="text-xs text-muted-foreground bg-background/60 rounded px-2 py-1">
                        {skill}
                      </div>
                    ))}
                    {category.skills.length > 4 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-accent p-1 h-auto font-medium mt-2"
                        onClick={() => toggleCategory(key)}
                      >
                        {isExpanded ? "Show Less" : `+${category.skills.length - 4} more`}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Desktop: Tab Layout
          <>
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-2">
              {Object.entries(skillCategories).map(([key, category]) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={key}
                    variant={activeTab === key ? "default" : "nav"}
                    onClick={() => setActiveTab(key)}
                    className="flex items-center gap-2 min-h-[44px] text-sm md:text-base px-3 md:px-4"
                  >
                    <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="hidden sm:inline">{category.title}</span>
                    <span className="sm:hidden">{category.title.split(' ')[0]}</span>
                  </Button>
                );
              })}
            </div>

            {/* Skills Grid */}
            <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4 md:p-8 shadow-2xl">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-border/30">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                    {React.createElement(skillCategories[activeTab as keyof typeof skillCategories].icon, {
                      size: 32,
                      className: "text-accent"
                    })}
                    <h3 className="text-xl md:text-3xl font-bold text-foreground">
                      {skillCategories[activeTab as keyof typeof skillCategories].title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {skillCategories[activeTab as keyof typeof skillCategories].skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="p-3 md:p-3 text-center bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-default border-2 border-border font-medium shadow-sm flex items-center justify-center min-h-[3rem] text-sm md:text-base"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;