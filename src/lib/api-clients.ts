import { AIModel } from '../store/settings';

interface ApiRequestParams {
  message: string;
  temperature: number;
  maxTokens: number;
}

export interface ModelCapabilities {
  name: string;
  description: string;
  features: string[];
  contextWindow: number;
  defaultTemp: number;
  maxTokens: number;
}

export const MODEL_CAPABILITIES: Record<AIModel, ModelCapabilities> = {
  xai: {
    name: 'xAI',
    description: 'Advanced AI model with strong reasoning capabilities',
    features: ['Code Generation', 'Natural Language', 'Problem Solving'],
    contextWindow: 8192,
    defaultTemp: 0.7,
    maxTokens: 4096
  },
  openai: {
    name: 'GPT-4',
    description: 'Latest GPT model with advanced reasoning',
    features: ['Code Generation', 'Natural Language', 'Analysis', 'Creative Writing'],
    contextWindow: 8192,
    defaultTemp: 0.7,
    maxTokens: 4096
  },
  claude: {
    name: 'Claude',
    description: 'Anthropic\'s advanced AI with strong analysis capabilities',
    features: ['Long Context', 'Analysis', 'Technical Writing', 'Code Review'],
    contextWindow: 100000,
    defaultTemp: 0.5,
    maxTokens: 4096
  },
  llama: {
    name: 'Llama 2',
    description: 'Meta\'s open source large language model',
    features: ['Code Generation', 'Natural Language', 'Reasoning'],
    contextWindow: 4096,
    defaultTemp: 0.7,
    maxTokens: 2048
  }
};

async function callXaiApi({ message, temperature, maxTokens }: ApiRequestParams, apiKey: string) {
  const response = await fetch('https://api.xai.com/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: message }],
      temperature,
      max_tokens: maxTokens
    })
  });
  
  if (!response.ok) throw new Error('xAI API request failed');
  return response.json();
}

async function callOpenAiApi({ message, temperature, maxTokens }: ApiRequestParams, apiKey: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
      temperature,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) throw new Error('OpenAI API request failed');
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callClaudeApi({ message, temperature, maxTokens }: ApiRequestParams, apiKey: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      messages: [{ role: 'user', content: message }],
      temperature,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) throw new Error('Claude API request failed');
  const data = await response.json();
  return data.content[0].text;
}

async function callLlamaApi({ message, temperature, maxTokens }: ApiRequestParams, apiKey: string) {
  const response = await fetch('https://api.meta.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-2-70b-chat',
      messages: [{ role: 'user', content: message }],
      temperature,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) throw new Error('Llama API request failed');
  const data = await response.json();
  return data.choices[0].message.content;
}

export async function sendMessage(
  model: AIModel,
  params: ApiRequestParams,
  apiKey: string
): Promise<string> {
  const apiCalls = {
    xai: callXaiApi,
    openai: callOpenAiApi,
    claude: callClaudeApi,
    llama: callLlamaApi
  };

  return apiCalls[model](params, apiKey);
}