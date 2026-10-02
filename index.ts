import { Annotation, StateGraph, START, END } from "@langchain/langgraph";

const State = Annotation.Root({
  input: Annotation<string>,
  output: Annotation<string>,
});

const mockAction = (state: typeof State) => {
  return {
    // input: "Hello, how are you?",
    output: "Pedro: Oi, tudo e você?",
  };
};

const mockAction2 = (state: typeof State) => {
  return {
    output: "Daniele: Oi, tudo bem?",
  };
};

const graph = new StateGraph(State)
  .addNode("Pedro", mockAction)
  .addNode("Daniele", mockAction2)
  .addEdge(START, "Daniele")
  .addEdge("Daniele", "Pedro")
  .addEdge("Pedro", END)
  .compile();

const result = await graph.invoke({
  input: "Hello, how are you?",
});

console.log(result); // Output: "I'm doing well, thank you for asking!"
