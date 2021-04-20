<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/*
  React Router Handling

  These are routes that displayes react files. They point to views
   which have div elements with id's the react js renders DOM
   elements to
*/

//Authentication Routes
Auth::routes(['verify' => true]);


Route::view('/admin/dashboard', 'home');
Route::view('/admin/user', 'home');
Route::view('/admin/rentgadget', 'home');
Route::view('/admin/stats', 'home');
Route::view('/admin/searchgadget', 'home');
Route::view('/admin/maps', 'home');
Route::view('/admin/logout', 'home');

Route::view('/welcome', 'react_pages/welcome');
Route::view('/', 'react_pages/welcome');
Route::get('/logoutuser', function(){
  Auth::logout();
  return 'logout';
});



//Normal Basi Routes with Controller Integration
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');






//Normal Basi Routes with Controller Integration
Route::get('/adminlogin', function(){
    return view('react_pages/adminlogin');
  });

  Route::get('/headlogoutuser', function(){
    Auth::guard('admin')->logout();
    return 'logout';
  });

   Route::view('/head/dashboard', 'react_pages/adminloginview')->middleware('auth:admin');
  Route::view('/head/logout', 'react_pages/adminloginview')->middleware('auth:admin');;


  Route::get('/item/{id}', function($id){
    return view('react_pages/item', ['item' => $id]);
  });


  Route::get('/item/product/{id}', function($id){
     
    return view('react_pages/item_product', ['itemProduct' => $id]);
  });



  Route::get('/react_pages/adminloginview', [App\Http\Controllers\HeadController::class, 'index'])->middleware('auth:admin');


  Route::post('/adminAuthenticate', [App\Http\Controllers\AdminController::class, 'authenticate'])->name('adminAuthenticate');
