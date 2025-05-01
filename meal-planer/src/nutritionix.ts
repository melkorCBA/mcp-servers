import axios, { AxiosInstance } from "axios";

interface NutritionResponse {
    foods: [
        {
            nf_calories: number;
        }
    ]
}

export class NutritionIX_API {
    private axios: AxiosInstance
    constructor() {
        this.axios = axios.create({
            headers: {
                'x-app-id': process.env.NUTRITIONIX_APP_ID,
                'x-app-key': process.env.NUTRITIONIX_APP_KEY,
                'x-remote-user-id': '0',
                'Content-Type': 'application/json',
            },
            baseURL: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        })
    }

    async getNutritionInfo100Grams(food: string): Promise<NutritionResponse> {
        try {
            const response = await this.axios.post<NutritionResponse>('', { query: `100g of ${food}` })
            return response.data
        } catch (error) {
            throw new Error(`Error fetching nutrition info: ${error}`)
        }
    }
}
