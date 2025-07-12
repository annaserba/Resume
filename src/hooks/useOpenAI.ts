import { useEffect, useState } from 'react';
import { Agent, run, tool, setDefaultOpenAIClient } from '@openai/agents';
import { OpenAI } from 'openai';
import { z } from 'zod';
import useTranslation from './useTraslation';



export interface UseOpenAIOptions {
  systemPrompt?: string;
  apiKey?: string;
  language: string;
}

export const useOpenAI = (options: UseOpenAIOptions) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'system' | 'user' | 'assistant', content: string}>>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { t } = useTranslation(options.language);
  const [init, setInit] = useState<boolean>(false);

  const {
    systemPrompt = t.systemPrompt,
    apiKey
  } = options;

  useEffect(() => {
    try {
      const customClient = new OpenAI({ 
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
        maxRetries: 3,
        timeout: 30000, 
      });
    
      setDefaultOpenAIClient(customClient);
      setInit(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Неизвестная ошибка'));
        console.error('Chat API error:', err);
      }
  }, [apiKey]);


  const sendMessage = async (userMessage: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      
      // Добавляем сообщение пользователя в историю
      const updatedHistory = [
        ...conversationHistory,
        { role: 'user' as const, content: userMessage }
      ];
     
      const toolAgent = tool({
        name: '',
        description: systemPrompt,
        parameters: z.object({ input: z.string() }),
        execute: async (input: { input: string; }) => {
          return {
            name: input.input,
          };
        },
      });

       // Создаем агента для поиска
       const agent = new Agent({
        name: systemPrompt,
        instructions: systemPrompt,
        tools: [toolAgent],
      });

      // Добавляем ответ ассистента в историю
      const response = await run(agent, userMessage);
      
      // Ensure content is always a string
      const responseContent = response.finalOutput || '';
      const assistantMessage = { role: 'assistant' as const, content: responseContent };
      const newHistory = [...updatedHistory, assistantMessage];
      setConversationHistory(newHistory);
      
      // Сохраняем ID беседы
      if (conversationId) {
        setConversationId(conversationId);
      }

      return assistantMessage.content;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Неизвестная ошибка'));
      console.error('Chat API error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    init,
    sendMessage,
    isLoading,
    error,
    conversationHistory,
    clearConversation: () => setConversationHistory([])
  };
};

export default useOpenAI;
