<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\TableController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'role:kasir'])->group(function () {

    // FOOD
    Route::get('/foods', [FoodController::class, 'index']);
    Route::post('/foods', [FoodController::class, 'store']);
    Route::put('/foods/{id}', [FoodController::class, 'update']);
    Route::delete('/foods/{id}', [FoodController::class, 'destroy']);

    // TABLE
    Route::get('/tables', [TableController::class, 'index']);
});
