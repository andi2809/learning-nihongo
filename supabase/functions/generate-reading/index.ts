import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const JLPT_GUIDELINES: Record<string, string> = {
  N5: `Level N5 Requirements:
- Use only basic grammar patterns: ~です/~ます form, basic particles (は、が、を、に、で、へ)
- Simple sentence structures, avoid complex clauses
- Use only N5 kanji (about 100 kanji) with furigana for all
- Topics: daily life, greetings, basic descriptions
- Vocabulary: numbers, time, family, common objects, basic verbs/adjectives`,
  
  N4: `Level N4 Requirements:
- Introduce て-form, ない-form, past tense
- Can use conditional (たら), potential form, giving/receiving verbs
- Use N4 kanji (about 300 total) 
- Topics: travel, shopping, simple stories, experiences
- Vocabulary: emotions, weather, transportation, hobbies`,
  
  N3: `Level N3 Requirements:
- Use complex grammar: passive, causative, よう/ために, という
- Compound sentences with conjunctions
- Use N3 kanji (about 650 total)
- Topics: opinions, explanations, social issues at basic level
- More abstract vocabulary, idiomatic expressions`,
  
  N2: `Level N2 Requirements:
- Advanced grammar: ものの、からといって、にもかかわらず
- Formal and written Japanese styles
- Use N2 kanji (about 1000 total)
- Topics: news articles, essays, complex narratives
- Technical and specialized vocabulary`,
  
  N1: `Level N1 Requirements:
- Most complex grammar: 〜ずにはいられない、〜かねない、古文/文語 expressions
- All forms of keigo (尊敬語、謙譲語、丁寧語)
- Use N1 kanji (about 2000 total)
- Topics: academic papers, literature, philosophy, abstract concepts
- Rare vocabulary, classical expressions, nuanced language`
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, level } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const guidelines = JLPT_GUIDELINES[level] || JLPT_GUIDELINES.N5;

    const systemPrompt = `You are an expert Japanese language teacher and content creator specializing in JLPT preparation materials.
Your task is to generate engaging Japanese reading passages with proper tokenization for learning.

${guidelines}

IMPORTANT OUTPUT FORMAT:
You must return a valid JSON object with this EXACT structure:
{
  "title": "Japanese title in target level",
  "title_reading": "Hiragana reading of the title",
  "sentences": [
    {
      "text": "Full sentence in Japanese",
      "tokens": [
        {
          "word": "Japanese word/phrase",
          "reading": "Hiragana reading (only if contains kanji, null otherwise)",
          "meaning": "English meaning",
          "type": "noun|verb|adjective|adverb|particle|conjunction|expression"
        }
      ]
    }
  ]
}

Rules:
1. Generate 3-5 sentences appropriate for the level
2. Every word must be tokenized, including particles
3. Only provide "reading" for words containing kanji
4. Make the content engaging and related to the given topic
5. Ensure grammatical accuracy and natural Japanese flow
6. Return ONLY the JSON, no markdown, no explanation`;

    const userPrompt = `Generate a ${level} level Japanese reading passage about: "${topic}"

Remember to return ONLY valid JSON with the exact structure specified.`;

    console.log(`Generating ${level} passage about: ${topic}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    let content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("Raw AI response:", content);

    // Clean up the response - remove markdown code blocks if present
    content = content.trim();
    if (content.startsWith("```json")) {
      content = content.slice(7);
    } else if (content.startsWith("```")) {
      content = content.slice(3);
    }
    if (content.endsWith("```")) {
      content = content.slice(0, -3);
    }
    content = content.trim();

    // Parse the JSON
    const passage = JSON.parse(content);

    // Calculate character count
    let characterCount = 0;
    if (passage.sentences) {
      for (const sentence of passage.sentences) {
        characterCount += sentence.text?.length || 0;
      }
    }

    return new Response(
      JSON.stringify({ 
        passage,
        characterCount,
        level,
        topic
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-reading:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to generate reading passage" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
