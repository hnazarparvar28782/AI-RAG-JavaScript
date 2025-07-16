import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import fs from 'fs'
import { exec } from 'child_process';

// const baseURL = "https://api.avalapis.ir/v1";
const baseURL = "https://api.avalai.ir/v1";

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

//* create 'vector store' and 'embedding' together
console.log('Start vector store & embdedding.....')
const vectorStore = new MemoryVectorStore(embeddings);
console.log('End vector store & embdedding.....')


try {
    //* Having instantiated our vector store, we can now index the documents. 
    console.log('Start adding & indexing document.....')
    await vectorStore.addDocuments(allSplits);
    console.log('End adding & indexing document.....')
    //* similarity search in our document example
    console.log('Start similarity search......')
    const results1 = await vectorStore.similaritySearch(
        "When was Nike incorporated?"
    );
    console.log("******************")
    console.log(results1[0]);

} catch (error) {
    // بررسی کد خطا (status)
    if (error.status === 504) {
        // استخراج محتوای HTML از خطا
        const htmlContent = error.message;

        // ذخیره محتوای HTML در فایل
        const filePath = 'error.html';
        fs.writeFile(filePath, htmlContent, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Error HTML saved to error.html');

                // باز کردن فایل HTML در مرورگر پیش‌فرض
                exec(`start ${filePath}`, (err) => {
                    if (err) {
                        console.error('Error opening file in browser', err);
                    } else {
                        console.log('File opened in browser');
                    }
                });
            }
        });

        // نمایش محتوای HTML
        console.log('An error occurred:', htmlContent);
    } else {
        console.error('An unexpected error occurred:', error);
    }
}



