#!/usr/bin/env node

import { Elysia } from 'elysia';
import { mcp } from 'elysia-mcp';
import { registerCalculateTool } from './tools/calculate';
import { registerHelloPrompt } from './prompts/hello';
import { registerNewsResource } from './resources/news';

const app = new Elysia()
  .use(
    mcp({
      basePath: '/mcp',
      serverInfo: {
        name: 'elysia-mcp-server',
        version: '0.0.1',
      },
      enableLogging: false,
      setupServer: (server) => {
        // Register tools
        registerCalculateTool(server);

        // Register prompts
        registerHelloPrompt(server);

        // Register resources
        registerNewsResource(server);
      },
    })
  )

console.log(
  `🦊 Elysia is running at localhost:3000`
);

export default {
  port: 3000,
  fetch: app.fetch,
}

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nGracefully shutting down...');
  process.exit(0);
});


