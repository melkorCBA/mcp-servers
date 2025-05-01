import axios from "axios";
export class NutritionIX_API {
    axios;
    constructor() {
        this.axios = axios.create({
            headers: {
                'x-app-id': process.env.NUTRITIONIX_APP_ID ?? 'beb5af63',
                'x-app-key': process.env.NUTRITIONIX_APP_KEY ?? '60b7c236d9cf4ced3f7bd0d8906ebdc4',
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
}
