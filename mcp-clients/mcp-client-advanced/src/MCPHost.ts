import { Client}  from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { RequestOptions } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { CallToolRequest, CallToolResultSchema } from '@modelcontextprotocol/sdk/types.js';

export class MCPHost {
    private fileLocation: string;
    private clients: Client[] = [];

    constructor(fileLocation: string) {
        this.fileLocation = fileLocation;
        const fsClient = new Client({
            name: 'fs',
            version: '0.0.1'
        });
        //TODO get commands from file
        const transport = new StdioClientTransport({
            command: 'node',
            args: ["node_modules/@modelcontextprotocol/server-filesystem/dist/index.js","/Users/sajit"]
        });
       
       //this.tools.push(fsClient);

       (async () => {
        await fsClient.connect(transport);
        console.log('Connected to fs client');
        this.clients.push(fsClient);
      })();

       
       
    }

    async callToolOnClients(params: CallToolRequest["params"], options?: RequestOptions) {
        this.clients.forEach(async (client) => {
          await client.callTool(params, CallToolResultSchema, options);
        });
    }



    async listTools(): Promise<Tool[]> {
        return Promise.all(this.clients.map(client => client.listTools()))
            .then(toolLists => toolLists.flatMap(toolList => toolList.tools));
        
        
    }
}