import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ErrorCode, ListResourcesRequestSchema, ListToolsRequestSchema, ListToolsResultSchema, McpError, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { NutritionIX_API } from "./nutritionix.js";
import { MealPlanService } from "./meal-plan-service.js";

export class MCPServer {
    private server: Server;
    private nutritionAPI: NutritionIX_API;
    private mealPlanService: MealPlanService

    constructor() {

        this.server = new Server(
            {
                name: "meal-plan-mcp-server",
                version: "0.0.1",
                description: "A server that provides meal plan suggestions based on user input.",
            },
            {
                capabilities: {
                    tools: {},
                    resources: {},
                }
            }
        );
        this.nutritionAPI = new NutritionIX_API();
        this.mealPlanService = new MealPlanService();
        this.setToolsList();
        this.setResourceList();
        this.setToolHandlers();
        this.setResourceHandler();
        this.server.onerror = (error) => console.error('[Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('meal plan MCP server running on stdio');
    }


    private setToolsList() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: "get-kcl-for-100g-food",
                        description: "get the calories(cl) for 100g of food",
                        inputSchema: {
                            type: "object",
                            properties: {
                                food: {
                                    type: "string",
                                    description: "food name",
                                },
                            },
                            required: ["food"],
                        },
                        
                    },
                ],
            };
        })

    }

    private setResourceList() {
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
            return {
                resources: [
                    {
                        name: 'my-meal-plan',
                        mimeType: 'text/plain',
                        uri: 'plan://mealPlan.txt'
                    },
                    {
                        name: 'nutrients-attr-data',
                        description: 'the nutrition attribute data for mapping the full_nutrients data',
                        mimeType: 'application/json',
                        uri: 'data://nutrientsAttrData.txt'
                    },
                ]
            }
        })
    }

    private setToolHandlers() {
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            switch (request.params.name) {
                case "get-kcl-for-100g-food":
                    const { food } = request.params.arguments as { food: string };

                    try {
                        const response = await this.nutritionAPI.getNutritionInfo100Grams(food)
                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `for 100 grams, calories: ${response.foods[0].nf_calories}\nfull_nutrients: ${JSON.stringify(response.foods[0].full_nutrients, null, 2)}`,
                                }
                            ]
                        };
                    } catch (error) {
                        throw new McpError(ErrorCode.InternalError, `Error fetching nutrition info: ${error}`);
                    }
                default:
                    throw new McpError(ErrorCode.InvalidRequest, `Tool ${request.params.name} not found`);

            }
        })
    }

    private setResourceHandler() {
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const uri = request.params.uri;
            switch (uri) {
                case 'plan://mealPlan.txt': {
                    const mealPlan = this.mealPlanService.fetchMealPlan()
                    return {
                        contents: [
                            {
                                uri: "plan://mealPlan.txt",
                                text: mealPlan,
                            },
                        ],
                    }

                }
                case 'data://nutrientsAttrData.txt': {
                    const data = await this.nutritionAPI.getNutritionAttrData()
                    return {
                        contents: [
                            {
                                uri: "data://nutrientsAttrData.txt",
                                text: data,
                            },
                        ],
                    }

                }

                default:
                    throw new McpError(ErrorCode.InvalidRequest, `Resource ${request.params.uri} not found`);
            }
        })
    }

}