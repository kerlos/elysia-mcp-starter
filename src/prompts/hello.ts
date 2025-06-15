import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

export const registerHelloPrompt = (server: McpServer) => {
  server.prompt(
    'hello',
    {
      name: z.string().min(1).describe('The name of the person to greet'),
    },
    async (args: { name: string }) => {
      const { name } = args;

      // Basic validation
      if (typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Name must be a non-empty string');
      }

      // Create a personalized greeting message
      const greeting = `Hello, ${name.trim()}! Welcome to our MCP server. How can I assist you today?`;

      return {
        messages: [
          {
            role: 'assistant',
            content: {
              type: 'text',
              text: greeting,
            },
          },
        ],
      };
    }
  );
};
