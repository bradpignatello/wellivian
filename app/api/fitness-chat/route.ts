import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, model, context } = await request.json();
    console.log('Received message:', message);
    console.log('Claude API Key exists:', !!process.env.CLAUDE_API_KEY);
    
    const systemPrompt = `You are an expert AI fitness coach with deep knowledge of:
- Exercise science and biomechanics
- Latest research in strength training and muscle development
- Nutrition and recovery protocols
- Injury prevention and rehabilitation

Current workout context:
- Exercises: ${context.currentExercises.join(', ')}
- Current exercise: ${context.currentExercise}

When providing advice:
1. Base recommendations on peer-reviewed research when possible
2. Consider the user's current workout structure
3. Provide actionable, specific guidance
4. If suggesting exercise modifications, explain the benefits
5. Be concise but thorough

If you want to suggest exercise pairings, include them in a JSON block like this:
\`\`\`json
{
  "suggestPairings": [
    {"exercise": "Exercise Name", "quality": "great"},
    {"exercise": "Another Exercise", "quality": "good"}
  ]
}
\`\`\``;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: systemPrompt + '\n\nUser question: ' + message
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', response.status, errorData);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Claude response:', data);
    
    // Extract the message content
    let content = '';
    if (data.content && data.content[0] && data.content[0].text) {
      content = data.content[0].text;
    } else {
      throw new Error('Unexpected response format from Claude');
    }
    
    // Parse any JSON suggestions
    let suggestedActions = null;
    let cleanContent = content;
    
    const jsonMatch = content.match(/```json\n(.*?)\n```/s);
    if (jsonMatch) {
      try {
        suggestedActions = JSON.parse(jsonMatch[1]);
        cleanContent = content.replace(jsonMatch[0], '').trim();
      } catch (e) {
        console.error('Failed to parse suggested actions:', e);
      }
    }

    return NextResponse.json({
      message: cleanContent,
      suggestedActions,
      sources: []
    });
    
  } catch (error) {
    console.error('Error in fitness-chat API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}