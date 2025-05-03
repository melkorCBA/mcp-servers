import axios from "axios";
import type { AxiosInstance } from "axios";
import path from "path";
import fs from "fs";




interface NutritionResponse {
    foods: [
        {
            nf_calories: number;
            full_nutrients: [
                {
                    attr_id: number;
                    value: number;
                }
            ]
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


    async getNutritionAttrData(): Promise<string> {
        try {
            const dataPath = path.resolve(path.dirname('./'), 'nutrition-attr-data.json');
            return await fs.promises.readFile(dataPath, 'utf8');
        } catch (error) {
            throw new Error(`Error loading nutrition attribute data: ${error}`);
        }
    }
}
