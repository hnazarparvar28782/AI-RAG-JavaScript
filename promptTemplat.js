//*Prompt Templates
//* formatting a template with the user input.

//* run project with command :node promptTemplat 

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
const systemTemplate = "Translate the following from English into {language}";
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);
const baseURL = "https://api.avalapis.ir/v1";
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
})

async function run() {
  const promptValue = await promptTemplate.invoke({
    language: "italian",
    text: "hi!",
  });
  console.log("************ promptValue ****************")
  console.log("****************************")
  console.log(promptValue)
  console.log("************end promptValue****************")
  console.log("********** promptValue.toChatMessages******************")
  console.log(promptValue.toChatMessages())

  console.log("*************  model.invoke***************")
  const response = await model.invoke(promptValue);
  console.log(`${response}`);
  console.log("****************************")
 

}

run()

//* run project with command :node first 