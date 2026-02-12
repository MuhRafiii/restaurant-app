<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TableController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/tables', [TableController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/foods', [FoodController::class, 'index']);
    Route::post('/orders/{id}/close', [OrderController::class, 'close']);
    Route::get('/orders/{id}', [OrderController::class, 'detail']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'role:pelayan'])->group(function () {
    // Food
    Route::post('/foods', [FoodController::class, 'store']);
    Route::put('/foods/{id}', [FoodController::class, 'update']);
    Route::delete('/foods/{id}', [FoodController::class, 'destroy']);

    // Order
    Route::post('/orders/open', [OrderController::class, 'open']);
    Route::post('/orders/{id}/items', [OrderController::class, 'addItem']);
});

Route::middleware(['auth:sanctum', 'role:kasir'])->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}/receipt', [OrderController::class, 'receipt']);
});