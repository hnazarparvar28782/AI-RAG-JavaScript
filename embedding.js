import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";

const baseURL = "https://api.avalapis.ir/v1";

console.log('loading....')
const loader = new PDFLoader("./assets/PDF/nke-10k-2023.pdf");
const docs = await loader.load();
console.log('end loading....')
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
console.log('splitting.....')
const allSplits = await textSplitter.splitDocuments(docs);
console.log('end splitting....')

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
  apiKey: `aa-Exsz4qyYtGHpePcYrXdWdbFLqNqW29qMmJkiLizTq42k1buv`, // کلید API خود را اینجا قرار دهید,
  temperature: 0,
  maxTokens: undefined,
  timeout: undefined,
  maxRetries: 2,
  // other params...
  configuration: {
    baseURL: baseURL
  }
});

console.log('embedding....')
const vector1 = await embeddings.embedQuery(allSplits[0].pageContent);
const vector2 = await embeddings.embedQuery(allSplits[1].pageContent);
console.log('end embedding.....')

//*throw error message, if not equela length of vector1,2
console.assert(vector1.length === vector2.length);
//*

console.log(`Generated vectors of length ${vector1.length}\n`);
console.log(vector1.slice(0, 10));