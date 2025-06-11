import { Elysia } from 'elysia';
import { mcp } from 'elysia-mcp';
import { z } from 'zod';
import { registerCalculateTool } from './tools/calculate';

const app = new Elysia()
  .use(
    mcp({
      basePath: '/mcp',
      serverInfo: {
        name: 'elysia-mcp-server',
        version: '0.0.1',
      },
      setupServer: (server) => {
        registerCalculateTool(server);
      },
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
