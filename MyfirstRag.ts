// برای اجرای نرم افزار باید حتما از شکن دات ایر استفاده شود
// برای اجرای نرم افزار باید حتما از شکن دات ایر استفاده شود
// برای اجرای نرم افزار باید حتما از شکن دات ایر استفاده شود
import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { Annotation, StateGraph } from "@langchain/langgraph";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

async function RagExec() {

   const baseURL = "https://api.avalai.ir/v1";
   const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
      apiKey: "aa-Exsz4qyYtGHpePcYrXdWdbFLqNqW29qMmJkiLizTq42k1buv",
      configuration: {
        baseURL: baseURL
      }
    });

  // Load and chunk contents of blog
  const pTagSelector = "p";
  const cheerioLoader = new CheerioWebBaseLoader(
    "https://lilianweng.github.io/posts/2023-06-23-agent/",
    {
      selector: pTagSelector
    }
  );

 
  const docs = await cheerioLoader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, chunkOverlap: 200
  });
  const allSplits = await splitter.splitDocuments(docs);


  // Index chunks
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
    apiKey: `aa-Exsz4qyYtGHpePcYrXdWdbFLqNqW29qMmJkiLizTq42k1buv`, // کلید API خود را اینجا قرار دهید,
    configuration: {
      baseURL: baseURL
    }
  });

  //* create 'vector store' and 'embedding' together
  console.log('Start vector store & embdedding.....')
  const vectorStore = new MemoryVectorStore(embeddings);
  console.log('End vector store & embdedding.....')



  //* Having instantiated our vector store, we can now index the documents. 
  console.log('Start adding & indexing document.....')
  const addDocuments = await vectorStore.addDocuments(allSplits);
  console.log('addDocument ended. adddocoument resulut:.....')
  // console.log(vectorStore)
  console.log('End adding & indexing document.....')
  //* similarity search in our document example
  console.log('Start similarity search......')


  // Define prompt for question-answering
  const promptTemplate = await pull<ChatPromptTemplate>("rlm/rag-prompt");
  //* Now promptTemplate has variables: 'question' & 'context'
  //* Context include  MY knowlage
  

  // Define state for application
  //* 1: State of Input,only consist of question 
  const InputStateAnnotation = Annotation.Root({
    question: Annotation<string>,
  });
  //* 2 : state of Application
  const StateAnnotation = Annotation.Root({
    question: Annotation<string>,
    context: Annotation<Document[]>,
    answer: Annotation<string>,
  });

  // Define application steps
  const retrieve = async (state: typeof InputStateAnnotation.State) => {
    const retrievedDocs = await vectorStore.similaritySearch(state.question)
    return { context: retrievedDocs };
  };


  const generate = async (state: typeof StateAnnotation.State) => {
    const docsContent = state.context.map(doc => doc.pageContent).join("\n");
    const messages = await promptTemplate.invoke({ question: state.question, context: docsContent });
    // * Now message is a standard question,for AI,mix of MY Knowledge and question
    const response = await llm.invoke(messages);
    return { answer: response.content };
  };


  // Compile application and test
  const graph = new StateGraph(StateAnnotation)
    .addNode("retrieve", retrieve)
    .addNode("generate", generate)
    .addEdge("__start__", "retrieve")
    .addEdge("retrieve", "generate")
    .addEdge("generate", "__end__")
    .compile();
  let inputs = { question: "What is Task Decomposition?" };

  const result = await graph.invoke(inputs);
  console.log(`your question is: ${result.question} and ansewer is bellow:`)
  console.log('************************************');
  console.log(result.answer);
  console.log('************************************');

}
RagExec();
// برای اجرای نرم افزار باید حتما از شکن دات ایر استفاده شود
// برای اجرای نرم افزار باید حتما از شکن دات ایر استفاده شود
// برای اجرای نرم افزار باید حتما از شکن دات ایر استفاده شود
