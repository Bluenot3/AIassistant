import React from 'react';
import { useChat } from '../store/chat';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Settings as SettingsIcon } from 'lucide-react';
import { useSettings } from '../store/settings';
import { SettingsPanel } from './Settings';
import { MODEL_CAPABILITIES } from '../lib/api-clients';

export function Chat() {
  const [showSettings, setShowSettings] = React.useState(false);
  const theme = useSettings((state) => state.theme);
  const currentModel = useSettings((state) => state.currentModel);
  const modelInfo = MODEL_CAPABILITIES[currentModel];

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistant Pro</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Using {modelInfo.name} - {modelInfo.description}
            </p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <SettingsIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto h-full flex flex-col">
          <MessageList />
          <MessageInput />
        </div>
      </main>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}