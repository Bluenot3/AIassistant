import React from 'react';
import { useSettings, type AIModel } from '../store/settings';
import { MODEL_CAPABILITIES } from '../lib/api-clients';
import { X, Moon, Sun } from 'lucide-react';

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const {
    theme,
    setTheme,
    apiKeys,
    setApiKey,
    currentModel,
    setCurrentModel,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens
  } = useSettings();

  const handleApiKeyChange = (model: AIModel) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(model, e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-200">Theme</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h3>
              {(Object.keys(MODEL_CAPABILITIES) as AIModel[]).map((model) => (
                <div key={model} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {MODEL_CAPABILITIES[model].name}
                  </label>
                  <input
                    type="password"
                    value={apiKeys[model] || ''}
                    onChange={handleApiKeyChange(model)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder={`Enter ${MODEL_CAPABILITIES[model].name} API key`}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Model Settings</h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Model
                </label>
                <select
                  value={currentModel}
                  onChange={(e) => setCurrentModel(e.target.value as AIModel)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {(Object.keys(MODEL_CAPABILITIES) as AIModel[]).map((model) => (
                    <option key={model} value={model}>
                      {MODEL_CAPABILITIES[model].name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Temperature ({temperature})
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Max Tokens ({maxTokens})
                </label>
                <input
                  type="range"
                  min="100"
                  max={MODEL_CAPABILITIES[currentModel].maxTokens}
                  step="100"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}