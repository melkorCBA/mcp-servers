import axios from "axios";
import path from "path";
import fs from "fs";
export class NutritionIX_API {
    axios;
    constructor() {
        this.axios = axios.create({
            headers: {
                'x-app-id': process.env.NUTRITIONIX_APP_ID,
                'x-app-key': process.env.NUTRITIONIX_APP_KEY,
                'x-remote-user-id': '0',
                'Content-Type': 'application/json',
            },
            baseURL: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        });
    }
    async getNutritionInfo100Grams(food) {
        try {
            const response = await this.axios.post('', { query: `100g of ${food}` });
            return response.data;
        }
        catch (error) {
            throw new Error(`Error fetching nutrition info: ${error}`);
        }
    }
    async getNutritionAttrData() {
        try {
            const dataPath = path.resolve(path.dirname('./'), 'nutrition-attr-data.json');
            return await fs.promises.readFile(dataPath, 'utf8');
        }
        catch (error) {
            throw new Error(`Error loading nutrition attribute data: ${error}`);
        }
    }
}
