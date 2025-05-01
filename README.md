# MCP Servers Collection

This repository contains a collection of custom MCP (Model Context Protocol) servers that I've created to enhance AI capabilities with specialized services.

## What is MCP?

The Model Context Protocol (MCP) enables AI systems to interact with external services, extending their capabilities beyond static training data. These servers allow AI assistants to access real-time information, perform actions, and provide more accurate and relevant responses.

## Available MCP Servers

| Server Name | Version | Description | Capabilities |
|-------------|---------|-------------|--------------|
| meal-planer | 1.0.0 | A meal planning service that provides nutritional information and meal planning capabilities | • Generate meal plans with calorie targets<br>• Calculate macro nutrition breakdowns (Carbs, Protein, Fat)<br>• Fetch nutritional information for food items via Nutritionix API<br>• Structure daily meals with percentage-based calorie distribution |

## Usage

Each MCP server is contained in its own directory with a dedicated README and setup instructions. To use these servers:

1. Clone this repository
2. Navigate to the desired MCP server directory
3. Follow the setup instructions in the server's README
4. Connect your AI assistant to the running MCP server

## Setup Requirements

Most servers require:
- Node.js 18+
- pnpm package manager
- API keys (if the server connects to external services)

## Environment Variables

Some servers require environment variables for API access. Check each server's directory for a `.env.example` file detailing required variables.

## Contributing

Feel free to contribute by adding new MCP servers or enhancing existing ones through pull requests.

## License

ISC License