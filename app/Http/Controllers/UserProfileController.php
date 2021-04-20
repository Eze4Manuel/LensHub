<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserProfileController extends Controller
{
    //

    public function getUserProfile($id){
       $user = User::find($id);
       return $user;
    }

    public function editProfile(Request $request, $id){

       $user = User::find($id);
        $user->phone = $request->input('phone');
       $user->company = $request->input('company');
       $user->about = $request->input('about');
       $user->address = $request->input('address');

        $user->save();
       return true;
    }

    public function changepassword(Request $request, $id){
        //Checking both passwords to see if they match
        $user = User::find($id);

       if($request->input('newpass') !== $request->input('confirmpass') ){
         return false;
       }else if (! Hash::check($request->oldpass, $user->password)) {
        return  1;
      }else{
        $user->password = Hash::make($request->newpass);
        $user->save();
        return 2;
       }
      }

    public function deleteaccount($id){
      $user = User::find($id);
      $user->delete();
       return true;
     }

     public function getUserName($id){
       $user = User::find($id);
       return $user->name;
     }

     public function updateimage(Request $request, $id){
       $user = User::find($id);
        if ($request->file('file')->isValid()) {
         $image = $request->file('file');
         $path = $request->file->store('profileImages', 'public');
          Storage::disk('public')->delete($user->photo);

         $user->photo = $path;
         $user->save();
         return  true;
        }
        else{
          return 0;
        }
     }
     public function getProfileImage($id){
       $user = User::find($id);
       return $user->photo;


     }


}
