import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const registerCalculateTool = (server: McpServer) => {
  server.tool(
    'calculate',
    {
      operation: z
        .enum(['add', 'subtract', 'multiply', 'divide'])
        .describe('The arithmetic operation to perform'),
      a: z.number().describe('First number'),
      b: z.number().describe('Second number'),
    },
    async (args: {
      operation: 'add' | 'subtract' | 'multiply' | 'divide';
      a: number;
      b: number;
    }) => {
      const { operation, a, b } = args;

      // Basic validation
      if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both a and b must be numbers');
      }
      if (!['add', 'subtract', 'multiply', 'divide'].includes(operation)) {
        throw new Error(
          'Invalid operation. Must be add, subtract, multiply, or divide'
        );
      }

      let result: number = 0;

      switch (operation) {
        case 'add':
          result = a + b;
          break;
        case 'subtract':
          result = a - b;
          break;
        case 'multiply':
          result = a * b;
          break;
        case 'divide':
          if (b === 0) throw new Error('Division by zero');
          result = a / b;
          break;
        default:
          throw new Error('Unknown operation');
      }
      return {
        content: [{ type: 'text', text: String(result) }],
      };
    }
  );
};
