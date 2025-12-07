import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Trophy, BookOpen, Bookmark, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Profile {
  id: string;
  username: string | null;
  current_level: string;
  xp: number;
  rank: string;
  characters_read: number;
}

interface VocabularyItem {
  id: string;
  word: string;
  reading: string | null;
  meaning: string;
  word_type: string | null;
  saved_at: string;
}

interface ReadingPassage {
  id: string;
  title: string;
  topic: string;
  level: string;
  character_count: number;
  created_at: string;
}

const RANKS = [
  { name: "Shoshinsha", xp: 0, label: "Beginner" },
  { name: "Gakusha", xp: 1000, label: "Scholar" },
  { name: "Chukyusha", xp: 5000, label: "Intermediate" },
  { name: "Jukurensha", xp: 10000, label: "Advanced" },
  { name: "Sensei", xp: 25000, label: "Master" },
  { name: "Tatsujin", xp: 50000, label: "Expert" },
];

export default function Account() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [passages, setPassages] = useState<ReadingPassage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, authLoading]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch vocabulary
      const { data: vocabData, error: vocabError } = await supabase
        .from("vocabulary")
        .select("*")
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false });

      if (vocabError) throw vocabError;
      setVocabulary(vocabData || []);

      // Fetch passages
      const { data: passagesData, error: passagesError } = await supabase
        .from("reading_passages")
        .select("id, title, topic, level, character_count, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (passagesError) throw passagesError;
      setPassages(passagesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load account data");
    } finally {
      setLoading(false);
    }
  };

  const deleteVocabulary = async (id: string) => {
    try {
      const { error } = await supabase
        .from("vocabulary")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setVocabulary((prev) => prev.filter((v) => v.id !== id));
      toast.success("Word removed from vocabulary");
    } catch (error) {
      toast.error("Failed to remove word");
    }
  };

  const getCurrentRankProgress = () => {
    if (!profile) return { current: RANKS[0], next: RANKS[1], progress: 0 };
    
    const currentRankIndex = RANKS.findIndex((r) => r.name === profile.rank);
    const current = RANKS[currentRankIndex] || RANKS[0];
    const next = RANKS[currentRankIndex + 1];

    if (!next) return { current, next: null, progress: 100 };

    const xpInLevel = profile.xp - current.xp;
    const xpNeeded = next.xp - current.xp;
    const progress = Math.min((xpInLevel / xpNeeded) * 100, 100);

    return { current, next, progress };
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-soft text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const { current: currentRank, next: nextRank, progress: rankProgress } = getCurrentRankProgress();

  return (
    <div className="min-h-screen bg-background paper-texture">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button variant="ghost" size="sm" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          {/* Profile Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="h-2 xp-gradient" />
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-sakura/30 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-vermillion" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{profile?.username || user?.email}</h1>
                    <p className="text-muted-foreground">
                      {currentRank.name} ({currentRank.label})
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-vermillion">{profile?.xp || 0}</p>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{profile?.characters_read || 0}</p>
                    <p className="text-sm text-muted-foreground">Characters</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{vocabulary.length}</p>
                    <p className="text-sm text-muted-foreground">Vocab</p>
                  </div>
                </div>
              </div>

              {/* Rank Progress */}
              {nextRank && (
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{currentRank.name}</span>
                    <span>{nextRank.name}</span>
                  </div>
                  <Progress value={rankProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {nextRank.xp - (profile?.xp || 0)} XP to next rank
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="vocabulary" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vocabulary" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Vocabulary ({vocabulary.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Reading History ({passages.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vocabulary">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Saved Vocabulary</CardTitle>
                </CardHeader>
                <CardContent>
                  {vocabulary.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No vocabulary saved yet</p>
                      <p className="text-sm mt-1">Click words while reading to save them</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {vocabulary.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className="text-xl font-bold font-japanese">{item.word}</span>
                                {item.reading && (
                                  <span className="text-sm text-muted-foreground">
                                    ({item.reading})
                                  </span>
                                )}
                                {item.word_type && (
                                  <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground capitalize">
                                    {item.word_type}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm mt-1">{item.meaning}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Saved {format(new Date(item.saved_at), "MMM d, yyyy")}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => deleteVocabulary(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Reading History</CardTitle>
                </CardHeader>
                <CardContent>
                  {passages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No reading history yet</p>
                      <Button
                        variant="vermillion"
                        className="mt-4"
                        onClick={() => navigate("/")}
                      >
                        Generate Your First Passage
                      </Button>
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {passages.map((passage) => (
                          <div
                            key={passage.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => navigate(`/learn/${passage.id}`)}
                          >
                            <div>
                              <p className="font-medium font-japanese">{passage.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {passage.topic} • {passage.character_count} chars
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(new Date(passage.created_at), "MMM d, yyyy")}
                              </p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                              {passage.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
