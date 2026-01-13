<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sku',
        'quantity',
        'buy_price',
        'sell_price',
        'low_stock_alert',
    ];

    public function movements()
    {
        return $this->hasMany(StockMovement::class);
    }
}
