import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new OpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_KEY,
  temperature: 1,
});

export async function generateAnswer(question: string) {
  let answer = "";

  const prompt = PromptTemplate.fromTemplate(
    `Take the role of the ML engineer researching Seldon products and answer the following question in detail: {question}`,
  );

  const formattedPrompt = await prompt.format({
    question,
  });

  try {
    answer = await model.invoke(formattedPrompt);
  } catch (e) {
    return "Something went wrong";
  }

  return answer;
}
