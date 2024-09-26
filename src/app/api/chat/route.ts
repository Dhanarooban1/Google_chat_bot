import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import MarkdownIt from 'markdown-it';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');


const md = new MarkdownIt();
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(message => message.role === 'user' || message.role === 'assistant')
    .map(message => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: md.render(message.content) }],
    })),
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const geminiStream = await genAI
      .getGenerativeModel({ model: 'gemini-pro' })
      .generateContentStream(buildGoogleGenAIPrompt(messages));
    const stream = GoogleGenerativeAIStream(geminiStream);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error processing request:', error);
    // Handle errors appropriately
    return new Response('Internal Server Error', { status: 500 });
  }
}