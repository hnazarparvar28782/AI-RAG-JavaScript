import { HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { OpenAI } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
const baseURL = "https://api.avalapis.ir/v1";
// تنظیم پیام‌ها
const messages = [
  new SystemMessage("Translate the following from English into germany"),
  new HumanMessage("hi!"),
];
const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  apiKey: `aa-Exsz4qyYtGHpePcYrXdWdbFLqNqW29qMmJkiLizTq42k1buv`, // کلید API خود را اینجا قرار دهید,
  temperature: 0,
  maxTokens: undefined,
  timeout: undefined,
  maxRetries: 2,
  // other params...
  configuration: {
    baseURL: baseURL
  }
}
);

async function run() {
    const stream = await model.stream(messages);

    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
      console.log(`${chunk.content}|`);
    }

}
run();