import React from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../store/chat';
import { useSettings } from '../store/settings';
import { sendMessage } from '../lib/api-clients';
import { formatError } from '../lib/utils';

export function MessageInput() {
  const [input, setInput] = React.useState('');
  const addMessage = useChat((state) => state.addMessage);
  const isLoading = useChat((state) => state.isLoading);
  const setLoading = useChat((state) => state.setLoading);
  const { currentModel, apiKeys, temperature, maxTokens } = useSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    addMessage({ role: 'user', content: userMessage });
    setLoading(true);

    try {
      if (!apiKeys[currentModel]) {
        throw new Error(`Please add your ${currentModel.toUpperCase()} API key in settings`);
      }

      const response = await sendMessage(
        currentModel,
        {
          message: userMessage,
          temperature,
          maxTokens
        },
        apiKeys[currentModel]!
      );

      addMessage({
        role: 'assistant',
        content: response
      });
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: `Error: ${formatError(error)}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
      <div className="container mx-auto flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}