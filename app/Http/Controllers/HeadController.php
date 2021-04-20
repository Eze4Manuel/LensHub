<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Product;
 use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class HeadController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
 

  public function index()
  {
      return view('/react_pages/adminloginview');
  }

      public function getHeadActiveProducts(Request $request){
         $products = Product::where('verification_status', 1)->oldest()->skip($request->query('skip'))->take($request->query('take'))->get();
        return $products;
      }

      public function getHeadReviewingProducts(Request $request){
         $products = Product::where('verification_status', 0)->oldest()->skip($request->query('skip'))->take($request->query('take'))->get();
        return $products;
      }

      public function getHeadDeclinedProducts(Request $request){
         $products = Product::where('verification_status', 2)->oldest()->skip($request->query('skip'))->take($request->query('take'))->get();
        return $products;
      }

      public function deleteHeadProduct($id){
        $deletedRows = Product::where('product_id', $id)->delete();
        return $id;
      }

      public function setHeadApprove($id){
        $products = Product::find($id);
        $products->verification_status = 1;
        $products->save();
        return $products->product_id;
      }

      public function setHeadDecline($id){
        $products = Product::find($id);
        $products->verification_status = 2;
        $products->save();
        return $products->product_id;
      }
}
