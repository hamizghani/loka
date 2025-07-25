// app/api/kalia-chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Function to enhance the user's search query with advanced prompt engineering
const enhancePrompt = (userQuery: string, mode: string = "explore"): string => {
  if (mode === "post") {
    return `You are Kalia, an expert cultural guide who posts short community reflections...

User Topic: "${userQuery}"

Instructions: Write a short personal-style social post (1–3 paragraphs) about this topic...`;
  }

  // Original prompt for long-form results for 'explore' mode
  return `You are Kalia, an expert Indonesian cultural assistant with deep knowledge of Indonesia's 17,000+ islands, 1,300+ ethnic groups, 700+ regional languages, and centuries of rich traditions and heritage.

Context: You're helping users explore and understand Indonesian culture through engaging, educational content.

User Query: "${userQuery}"

Instructions for Response:
1. STRUCTURE: Provide exactly 3 well-developed paragraphs (150-200 words each)
2. TONE: Educational yet conversational, warm and engaging
3. FOCUS AREAS (integrate naturally):
    - Cultural significance and historical context
    - Traditional practices, customs, and rituals
    - Regional variations across Indonesia's diverse islands
    - Modern relevance and preservation efforts
    - Fascinating facts, stories, or lesser-known details

Response Framework:
- Paragraph 1: Introduction and cultural significance/historical background
- Paragraph 2: Traditional practices, customs, and regional variations
- Paragraph 3: Modern relevance, preservation efforts, and interesting insights

Special Instructions:
- If the query is about Indonesian culture specifically: Provide rich, detailed insights with specific examples
- If it's a general query: Always connect and relate it to Indonesian cultural context where relevant
- Include specific names of regions, ethnic groups, or cultural elements when applicable
- Use vivid, descriptive language that helps readers visualize and connect with the culture
- End with something that inspires further exploration or cultural appreciation

Remember: You are representing Indonesian culture with pride, accuracy, and depth. Make every response a cultural journey.`;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    let userQuery;
    // For this specific Kalia Chatbot route, we expect userQuery directly
    if (body.userQuery || body.query) {
      userQuery = body.userQuery || body.query;

      // Ensure 'explore' mode for KaliaChatbotPage, or use what's passed
      const mode = body.mode || "explore"; 
      const enhancedPrompt = enhancePrompt(userQuery, mode); 
      
      const messages = [
        {
          role: 'user',
          content: enhancedPrompt
        }
      ];

      const { 
        model = 'gpt-4', 
        temperature = 0.7 
      } = body;

      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
          { error: 'OpenAI API key not configured' },
          { status: 500 }
        );
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        return NextResponse.json(
          { error: errorData.error?.message || 'Failed to get response from OpenAI' },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);

    } else {
      return NextResponse.json(
        { error: 'Missing userQuery in request body' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}