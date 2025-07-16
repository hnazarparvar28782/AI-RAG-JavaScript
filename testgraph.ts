import { StateGraph } from "@langchain/langgraph";

// غیرفعال کردن LangSmith
process.env.LANGCHAIN_TRACING_V2 = "false";
// 1. تعریف نوع state
interface MyState {
  result: string;
}

// 2. تعریف توابع node با نوع‌دهی صحیح
const retrieve = async (state: MyState): Promise<{ result: string }> => {
  return { result: `${state.result}Retrieved data. ` };
};
const generate = async (state: MyState): Promise<{ result: string }> => {
  return { result: `${state.result}Generated response. ` };
};
// 3. ایجاد گراف با reducer مناسب
const graph = new StateGraph<MyState>({
  channels: {
    result: {
      reducer: (prev: string | undefined, next: string) => 
        prev ? `${prev}${next}` : next,
      default: () => "",
    }
  }
})
  .addNode("retrieve", retrieve)
  .addNode("generate", generate)
  .addEdge("__start__", "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("generate", "__end__")
  .compile();

// 4. اجرای گراف
(async () => {
  const initialState = { result: "" };
  const result = await graph.invoke(initialState);
  console.log("Final result:", result.result);
})();