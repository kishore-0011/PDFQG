export function buildQuizPrompt(inputText: string, questionCount = 10, difficulty = 'medium') {
  return `
You are a quiz generator AI.

Based on the following text,
Generate ${questionCount} ${difficulty} multiple choice questions from the following text.

Text:
"""
${inputText}
"""

Each question should include:
- question
- 4 options (A, B, C, D)
- correct answer (e.g., "A")
- explanation

Format output as JSON array:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "A",
    "explanation": "..."
  }
]
`.trim();
}

async function callOpenRouterAPI(model: string, prompt: string, apiKey: string): Promise<string> {
  console.log(`🔍 Calling OpenRouter model: ${model}`);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "QuizForge"
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();

  if (!response.ok || data.error || !data.choices?.[0]?.message?.content) {
    throw new Error(data?.error?.message || 'AI response failed');
  }

  return data.choices[0].message.content;
}

export async function callDeepSeek(prompt: string): Promise<string> {
  const primaryModel = "deepseek/deepseek-chat-v3-0324:free";
  const fallbackModel = "meta-llama/llama-3.2-1b-instruct:free";

  const deepSeekKey = process.env.OPENROUTER_DEEPSEEK_KEY;
  const llamaKey = process.env.OPENROUTER_LLAMA_KEY;

  if (!deepSeekKey || !llamaKey) {
    throw new Error("API keys for DeepSeek or LLaMA not configured in environment.");
  }

  try {
    console.log("🚀 Trying DeepSeek model...");
    const response = await callOpenRouterAPI(primaryModel, prompt, deepSeekKey);
    console.log("✅ DeepSeek succeeded");
    return response;
  } catch (err: any) {
    const errorMsg = err?.message || '';
    console.warn(`❌ DeepSeek failed: ${errorMsg}`);

    // Only switch to fallback on known limit or quota issues
    if (errorMsg.toLowerCase().includes("rate limit") || errorMsg.toLowerCase().includes("quota")) {
      try {
        console.log("🔁 Switching to fallback model: Meta LLaMA");
        const fallbackResponse = await callOpenRouterAPI(fallbackModel, prompt, llamaKey);
        console.log("✅ Meta LLaMA succeeded");
        return fallbackResponse;
      } catch (fallbackErr) {
        console.error("❌ Fallback Meta LLaMA also failed:", fallbackErr);
        throw new Error("Both primary and fallback models failed.");
      }
    } else {
      throw err;
    }
  }
}
