import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AIModel = 'xai' | 'openai' | 'claude' | 'llama';

interface SettingsState {
  theme: 'light' | 'dark';
  apiKeys: {
    xai?: string;
    openai?: string;
    claude?: string;
    llama?: string;
  };
  currentModel: AIModel;
  temperature: number;
  maxTokens: number;
  setTheme: (theme: 'light' | 'dark') => void;
  setApiKey: (provider: AIModel, key: string) => void;
  setCurrentModel: (model: AIModel) => void;
  setTemperature: (temp: number) => void;
  setMaxTokens: (tokens: number) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      apiKeys: {
        xai: 'xai-zKnctDDdSxVOuxeuthKpppQhS8B5re5Fu3zMDRCN0cuyRhjEyZi0FO4UYbCoxNuDByh2WuNUy8Sm6cnf',
      },
      currentModel: 'xai',
      temperature: 0.7,
      maxTokens: 2048,
      setTheme: (theme) => set({ theme }),
      setApiKey: (provider, key) => 
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key }
        })),
      setCurrentModel: (model) => set({ currentModel: model }),
      setTemperature: (temperature) => set({ temperature }),
      setMaxTokens: (maxTokens) => set({ maxTokens }),
    }),
    {
      name: 'ai-assistant-settings',
    }
  )
);