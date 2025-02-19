export async function callOpenAI(messages: any[]) {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
} 