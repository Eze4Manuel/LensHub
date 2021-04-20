<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getUserProfile/{id}',  [App\Http\Controllers\UserProfileController::class, 'getUserProfile']);
Route::post('/editProfile/{id}',  [App\Http\Controllers\UserProfileController::class, 'editProfile']);
Route::post('/changepassword/{id}',  [App\Http\Controllers\UserProfileController::class, 'changepassword']);
Route::post('/deleteaccount/{id}',  [App\Http\Controllers\UserProfileController::class, 'deleteaccount']);
Route::post('/getUserName/{id}',  [App\Http\Controllers\UserProfileController::class, 'getUserName']);
Route::post('/updateimage/{id}',  [App\Http\Controllers\UserProfileController::class, 'updateimage']);
Route::get('/getProfileImage/{id}',  [App\Http\Controllers\UserProfileController::class, 'getProfileImage']);

Route::post('/putProduct/{id}',  [App\Http\Controllers\ProductController::class, 'putProduct']);
Route::post('/productPhotos/{id}',  [App\Http\Controllers\ProductController::class, 'productPhotos']);
Route::post('/furtherProductDetails/{id}',  [App\Http\Controllers\ProductController::class, 'furtherProductDetails']);
Route::post('/removeProduct/{id}',  [App\Http\Controllers\ProductController::class, 'removeProduct']);

Route::get('/getTotalUploads/{id}',  [App\Http\Controllers\DashboardController::class, 'getTotalUploads']);
Route::get('/getUnreadNotifications/{id}',  [App\Http\Controllers\DashboardController::class, 'getUnreadNotifications']);
Route::get('/getAllProducts/{id}',  [App\Http\Controllers\DashboardController::class, 'getAllProducts']);
Route::get('/getActiveProducts/{id}',  [App\Http\Controllers\DashboardController::class, 'getActiveProducts']);
Route::get('/getReviewingProducts/{id}',  [App\Http\Controllers\DashboardController::class, 'getReviewingProducts']);
Route::get('/getDeclinedProducts/{id}',  [App\Http\Controllers\DashboardController::class, 'getDeclinedProducts']);
Route::get('/getProfileCompletion/{id}',  [App\Http\Controllers\DashboardController::class, 'getProfileCompletion']);
Route::post('/deleteProduct/{id}',  [App\Http\Controllers\DashboardController::class, 'deleteProduct']);



Route::get('/getHeadActiveProducts',  [App\Http\Controllers\HeadController::class, 'getHeadActiveProducts']);
Route::get('/getHeadReviewingProducts',  [App\Http\Controllers\HeadController::class, 'getHeadReviewingProducts']);
Route::get('/getHeadDeclinedProducts',  [App\Http\Controllers\HeadController::class, 'getHeadDeclinedProducts']);
Route::post('/deleteHeadProduct/{id}',  [App\Http\Controllers\HeadController::class, 'deleteHeadProduct']);
Route::post('/setHeadApprove/{id}',  [App\Http\Controllers\HeadController::class, 'setHeadApprove']);
Route::post('/setHeadDecline/{id}',  [App\Http\Controllers\HeadController::class, 'setHeadDecline']);


Route::get('/getItem',  [App\Http\Controllers\HomeItemController::class, 'getItem']);
Route::get('/getTotalItem',  [App\Http\Controllers\HomeItemController::class, 'getTotalItem']);
Route::get('/getUniqueProduct',  [App\Http\Controllers\HomeItemController::class, 'getUniqueProduct']);
Route::get('/getFilterItem',  [App\Http\Controllers\HomeItemController::class, 'getFilterItem']);
