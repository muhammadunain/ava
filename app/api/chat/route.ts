import { groq } from "@ai-sdk/groq";
import { smoothStream, streamText } from "ai";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      // Add your desired model here
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"), 
      messages,
    //   @ts-ignore
      maxSteps: 6,
      maxRetries: 3,
      maxTokens: 4096,
      experimental_transform: smoothStream({
        // Chunking can be "word" or "line"
        chunking: "word", 
      }),
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Unhandled error in chat API:", error);
    throw error;
  }
}