<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;

class HomeItemController extends Controller
{

  public function getItem(Request $request){
    $category = $request->query('category');
    $skip = $request->query('skip');
    $take = $request->query('take');
    $products = Product::where('category', "=", $category)->latest()->skip($skip)->take($take)->get();
     return $products;
  }
  public function getTotalItem(Request $request) {
    $category = $request->query('category');
    $product =  Product::where('category', "=", $category)->count();
    return $product;
  }

  public function getUniqueProduct(Request $request){
    $product_id = $request->query('product_id');
    $product =  Product::where('product_id', "=", $product_id)->get();
    $user =  User::where('id', "=", $product[0]['user_id'])->get();

    return [
      'product_name' => $product[0]['product_name'],
      'product_price' => $product[0]['product_price'],
      'condition' => $product[0]['condition'],
      'category' => $product[0]['category'],
      'location' => $product[0]['location'],
      'negotiable' => $product[0]['negotiable'],
      'specifications' => $product[0]['specifications'],
      'photos' => $product[0]['photos'],
       'userphone' => $user[0]['phone'],
       'useremail' => $user[0]['email']
      ];
  }

  public function getFilterItem(Request $request){
    $category = $request->query('category');
    $skip = $request->query('skip');
    $take = $request->query('take');
    $price = $request->query('price');
    $location = $request->query('location');
    $products;
    if($location == ""){
      if($price > 1000000){
        $products = Product::where('category', "=", $category)->latest()->skip($skip)->take($take)->get();
        $total = Product::where('category', "=", $category)->count();
        return ['product' => $products, 'total' => $total, 'form' => "L0P0" ];
      }else{
        $products = Product::where('category', "=", $category)->where('product_price', '<=', $price)->latest()->skip($skip)->take($take)->get();
        $total = Product::where('category', "=", $category)->where('product_price', '<=', $price)->count();
        return ['product' => $products, 'total' => $total, 'form' => "L0P1" ];
      }
    }
    elseif ($location != "") {
      if($price > 1000000){
        $total = Product::where([ ['category', "=", $category], ['location', '=', $location] ])->count();
        $products = Product::where([ ['category', "=", $category], ['location', '=', $location] ])->latest()->skip($skip)->take($take)->get();
        return ['product' => $products, 'total' => $total, 'form' => "L1P0" ];
      } else{
        $products = Product::where('category', "=", $category)->where('product_price', '<=', $price)->where('location', '=', $location)->latest()->skip($skip)->take($take)->get();
        $total = Product::where('category', "=", $category)->where('product_price', '<=', $price)->where('location', '=', $location)->count();
        return ['product' => $products, 'total' => $total, 'form' => "L1P1" ];
      }
    }



   }

}
