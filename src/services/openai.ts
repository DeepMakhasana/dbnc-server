import OpenAI from "openai";
import config from "../config";

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

export async function getAIResponse(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}
