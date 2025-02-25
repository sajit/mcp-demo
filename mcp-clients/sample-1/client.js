import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["C:\\Users\\skmathe\\repos\\mcp-demo\\mcp-servers\\calculator\\server.js"]
});

const client = new Client(
  {
    name: "calculator-client",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {}
    }
  }
);

await client.connect(transport);




// Call a tool
const result = await client.callTool({
  name: "add",
  arguments: {
    a: 3,
    b: 2
  }
});
console.log(result);