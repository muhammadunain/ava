'use server'

import PdfParse from "pdf-parse";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { imagekit } from "../imagekit";

// Helper function to safely parse JSON with fallbacks
function safeJsonParse(text: string) {
  try {
    // First, try direct parsing
    return JSON.parse(text);
  } catch (error) {
    console.log('Direct JSON parse failed, trying cleanup...');
    
    // Try to extract JSON from markdown code blocks or other formatting
    let cleanedText = text.trim();
    
    // Remove markdown code blocks
    cleanedText = cleanedText.replace(/^```json\s*/gim, '').replace(/^```\s*/gim, '').replace(/```\s*$/gim, '');
    
    // Remove any leading/trailing whitespace and newlines
    cleanedText = cleanedText.trim();
    
    // Try to find JSON object boundaries
    const jsonStart = cleanedText.indexOf('{');
    const jsonEnd = cleanedText.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
    }
    
    try {
      return JSON.parse(cleanedText);
    } catch (secondError) {
      console.error('JSON cleanup failed:', secondError);
      
      // Return a default structure if all parsing fails
      return {
        accordion: [],
        tables: [],
        timeline: [],
        summary: "Failed to parse document structure. Please try again.",
        tasks: [],
        deadlines: []
      };
    }
  }
}

export const uploadPDFMain = async (formData: FormData) => {
  try {
    const file = formData.get('pdf') as File;
    if (!file) throw new Error('No file provided');

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: '/pdfs/',
    });
    console.log('PDF uploaded to ImageKit:', uploadResult);

    const pdfData = await PdfParse(buffer);
    const pdfText = pdfData.text;

    // Truncate extremely long text to avoid token limits
    const maxTextLength = 50000; // Adjust based on your needs
    const truncatedText = pdfText.length > maxTextLength 
      ? pdfText.substring(0, maxTextLength) + "\n\n[Document truncated due to length...]"
      : pdfText;

    const prompt = `
You are Ava, an expert document intelligence assistant for real estate contracts. Your job is to deeply analyze the content of this PDF and extract structured, complete, and clean JSON data — only based on what is explicitly written in the document.

CRITICAL: You must return ONLY valid JSON. No explanations, no markdown, no code blocks, no additional text.

Output exactly in this JSON format:

{
  "accordion": [
    { "question": "string", "answer": "string", "page": 1 }
  ],
  "tables": [
    {
      "title": "string",
      "headers": ["string"],
      "rows": [["string"]],
      "page": 1
    }
  ],
  "timeline": [
    {
      "milestone": "string",
      "date": "YYYY-MM-DD",
      "description": "string",
      "page": 1
    }
  ],
  "summary": "Short summary of the document in plain, simple language — 3 to 5 sentences.",
  "tasks": [
    {
      "title": "string",
      "dueDate": "YYYY-MM-DD",
      "priority": "High",
      "linkedMilestone": "string",
      "page": 1
    }
  ],
  "deadlines": [
    {
      "name": "string",
      "deadline": "YYYY-MM-DD",
      "relatedTask": "string",
      "page": 1
    }
  ]
}

Guidelines:
- Include deadlines like offer acceptance, inspection period, closing, financing contingency, etc.
- If a date is missing, shown as blank, or says "{Insert Date}" or similar — use "TBD" as its value.
- Do not skip timeline or deadline entries if a date is missing.
- Prefer precise language from the document. Do not paraphrase legal terms.
- Include page numbers if they can be determined from the context.
- Group all items correctly under their schema fields.
- Return an empty array for any section not found.
- RETURN ONLY THE JSON OBJECT, NOTHING ELSE.

Document content:
${truncatedText}
`;

    // Use more conservative generation parameters
    const response = await generateText({
      model: google('gemini-2.0-flash'),
      prompt,
      temperature: 0.1, // Lower temperature for more consistent output
    });

    console.log('Raw AI response:', response.text);
    console.log('Response length:', response.text.length);

    // Use the safe JSON parser
    const structuredData = safeJsonParse(response.text);
    
    // Validate the structure has required fields
    const requiredFields = ['accordion', 'tables', 'timeline', 'summary', 'tasks', 'deadlines'];
    for (const field of requiredFields) {
      if (!(field in structuredData)) {
        structuredData[field] = field === 'summary' ? 'No summary available' : [];
      }
    }

    console.log('Parsed structured data:', structuredData);

    return { success: true, url: uploadResult.url, structuredData };

  } catch (error: any) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error during PDF processing:', message);
    
    // Return a more informative error response instead of throwing
    return { 
      success: false, 
      error: message,
      structuredData: {
        accordion: [],
        tables: [],
        timeline: [],
        summary: `Error processing document: ${message}`,
        tasks: [],
        deadlines: []
      }
    };
  }
};