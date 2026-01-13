<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);

        return [
            'name' => ucfirst($name),
            'sku' => strtoupper(Str::random(8)),
            'quantity' => $this->faker->numberBetween(0, 200),
            'buy_price' => $this->faker->randomFloat(2, 1, 200),
            'sell_price' => $this->faker->randomFloat(2, 5, 400),
            'low_stock_alert' => $this->faker->numberBetween(1, 10),
            'created_at' => now()->subDays($this->faker->numberBetween(0, 120)),
            'updated_at' => now(),
        ];
    }
}
