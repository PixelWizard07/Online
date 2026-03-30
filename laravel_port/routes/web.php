<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\EmergencyController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'home');
Route::view('/join', 'join');
Route::view('/blood-types', 'blood-types');
Route::view('/contact', 'contact');
Route::get('/donate', [DonationController::class, 'create']);
Route::post('/donate', [DonationController::class, 'store']);
Route::get('/emergency', [EmergencyController::class, 'create']);
Route::post('/emergency', [EmergencyController::class, 'store']);
