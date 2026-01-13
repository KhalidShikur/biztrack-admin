<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Stock;
use App\Models\StockMovement;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DemoSeeder extends Seeder
{
    /**
     * Seed the application's demo data.
     */
    public function run(): void
    {
        // Create staff users
        $staff = User::factory(8)->create();

        // Create lots of stocks
        $stocks = Stock::factory(60)->create();

        $faker = Faker::create();

        // For each stock create a series of movements and keep stock quantity consistent
        foreach ($stocks as $stock) {
            // start with a realistic initial quantity
            $initial = $faker->numberBetween(0, 120);
            $stock->quantity = $initial;
            $stock->save();

            $moves = $faker->numberBetween(3, 12);
            for ($i = 0; $i < $moves; $i++) {
                $user = $staff->random();
                $change = $faker->numberBetween(-30, 50);

                // ensure quantity doesn't go negative
                $newQty = max(0, $stock->quantity + $change);

                $mDate = now()->subDays($faker->numberBetween(0, 90))->subMinutes($faker->numberBetween(0, 1440));

                StockMovement::create([
                    'stock_id' => $stock->id,
                    'user_id' => $user->id,
                    'change' => $change,
                    'quantity_after' => $newQty,
                    'reason' => $faker->randomElement(['purchase', 'sale', 'adjustment', 'return']),
                    'created_at' => $mDate,
                    'updated_at' => $mDate,
                ]);

                $stock->quantity = $newQty;
                $stock->save();
            }
        }

        // Add some random movements across stocks/users for more activity
        for ($i = 0; $i < 80; $i++) {
            $s = $stocks->random();
            $u = $staff->random();
            $change = $faker->numberBetween(-20, 40);
            $newQty = max(0, $s->quantity + $change);
            $mDate = now()->subDays($faker->numberBetween(0, 30))->subMinutes($faker->numberBetween(0, 1440));

            StockMovement::create([
                'stock_id' => $s->id,
                'user_id' => $u->id,
                'change' => $change,
                'quantity_after' => $newQty,
                'reason' => $faker->randomElement(['purchase', 'sale', 'adjustment', 'return']),
                'created_at' => $mDate,
                'updated_at' => $mDate,
            ]);

            $s->quantity = $newQty;
            $s->save();
        }

        // Optional: create some orphan movements to test edge cases
        // StockMovement::factory(20)->create();
    }
}
