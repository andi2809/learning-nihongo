import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Eye, EyeOff, BookmarkPlus, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Token {
  word: string;
  reading: string | null;
  meaning: string;
  type: string;
}

interface Sentence {
  text: string;
  tokens: Token[];
}

interface Passage {
  title: string;
  title_reading?: string;
  sentences: Sentence[];
}

interface PassageData {
  id: string;
  topic: string;
  level: string;
  title: string;
  content: Passage;
  character_count: number;
}

export default function Learn() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [passage, setPassage] = useState<PassageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFurigana, setShowFurigana] = useState(true);
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [readingComplete, setReadingComplete] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (id && user) {
      fetchPassage();
      fetchSavedVocabulary();
    }
  }, [id, user, authLoading]);

  const fetchPassage = async () => {
    try {
      const { data, error } = await supabase
        .from("reading_passages")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error("Passage not found");
        navigate("/");
        return;
      }

      setPassage(data as PassageData);
    } catch (error) {
      console.error("Error fetching passage:", error);
      toast.error("Failed to load passage");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedVocabulary = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("vocabulary")
        .select("word")
        .eq("user_id", user.id);

      if (error) throw error;
      setSavedWords(new Set(data?.map((v) => v.word) || []));
    } catch (error) {
      console.error("Error fetching vocabulary:", error);
    }
  };

  const saveWord = async (token: Token) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("vocabulary").insert({
        user_id: user.id,
        word: token.word,
        reading: token.reading,
        meaning: token.meaning,
        word_type: token.type,
      });

      if (error) throw error;
      
      setSavedWords((prev) => new Set([...prev, token.word]));
      toast.success(`「${token.word}」 saved to vocabulary!`);
    } catch (error) {
      console.error("Error saving word:", error);
      toast.error("Failed to save word");
    }
  };

  const completeReading = async () => {
    if (!user || !passage || readingComplete) return;

    try {
      await supabase.rpc("update_user_progress", {
        p_user_id: user.id,
        p_characters_read: passage.character_count,
      });

      setReadingComplete(true);
      toast.success(`+${passage.character_count} XP earned!`);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-soft text-muted-foreground">Loading passage...</div>
      </div>
    );
  }

  if (!passage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Passage not found</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background paper-texture">
      {/* Reading Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {showFurigana ? (
                <Eye className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              <Label htmlFor="furigana-toggle" className="text-sm cursor-pointer">
                Furigana
              </Label>
              <Switch
                id="furigana-toggle"
                checked={showFurigana}
                onCheckedChange={setShowFurigana}
              />
            </div>
            
            <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
              {passage.level}
            </span>
          </div>
        </div>
      </header>

      {/* Reading Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <article className="animate-fade-in">
          {/* Title */}
          <header className="text-center mb-12">
            <div className="inline-block">
              {showFurigana && passage.content.title_reading ? (
                <ruby className="text-3xl md:text-4xl font-bold text-foreground">
                  {passage.content.title}
                  <rt className="text-sm text-muted-foreground">{passage.content.title_reading}</rt>
                </ruby>
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {passage.content.title}
                </h1>
              )}
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Topic: {passage.topic} • {passage.character_count} characters
            </p>
          </header>

          {/* Sentences */}
          <div className="space-y-8 reading-mode text-xl md:text-2xl font-japanese">
            {passage.content.sentences.map((sentence, sentenceIdx) => (
              <p key={sentenceIdx} className="leading-loose">
                {sentence.tokens.map((token, tokenIdx) => (
                  <Popover key={`${sentenceIdx}-${tokenIdx}`}>
                    <PopoverTrigger asChild>
                      <span className="token-hover inline-block">
                        {showFurigana && token.reading ? (
                          <ruby>
                            {token.word}
                            <rt>{token.reading}</rt>
                          </ruby>
                        ) : (
                          token.word
                        )}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-4" align="center">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xl font-bold font-japanese">{token.word}</p>
                            {token.reading && (
                              <p className="text-sm text-muted-foreground">{token.reading}</p>
                            )}
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground capitalize">
                            {token.type}
                          </span>
                        </div>
                        <p className="text-sm border-t border-border pt-3">{token.meaning}</p>
                        
                        {savedWords.has(token.word) ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-green-600" />
                            Already saved
                          </div>
                        ) : (
                          <Button
                            variant="sakura"
                            size="sm"
                            className="w-full"
                            onClick={() => saveWord(token)}
                          >
                            <BookmarkPlus className="h-4 w-4 mr-2" />
                            Save to Vocabulary
                          </Button>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </p>
            ))}
          </div>

          {/* Complete Reading */}
          <div className="mt-16 text-center">
            {readingComplete ? (
              <div className="p-6 rounded-xl bg-sakura/30 border border-sakura-dark/20 animate-fade-in">
                <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium">Reading Complete!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  +{passage.character_count} XP earned
                </p>
                <Button
                  variant="vermillion"
                  className="mt-4"
                  onClick={() => navigate("/")}
                >
                  Generate Another Passage
                </Button>
              </div>
            ) : (
              <Button
                variant="vermillion"
                size="lg"
                onClick={completeReading}
              >
                Mark as Complete (+{passage.character_count} XP)
              </Button>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
