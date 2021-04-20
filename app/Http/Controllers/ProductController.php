<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
// use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    public function putProduct(Request $request, $id){
      $deletedRows = Product::where('photos', null)->delete();

      $product = new Product();
      $product->user_id = $id;
      $product->product_name = $request->input('product_name');
      $product->product_price = $request->input('product_price');
      $product->category = $request->input('category');
      $product->condition = $request->input('condition');
      $product->location = $request->input('location');
      $product->negotiable = $request->input('negotiable');
      $product->specifications = $request->input('specification');
      if($product->save()){
        $fetchProduct = Product::latest()->get();
        return $fetchProduct[0]->product_id;
      }

    }

    public function productPhotos(Request $request, $id){

       if ($request->file('file')->isValid()) {
        //Getting Uploaded file index.
         $index = $request->input('fileInfo');

        //Getting the product Instance
        $productId = $request->input('productId');

         //Getting FileName
         $fileName = $index .'-'.$productId.'-'.$request->input('fileName');

          //Making a Folder for each User
          Storage::makeDirectory('public/productPhotos/user_'.$id);
          //Making a Folder for each Product
          Storage::makeDirectory('public/productPhotos/user_'.$id.'/product_'.$productId);
          //Getting all the Files in a specific User Folder saving it as an array
          $files = Storage::files('public/productPhotos/user_'.$id.'/product_'.$productId);
          //Checking and deleting existing files for updated files

          for($i = 0; $i < count($files); $i++){
             if(Str::startsWith(Str::afterLast($files[$i], '/'), $index) ){
                if(Str::startsWith(Str::after(Str::afterLast($files[$i], '/'), '-'), $productId)){
                  Storage::delete($files[$i]);
                  break;
                }
            }
           }

        $path = $request->file->storeAs('productPhotos/user_'.$id.'/product_'.$productId, $fileName, 'public');
        $realPath = "public/".$path;
        //Updating Photos Column in DB
        $product = Product::find($productId);


          $product->photos = Storage::files('public/productPhotos/user_'.$id.'/product_'.$productId);
          $product->save();
        }


      }


    public function furtherProductDetails (Request $request, $id){

      $productId = $request->input("productId");
      $product = Product::find($productId);

      $product->address = $request->input('address');
      $product->lga = $request->input('lga');
      $product->account_name = $request->input('account_name');
      $product->account_number = $request->input('account_number');
      $product->bank = $request->input('bank');

      $product->save();
      return $product;
    }

    public function removeProduct(Request $request, $id){
      $productId = $request->input("productId");

      $product = Product::findorFail($productId);
      return $product->delete();
    }


}
