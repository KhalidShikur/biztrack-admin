<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\StockMovement;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stocks = Stock::all()->map(function ($stock) {
            return [
                ...$stock->toArray(),
                'is_low' => $stock->quantity <= $stock->low_stock_alert,
                'profit_per_item' => $stock->sell_price - $stock->buy_price,
            ];
        });

        $lowStockCount = Stock::whereColumn(
            'quantity',
            '<=',
            'low_stock_alert'
        )->count();

        return Inertia::render('Stocks/Index', [
            'stocks' => $stocks,
            'lowStockCount' => $lowStockCount,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Stocks/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'sku' => 'required|unique:stocks',
            'quantity' => 'required|integer|min:0',
            'buy_price' => 'required|numeric',
            'sell_price' => 'required|numeric',
        ]);

        $stock = Stock::create($request->all());

        StockMovement::create([
            'stock_id' => $stock->id,
            'user_id' => Auth::id(),
            'change' => $stock->quantity,
            'quantity_after' => $stock->quantity,
            'reason' => 'Initial stock',
        ]);

        return redirect('/stocks');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        return Inertia::render('Stocks/Edit', [
            'stock' => $stock,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stock $stock)
    {
        $oldQuantity = $stock->quantity;

        $stock->update($request->all());

        $diff = $stock->quantity - $oldQuantity;
        if ($diff != 0) {
            StockMovement::create([
                'stock_id' => $stock->id,
                'user_id' => Auth::id(),
                'change' => $diff,
                'quantity_after' => $stock->quantity,
                'reason' => 'Stock update',
            ]);
        }

        return redirect('/stocks');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        $stock->delete();
        return redirect('/stocks');
    }

    /**
     * Display the stock movement history for a specific stock item.
     */
    public function history(Stock $stock)
    {
        return Inertia::render('Stocks/History', [
            'stock' => $stock,
            'movements' => $stock->movements()->with('user')->latest()->get(),
        ]);
    }
}