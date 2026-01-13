<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin account
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@biztrack.com',
            'password' => bcrypt('adminPassword'),
            'role' => 'admin'
        ]);

        // For safety, only run heavy demo seeding in local or when DEMO_SEED env is set
        if (app()->environment('local') || env('DEMO_SEED', false)) {
            $this->call(DemoSeeder::class);
        }
    }
}
