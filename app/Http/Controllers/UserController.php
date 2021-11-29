<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request){
        $user_db = User::where("email",  $request->email)->first();
        if($user_db){
            return response()->json([
                'status' => 403,
                'message' => 'User already exists!',
            ]);
        }else{
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
                'token' => $token
            ]);
        }
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
                    'username' => $user->name
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
        $username = $user->name;
        $email = $user->email;
        $surname = $user->surname;
        $number = $user->number;
        $company = $user->company;

        if($user){
            return response()->json([ 
                'status' => 200,
                'username' => $username,
                'email' => $email,
                'surname' => $surname,
                'number' => $number,
                'company' => $company,
                'message' => 'User data'
            ]);
        }else{
            return response()->json([ 
                'message' => 'UserProfile Error'
            ]);
        }
    }

    public function updateProfile(Request $request){      
        $user_check = User::where("email",  $request->email)->first(); 
        
        if($user_check){
            if($user_check->id == $request->user()->id){
                $user = User::where("id",  $request->user()->id)
                ->update(['name' => $request->username, 'surname' => $request->surname, 'email' => $request->email, 'number' => $request->number,
                 'company' => $request->company]); 

                if($user){
                    return response()->json([ 
                        'status' => 200,
                        'message' => $request->username
                    ]);
                }else{
                    return response()->json([ 
                        'message' => 'User data not updated'
                    ]);
                }
            }else{
                return response()->json([ 
                    'message' => 'Email in use!'
                ]);
            }
        }else{
            $user = User::where("id",  $request->user()->id)
                ->update(['name' => $request->username, 'surname' => $request->surname, 'email' => $request->email, 'number' => $request->number,
                 'company' => $request->company]); 
            return response()->json([ 
                'status' => 200,
                'message' => $request->username
            ]);
        }
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

    public function destroy(Request $request){      
        User::where("id",  $request->user()->id)->first()->delete(); 
        $request->user()->currentAccessToken()->delete();
        return response()->json([ 
            'status' => 200,
            'message' => 'User deleted'
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
        if($user_db){
            return response()->json([
                'message' => 'No workers',
            ]);
        }else{
            $username = $user_db->name;
            $surname = $user_db->surname;
            $email = $user_db->email;
            $number = $user_db->number;

            return response()->json([
                'status' => 200,
                'username' => $username,
                'email' => $email,
                'surname' => $surname,
                'number' => $number,
                'message' => 'Workers'
            ]);
        }
    }
}
