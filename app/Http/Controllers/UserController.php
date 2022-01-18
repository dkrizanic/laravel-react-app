<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'bail|required|max:32',
            'surname' => 'bail|required|max:32',
            'email' => 'bail|required|max:32|min:5',
            'company' => 'bail|required|max:32',
            'password' => 'bail|required|max:255|min:5',
            'number' => 'required|max:255|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'user validator failed'
            ]);
        }
        $user_db = User::where("email",  $request->email)->first();
        $company_name = User::where("company",  $request->company)->first();
        if($user_db){
            return response()->json([
                'status' => 403,
                'message' => 'User already exists!'
            ]);
        }
        if($company_name){
            return response()->json([
                'message' => 'Company already exists!'
            ]);
        }
        $user = new User;
        $user->name = $request->username;
        $user->surname = $request->surname;
        $user->email = $request->email;
        $user->number = $request->number;
        $user->company = $request->company;
        $user->status = 1;
        $user->password = Hash::make($request->password);
        $user->save();

        $token = $user->createToken('accessToken')->plainTextToken;

        return response()->json([
            'status' => 200,
            'message' => 'User added!',
            'username' => $request->username,
            'token' => $token,
            'user_status' => $user->status
        ]);
    }

    public function login(Request $request){
        $user = User::where("email",  $request->email)->first(); 
        if(!$user){
            return response()->json([
                'status' => 401,
                'message' => "User doesn't exist"
            ]);
        }else{
            if(!Hash::check($request->password, $user->password)){
                return response()->json([
                    'status' => 401,
                    'message' => "Wrong password"
                ]);

            }else{
                $token = $user->createToken('accessToken')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'message' => "User logged in",
                    'token' => $token,
                    'username' => $user->name,
                    'user_status' => $user->status
                ]);
            }
        }
    }

    public function logout(Request $request){          
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 200,
            'message' => "User logged out",
        ]);
    }

    public function userProfile(Request $request){       
        $user = User::where("id",  $request->user()->id)->first(); 
        if($user){
            return response()->json([ 
                'status' => 200,
                'username' => $user->name,
                'email' => $user->email,
                'surname' => $user->surname,
                'number' => $user->number,
                'company' => $user->company,
                'user_status' => $user->status,
                'image' => $user->image,
                'message' => 'User data'
            ]);
        }else{
            return response()->json([ 
                'message' => 'UserProfile Error'
            ]);
        }
    }

    public function updateProfile(Request $request){     
        $validator = Validator::make($request->all(), [
            'username' => 'bail|required|max:32',
            'surname' => 'bail|required|max:32',
            'email' => 'bail|required|max:32|min:5',
            'company' => 'required|max:32',
            'number' => 'required|max:255|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'user validator failed'
            ]);
        }   

        $id =  $request->user()->id;
        $user_check = User::where("email",  $request->email)->where('id', '!=', $id)->first();
        $company_check = User::where("company",  $request->company)->where('id', '!=', $id)->first(); 
        
        if($user_check){
            return response()->json([ 
                'message' => "Email in use"
            ]);
        }

        if($company_check && $id === 1){
            return response()->json([ 
                'message' => "Company name in use"
            ]);
        }

        User::where("company",  $request->user()->company)->update(['company' => $request->company]); 
        User::where("id",  $request->user()->id)
            ->update(['name' => $request->username, 'surname' => $request->surname, 'email' => $request->email, 'number' => $request->number,
             'image' => $request->image]); 
        return response()->json([ 
            'status' => 200,
            'message' => "User updated"
        ]);
    }

    public function changePassword(Request $request){   
        $validator = Validator::make($request->all(), [
            'new_password' => 'required|max:255|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'password error'
            ]);
        }   
        
        $user = User::where("id",  $request->user()->id)->first(); 
        $new_password_hash = Hash::make($request->new_password);
        if($user){
            if(Hash::check($request->old_password, $user->password)){
                $user->update(['password' => $new_password_hash]); 
                return response()->json([ 
                    'status' => 200,
                    'message' => 'Password updated'
                ]);
            }else{
                return response()->json([ 
                    'message' => 'Wrong password'
                ]);
            }
        }else{
            return response()->json([ 
                'message' => 'User data not updated'
            ]);
        }
    }

    public function delete_everything(Request $request){    
        User::where("company",  $request->user()->company)->delete(); 
        $request->user()->currentAccessToken()->delete();
        return response()->json([ 
            'status' => 200,
            'message' => 'company deleted!'
        ]);
    }

    public function addWorker(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'bail|required|max:32',
            'surname' => 'bail|required|max:32',
            'email' => 'bail|required|max:64|min:5',
            'password' => 'bail|required|max:255|min:5',
            'number' => 'required|max:32|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'worker data error'
            ]);
        }  

        $user_db = User::where("email",  $request->email)->first();
        if($user_db){
            return response()->json([
                'status' => 403,
                'message' => 'Worker already exists!',
            ]);
        }else{
            $user = new User;
            $user->name = $request->username;
            $user->surname = $request->surname;
            $user->email = $request->email;
            $user->number = $request->number;
            $user->status = 0;
            $user->company = $request->user()->company;
            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json([
                'status' => 200,
                'message' => 'Worker added',
            ]);
        }
    }

    public function workersList(Request $request){
        $user_db = User::where("company",  $request->user()->company)->where('status', '!=', 1)->get();
        if(!$user_db || count($user_db) == 0){
            return response()->json([
                'message' => 'No workers yet',
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'workers' => $user_db,
                'message' => 'Workers'
            ]);
        }
    }

    public function updateWorker(Request $request){
        $validator = Validator::make($request->all(), [
            'number' => 'bail|required|max:255|min:5',
            'username' => 'bail|required|max:32',
            'surname' => 'bail|required|max:32',
            'email' => 'required|max:32|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'worker update error'
            ]);
        } 

        $user_check = User::where("email",  $request->email)->where('id', '!=', $request->id)->first();
        if($user_check){
            return response()->json([
                'message' => 'Email already exists',
            ]);
        }else{
            User::where("id",  $request->id)
            ->update(['name' => $request->username, 'surname' => $request->surname, 'email' => $request->email, 'number' => $request->number]); 
            return response()->json([
                'status' => 200,
                'message' => 'Worker updated'
            ]);
        }
    }
    

}
