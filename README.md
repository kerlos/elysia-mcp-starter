# Elysia MCP Starter

A starter template for building MCP (Model Context Protocol) servers using Elysia and Bun runtime.

This starter template is based on the [elysia-mcp](https://github.com/kerlos/elysia-mcp) plugin, which provides comprehensive ElysiaJS integration for the Model Context Protocol with HTTP transport support.

## Purpose

This repository provides a foundation for creating MCP servers that can be used with LLM clients like Claude Desktop, Cody, or other MCP-compatible applications. It demonstrates how to implement:

- **Tools**: Functions that can be called by LLMs (e.g., calculator)
- **Prompts**: Reusable prompt templates
- **Resources**: Dynamic data sources that can be accessed by LLMs

## Directory Structure

```
elysia-mcp-starter/
├── src/
│   ├── index.ts          # Main application entry point
│   ├── tools/            # MCP tools (functions callable by LLMs)
│   │   └── calculate.ts  # Example calculator tool
│   ├── prompts/          # MCP prompt templates
│   │   └── hello.ts      # Example greeting prompt
│   └── resources/        # MCP resources (dynamic data sources)
│       └── news.ts       # Example news resource
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Getting Started

### Option 1: Using Bun Create (Recommended)

```bash
# Create a new project from the starter template
bun create https://github.com/kerlos/elysia-mcp-starter my-mcp-project

# Navigate to the project
cd my-mcp-project

# Install dependencies
bun install

# Start development server
bun run dev
```

### Option 2: Clone Repository

1. **Clone or use this template:**

   ```bash
   git clone https://github.com/kerlos/elysia-mcp-starter.git
   cd elysia-mcp-starter
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Start the development server:**

   ```bash
   bun run dev
   ```

**The MCP server will be available at:**

- Server: `http://localhost:3000`
- MCP endpoint: `http://localhost:3000/mcp`

## Development

- **Development server**: `bun run dev` (with auto-reload)
- **Production server**: `bun run start`
- **Inspect MCP server**: `bun run inspect` (opens MCP inspector)

## Adding New Components

### Tools

Add new tools in `src/tools/` and register them in `src/index.ts`:

```typescript
import { registerYourTool } from './tools/your-tool';
// ... in setupServer:
registerYourTool(server);
```

### Prompts

Add new prompts in `src/prompts/` and register them in `src/index.ts`:

```typescript
import { registerYourPrompt } from './prompts/your-prompt';
// ... in setupServer:
registerYourPrompt(server);
```

### Resources

Add new resources in `src/resources/` and register them in `src/index.ts`:

```typescript
import { registerYourResource } from './resources/your-resource';
// ... in setupServer:
registerYourResource(server);
```

## Using with LLM Clients

Configure your MCP-compatible client to connect to `http://localhost:3000/mcp` to access the tools, prompts, and resources provided by this server.

### MCP Client Configuration

Add the following configuration to your MCP client's configuration file:

**For Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`):**

```json
{
  "mcpServers": {
    "elysia-mcp-starter": {
      "type": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

**For Cursor (`~/.cursor/mcp.json`):**

```json
{
  "mcpServers": {
    "elysia-mcp-starter": {
      "type": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

**For Cody (VS Code settings):**

```json
{
  "cody.experimental.mcp.servers": {
    "elysia-mcp-starter": {
      "type": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

Replace `"elysia-mcp-starter"` with your preferred server name and update the URL if you're running on a different port.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
