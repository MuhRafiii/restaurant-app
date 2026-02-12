<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Table;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function open(Request $request)
    {
        $request->validate([
            'table_id' => 'required|exists:tables,id'
        ]);

        $table = Table::findOrFail($request->table_id);

        if ($table->status !== 'available') {
            return response()->json([
                'message' => 'Meja sedang digunakan'
            ], 400);
        }

        $order = Order::create([
            'table_id' => $table->id,
            'user_id' => $request->user()->id,
            'status' => 'open',
            'total_price' => 0,
            'opened_at' => now()
        ]);

        $table->update(['status' => 'occupied']);

        return response()->json([
            'message' => 'Order berhasil dibuka',
            'data' => $order
        ], 201);
    }

    public function detail($id)
    {
        $order = Order::with([
            'table',
            'items.food'
        ])->findOrFail($id);

        return response()->json([
            'message' => 'Detail order',
            'data' => $order
        ]);
    }

    public function addItem(Request $request, $id)
    {
        $request->validate([
            'food_id' => 'required|exists:foods,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $order = Order::findOrFail($id);

        if ($order->status !== 'open') {
            return response()->json([
                'message' => 'Order sudah ditutup'
            ], 400);
        }

        $food = Food::findOrFail($request->food_id);

        $subtotal = $food->price * $request->quantity;

        $item = OrderItem::create([
            'order_id' => $order->id,
            'food_id' => $food->id,
            'quantity' => $request->quantity,
            'price' => $food->price,
            'subtotal' => $subtotal
        ]);

        $order->increment('total_price', $subtotal);

        return response()->json([
            'message' => 'Makanan ditambahkan ke order',
            'data' => $item
        ], 201);
    }

    public function close($id)
    {
        $order = Order::with('table')->findOrFail($id);

        if ($order->status !== 'open') {
            return response()->json([
                'message' => 'Order sudah ditutup'
            ], 400);
        }
        
        if ($order->status !== 'open') {
            return response()->json([
                'message' => 'Order sudah ditutup'
            ], 400);
        }

        $order->update([
            'status' => 'closed',
            'closed_at' => now()
        ]);

        $order->table()->update(['status' => 'available']);

        return response()->json([
            'message' => 'Order berhasil ditutup',
            'data' => $order
        ]);
    }

    public function index()
    {
        $orders = Order::with('table')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'List order',
            'data' => $orders
        ]);
    }

    public function receipt($id)
    {
        $order = Order::with('items.food', 'table')
            ->findOrFail($id);

        $pdf = Pdf::loadView('receipt', compact('order'));

        return $pdf->download('receipt-order-'.$order->id.'.pdf');
    }
}