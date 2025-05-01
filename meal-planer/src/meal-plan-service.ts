export class MealPlanService {
  
    private mealPlan: string = 'Meal Plan for Chatura Bashika\n' +
    '------------------------------\n' +
    'Expected Total Daily Calorie Intake : 2,678 cal\n\n' +
    'Macro nutrition breakdown (Carbs 60% | Protein 20% | Fat 20%)\n\n' +
    'Meals: \n' +
    '1. Breakfast(25%) : 670 cl\n' +
    '2. Morning Snack(10%) : 270 cal\n' +
    '3. Lunch(30%) : 800 cal\n' +
    '4. Evening Snack(10%) : 270 cal\n' +
    '5. Dinner(25%) : 670 cal';

    /**
     * Fetches and parses the meal plan from the remote URL
     * @returns A structured meal plan object
     */
    fetchMealPlan(): string {
        return this.mealPlan;
    }
}