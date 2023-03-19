import { Document } from 'langchain/document';
import { OpenAI } from 'langchain/llms';
import { VectorDBQAChain } from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as fs from 'fs';

// articles should be array
export const performVectorQuery = async (articles, query) => {
  /* Initialize the LLM to use to answer the question */
  const model = new OpenAI({});
  /* Load in the file we want to do question answering over */
  const text = articles;
  /* Split the text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = textSplitter.createDocuments(text);
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  /* Create the chain */
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);
  /* Ask it a question */
  const res = await chain.call({
    input_documents: docs,
    query: 'What did the president say about Justice Breyer?',
  });
  return res;
};
export const createDocument = (documentText, metadata) => {
  const doc = new Document({
    pageContent: documentText,
    metadata: { title: metadata.title, url: metadata.url },
  });
  return doc;
};
