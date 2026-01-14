import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Sparkles, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"];

const TOPIC_SUGGESTIONS = [
  "Daily life in Tokyo",
  "Cyberpunk future",
  "Traditional tea ceremony",
  "Summer festival",
  "School life",
  "Travel adventures",
];

export default function Index() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("N5");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for your reading passage");
      return;
    }

    if (!user) {
      toast.error("Please sign in to generate reading passages");
      navigate("/auth");
      return;
    }

    setGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-reading", {
        body: { topic, level },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      // Save the passage to database
      const { data: savedPassage, error: saveError } = await supabase
        .from("reading_passages" as any)
        .insert({
          user_id: user.id,
          topic,
          level,
          title: data.passage.title,
          content: data.passage,
          character_count: data.characterCount,
        })
        .select()
        .single();

      if (saveError) throw saveError;

      toast.success("Reading passage generated!");
      navigate(`/learn/${(savedPassage as any).id}`);
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate passage");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-soft text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background paper-texture">
      {/* Navigation */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-vermillion" />
            <span className="text-xl font-bold text-foreground">JapanReader AI</span>
          </div>
          
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/roadmap")}>
              <Map className="h-4 w-4 mr-2" />
              Roadmap
            </Button>
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/account")}>
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="vermillion" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Master Japanese Reading
              <span className="block mt-2 text-vermillion ink-brush inline-block">
                with AI
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Generate personalized reading passages tailored to your JLPT level. 
              Click any word to see its meaning and save vocabulary.
            </p>
          </div>

          {/* Generator Card */}
          <Card className="mt-12 shadow-lg border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <Label htmlFor="topic" className="text-base font-medium">
                    What would you like to read about?
                  </Label>
                  <Input
                    id="topic"
                    placeholder="e.g., A day in Tokyo, samurai legends..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-12 text-base bg-background"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {TOPIC_SUGGESTIONS.slice(0, 3).map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setTopic(suggestion)}
                        className="text-xs px-3 py-1.5 rounded-full bg-sakura/50 text-accent-foreground hover:bg-sakura transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="level" className="text-base font-medium">
                    Your JLPT Level
                  </Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger id="level" className="h-12 text-base bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {JLPT_LEVELS.map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl} {lvl === "N5" ? "(Beginner)" : lvl === "N1" ? "(Advanced)" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">
                    Grammar and vocabulary will match your level
                  </p>
                </div>
              </div>

              <Button
                variant="hero"
                size="xl"
                className="w-full mt-4"
                onClick={handleGenerate}
                disabled={generating || !topic.trim()}
              >
                {generating ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    Generating your passage...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Reading Passage
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                title: "Smart Tokenization",
                description: "Every word is clickable. Tap to see meaning, reading, and word type.",
                icon: "📖",
              },
              {
                title: "JLPT Optimized",
                description: "AI generates content matching N5-N1 grammar and vocabulary guidelines.",
                icon: "🎯",
              },
              {
                title: "Track Progress",
                description: "Earn XP for reading, level up your rank, and build your vocabulary.",
                icon: "📈",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`p-6 rounded-xl bg-card/50 border border-border/30 text-left animate-fade-in stagger-${i + 1}`}
                style={{ opacity: 0, animationDelay: `${(i + 1) * 0.15}s` }}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          JapanReader AI — Learn Japanese through immersive reading
        </div>
      </footer>
    </div>
  );
}
