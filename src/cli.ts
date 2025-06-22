#!/usr/bin/env bun

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
  .listen(3000, ({ port }) => {
    const hostname = 'localhost';
    console.log(`🦊 Elysia MCP Server is running at ${hostname}:${port}`);

    console.log(`📡 MCP endpoint: http://${hostname}:${port}/mcp`);
    console.log(
      `🔍 You can inspect the server with: npx @modelcontextprotocol/inspector http://${hostname}:${port}/mcp`
    );
  });
