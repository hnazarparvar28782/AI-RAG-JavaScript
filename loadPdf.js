import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loader = new PDFLoader("./assets/PDF/nke-10k-2023.pdf");

const docs = await loader.load();
console.log(`Total Pages is : ${docs.length}`);