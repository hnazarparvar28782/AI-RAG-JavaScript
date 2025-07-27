# 🚀 RAG (Retrieval-Augmented Generation) Project
## Build a Retrieval Augmented Generation (RAG) App

## 📖 Overview

This project implements a RAG application using JavaScript and incorporates TypeScript to enhance code readability and maintainability. The primary goal of this application is to efficiently retrieve and generate responses based on user queries by leveraging a robust indexing system.

## 🛠️ Components of RAG

A typical RAG application consists of two main components:

### 1. 📥 Indexing
The indexing phase involves creating a pipeline that ingests data from various sources and organizes it for efficient retrieval. This process typically occurs offline and ensures that the data is structured and indexed in a way that facilitates quick access during query processing.

### 2. 🔍 Retrieval and Generation
The retrieval and generation phase constitutes the core functionality of the RAG chain. At runtime, the application takes the user query, retrieves the relevant data from the pre-built index, and subsequently passes this information to the model for response generation. This allows for dynamic and contextually relevant outputs based on the user's input.

## ⚙️ How It Works

1. **Data Loading**: The application fetches data from a specified URL using Cheerio, extracting the content based on the specified HTML selectors.
2. **Text Splitting**: The fetched documents are then split into manageable chunks to facilitate efficient processing.
3. **Indexing**: The application creates an embedding vector store, indexing the document chunks for similarity searches.
4. **User Query**: When a user inputs a question, the system performs a similarity search to find relevant document chunks.
5. **Response Generation**: The relevant chunks are passed to an AI model (GPT-4o) to generate a contextual answer based on the user's question.

## 💻 Output

The output of the application includes the user’s question followed by the generated answer, which is derived from the indexed content and the AI model's processing.

## 📜 Instructions to Run the Software

To run this application, please follow these steps:

1. **Use a VPN**: Ensure that you are using **Shekan.ir** to access the software (this is only necessary for Iranian users; if you are in other countries, you do not need this step).
2. **Install Dependencies**: Make sure to install the necessary packages as specified in the `package.json` file.
3. **Set Up Environment**: Configure your API keys and any additional settings required for the application to function correctly.
4. **Run the Application**:
   - Open your terminal.
   - Navigate to the directory containing the `MyfirstRag.ts` file.
   - Execute the following command to run the TypeScript file:
     ```bash
     npx ts-node MyfirstRag.ts
     ```
5. **Input Your Question**: Follow the prompts in the terminal to input your questions.

## ⚙️ Technologies Used
- **JavaScript**: The primary programming language used for building the application.
- **TypeScript**: Utilized to improve code clarity and enable better type checking.
- **Libraries**: Various JavaScript libraries were employed to address specific challenges and enhance functionality.

## 🧩 Challenges Addressed
Throughout the development of this project, several common issues encountered in JavaScript applications were addressed, ensuring a smoother user experience and improved performance.

## 🏁 Conclusion
This RAG application showcases the integration of indexing and retrieval processes to deliver meaningful responses to user queries. With the combination of JavaScript and TypeScript, the project emphasizes both functionality and code quality.

---

Feel free to copy and paste this markdown code into your GitHub README file. You can further customize it to suit your project’s specific details or add any additional sections as necessary!
