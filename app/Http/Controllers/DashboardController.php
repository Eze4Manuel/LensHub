<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class DashboardController extends Controller
{
    public function getTotalUploads($id){
      $product = DB::table('products')->where('user_id', $id)->count();
      return $product;
    }
    public function getUnreadNotifications($id){
      return $id;

    }
    public function getAllProducts(Request $request, $id){
       $products = Product::where('user_id', $id)->latest()->skip($request->query('skip'))->take($request->query('take'))->get();
      return $products;

    }
    public function getActiveProducts(Request $request, $id){
       $products = Product::where('user_id', $id)->where('verification_status', 1)->latest()->skip($request->query('skip'))->take($request->query('take'))->get();
      return $products;
    }

    public function getReviewingProducts(Request $request, $id){
       $products = Product::where('user_id', $id)->where('verification_status', 0)->latest()->skip($request->query('skip'))->take($request->query('take'))->get();
      return $products;
    }

    public function getDeclinedProducts(Request $request, $id){
       $products = Product::where('user_id', $id)->where('verification_status', 2)->latest()->skip($request->query('skip'))->take($request->query('take'))->get();
      return $products;
    }

    public function getProfileCompletion($id){
      $user = User::find($id);
      return $user;
    }


        public function deleteProduct($id){
          $deletedRows = Product::where('product_id', $id)->delete();

          return $id;
        }
}
