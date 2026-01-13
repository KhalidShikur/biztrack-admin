<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockMovement>
 */
class StockMovementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $change = $this->faker->numberBetween(-20, 50);

        return [
            'stock_id' => null,
            'user_id' => null,
            'change' => $change,
            'quantity_after' => 0,
            'reason' => $this->faker->randomElement(['purchase', 'sale', 'adjustment', 'return']),
            'created_at' => now()->subDays($this->faker->numberBetween(0, 90)),
            'updated_at' => now(),
        ];
    }
}
