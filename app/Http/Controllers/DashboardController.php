<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Stock::count();

        $lowStockCount = Stock::whereColumn(
            'quantity',
            '<=',
            'low_stock_alert'
        )->count();

        $inventoryValue = Stock::sum(DB::raw('quantity * buy_price'));

        $potentialProfit = Stock::sum(DB::raw('quantity * (sell_price - buy_price)'));

        $recentMovements = StockMovement::with('user', 'stock')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard/Index', [
            'totalProducts' => $totalProducts,
            'lowStockCount' => $lowStockCount,
            'inventoryValue' => $inventoryValue,
            'potentialProfit' => $potentialProfit,
            'recentMovements' => $recentMovements,
        ]);
    }
}
