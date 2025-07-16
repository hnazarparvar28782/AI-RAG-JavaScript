import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { OpenAI } from "@langchain/openai";
const baseURL = "https://api.avalapis.ir/v1";
// تنظیم پیام‌ها
const messages = [
  new SystemMessage("Translate the following from English into germany"),
  new HumanMessage("hi!"),
];
const model = new OpenAI({
  model: "gpt-3.5-turbo-instruct",
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
  const inputText = "OpenAI is an AI company that ";
  // const completion = await model.invoke(inputText);
  // const completion= await model.invoke("Hello");
  // const completion=await model.invoke([{ role: "user", content: "Hello" }]);
  // const completion=await model.invoke([{ role: "developer", content: "Hello" }]);
  // const completion=await model.invoke([new HumanMessage("hi!")]);
  // const completion = await model.invoke(messages);
  console.log(completion)

}
run();