<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index()
    {
        return response()->json(Food::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|integer',
            'description' => 'nullable|string'
        ]);

        $food = Food::create($request->all());

        return response()->json([
            'message' => 'Food created',
            'data' => $food
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $food = Food::findOrFail($id);

        $food->update($request->all());

        return response()->json([
            'message' => 'Food updated',
            'data' => $food
        ]);
    }

    public function destroy($id)
    {
        $food = Food::findOrFail($id);
        $food->delete();

        return response()->json([
            'message' => 'Food deleted'
        ]);
    }
}