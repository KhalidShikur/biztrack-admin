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

        // Movements per day (last 30 days)
        $movementsPerDay = StockMovement::select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(`change`) as total_change'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($r) {
                return [
                    'date' => $r->date,
                    'change' => (int) ($r->total_change ?? 0),
                ];
            })->values()->toArray();

        // Top products by quantity
        $topProducts = Stock::orderBy('quantity', 'desc')
            ->take(8)
            ->get(['id', 'name', 'quantity'])
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'quantity' => (int) $p->quantity,
                ];
            })->values()->toArray();

        // Stock distribution
        $stockDistribution = [
            'low' => $lowStockCount,
            'ok' => Stock::count() - $lowStockCount,
        ];

        // Movements by user (last 30 days)
        $movementsByUser = StockMovement::select('user_id', DB::raw('COUNT(*) as count'), DB::raw('SUM(`change`) as total_change'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('user_id')
            ->with('user')
            ->get()
            ->map(function ($r) {
                return [
                    'user' => $r->user->name ?? 'Unknown',
                    'count' => (int) ($r->count ?? 0),
                    'total_change' => (int) ($r->total_change ?? 0),
                ];
            })->values()->toArray();

        // Top movers by quantity (last 30 days)
        $topMovers = StockMovement::select('stock_id', DB::raw('SUM(`change`) as total_change'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('stock_id')
            ->orderByDesc('total_change')
            ->with('stock')
            ->take(8)
            ->get()
            ->map(function ($r) {
                return [
                    'id' => $r->stock->id ?? null,
                    'name' => $r->stock->name ?? 'Unknown',
                    'total_change' => (int) ($r->total_change ?? 0),
                ];
            })->values()->toArray();

        // Top products by inventory value (current)
        $topValueProducts = Stock::orderByDesc(DB::raw('quantity * buy_price'))
            ->take(8)
            ->get(['id', 'name', 'quantity', 'buy_price'])
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'value' => (float) ($p->quantity * $p->buy_price),
                ];
            })->values()->toArray();

        // Average daily movements (last 30 days)
        $movementsCount = StockMovement::where('created_at', '>=', now()->subDays(30))->count();
        $avgDailyMovements = round($movementsCount / 30.0, 2);

        // Stock age buckets (days since last movement)
        $lastMoves = StockMovement::select('stock_id', DB::raw('MAX(created_at) as last_moved'))->groupBy('stock_id');
        $stockAgesRaw = Stock::leftJoinSub($lastMoves, 'lm', function ($join) {
            $join->on('stocks.id', 'lm.stock_id');
        })->select('stocks.id', 'stocks.name', DB::raw('DATEDIFF(CURDATE(), COALESCE(lm.last_moved, stocks.created_at)) as days_since_move'))
            ->get();

        $stockAgeBuckets = [
            '0_7' => 0,
            '8_30' => 0,
            '31_90' => 0,
            '90_plus' => 0,
        ];

        foreach ($stockAgesRaw as $s) {
            $d = (int) $s->days_since_move;
            if ($d <= 7) {
                $stockAgeBuckets['0_7']++;
            } elseif ($d <= 30) {
                $stockAgeBuckets['8_30']++;
            } elseif ($d <= 90) {
                $stockAgeBuckets['31_90']++;
            } else {
                $stockAgeBuckets['90_plus']++;
            }
        }

        // Low stock percentage
        $lowStockPercentage = $totalProducts ? round(($lowStockCount / $totalProducts) * 100, 1) : 0;

        return Inertia::render('dashboard', [
            'totalProducts' => $totalProducts,
            'lowStockCount' => $lowStockCount,
            'inventoryValue' => $inventoryValue,
            'potentialProfit' => $potentialProfit,
            'recentMovements' => $recentMovements,
            'movementsPerDay' => $movementsPerDay,
            'topProducts' => $topProducts,
            'stockDistribution' => $stockDistribution,

            // new data
            'movementsByUser' => $movementsByUser,
            'topMovers' => $topMovers,
            'topValueProducts' => $topValueProducts,
            'avgDailyMovements' => $avgDailyMovements,
            'stockAgeBuckets' => $stockAgeBuckets,
            'lowStockPercentage' => $lowStockPercentage,
        ]);
    }
}
