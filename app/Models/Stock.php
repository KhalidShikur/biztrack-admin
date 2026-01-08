<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
        'name',
        'sku',
        'quantity',
        'buy_price',
        'sell_price',
        'low_stock_alert',
    ];
}
