<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request){
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
            $username = $user->name;
            $email = $user->email;
            $surname = $user->surname;
            $number = $user->number;
            $status = $user->status;
            $company = $user->company;
            return response()->json([ 
                'status' => 200,
                'username' => $username,
                'email' => $email,
                'surname' => $surname,
                'number' => $number,
                'company' => $company,
                'user_status' => $status,
                'message' => 'User data'
            ]);
        }else{
            return response()->json([ 
                'message' => 'UserProfile Error'
            ]);
        }
    }

    public function updateProfile(Request $request){     
        $id =  $request->user()->id;
        $user_check = User::where("email",  $request->email)->where('id', '!=', $id)->first();
        $company_check = User::where("company",  $request->company)->where('id', '!=', $id)->first(); 
        
        if($user_check){
            return response()->json([ 
                'message' => "Email in use"
            ]);
        }

        if($company_check){
            return response()->json([ 
                'message' => "Company name in use"
            ]);
        }

        User::where("company",  $request->user()->company)->update(['company' => $request->company]); 
        User::where("id",  $request->user()->id)
            ->update(['name' => $request->username, 'surname' => $request->surname, 'email' => $request->email, 'number' => $request->number]); 
        return response()->json([ 
            'status' => 200,
            'message' => "User updated"
        ]);
    }

    public function changePassword(Request $request){          
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
        $user_db = User::where("company",  $request->user()->company)->get();
        if(!$user_db){
            return response()->json([
                'message' => 'No workers',
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'workers' => $user_db,
                'message' => 'Workers'
            ]);
        }
    }

}
