import { OpenAI } from '@langchain/openai';
import { VectorStore } from '@langchain/core/vectorstores'; // مسیر صحیح
import { Document } from '@langchain/core/documents'; // فرض بر این است که این مسیر درست است
// import { RetrievalQA } from 'langchain/dist/retrieval_qa';
// import { RetrievalQA } from '@langchain/core/runnables';
import { RetrievalQA } from '@langchain';

// فرض کنید که شما یک آرایه از اسناد دارید
const documents = [
    new Document({ pageContent: "مدل‌های زبان به طور گسترده در پردازش زبان طبیعی استفاده می‌شوند." }),
    new Document({ pageContent: "RAG به معنای ترکیب بازیابی و تولید است." }),
    new Document({ pageContent: "زبان‌کدنویسی جاوااسکریپت یکی از محبوب‌ترین زبان‌هاست." })
];

// ایجاد یک VectorStore برای ذخیره اسناد
const vectorStore = new VectorStore({
    documents: documents,
    // اینجا می‌توانید از یک مدل embedding برای ایجاد embedding برای اسناد استفاده کنید
});

// ایجاد مدل زبان OpenAI
const model = new OpenAI({ temperature: 0 });

// ایجاد یک سیستم RAG
const rag = new RetrievalQA({
    llm: model,
    vectorStore: vectorStore,
});

// استفاده از RAG برای پاسخ به یک پرسش
async function getResponse(query) {
    try {
        const response = await rag.call({ query });
        console.log(response);
    } catch (error) {
        console.error("Error while getting response:", error);
    }
}

// پرسش کاربر
const userQuery = "مدل‌های زبان";
getResponse(userQuery);