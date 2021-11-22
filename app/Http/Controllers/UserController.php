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

        if($user){
            return response()->json([ 
                'status' => 200,
                'username' => $username,
                'email' => $email,
                'surname' => $surname,
                'message' => 'User data'
            ]);
        }else{
            return response()->json([ 
                'message' => 'UserProfile Error'
            ]);
        }
    }

    public function updateProfile(Request $request){          
        $user = User::where("id",  $request->user()->id)->first(); 

        if($user){
            return response()->json([ 
                'status' => 200,
                'message' => 'User updated'
            ]);
        }else{
            return response()->json([ 
                'message' => 'User data not updated'
            ]);
        }
    }

    public function changePassword(Request $request){          
        $user = User::where("id",  $request->user()->id)->first(); 

        if($user){
            return response()->json([ 
                'status' => 200,
                'message' => 'User updated'
            ]);
        }else{
            return response()->json([ 
                'message' => 'User data not updated'
            ]);
        }
    }

    public function destroy(Request $request){          
        $user = User::where("id",  $request->user()->id)->first(); 

        if($user){
            return response()->json([ 
                'status' => 200,
                'message' => 'User updated'
            ]);
        }else{
            return response()->json([ 
                'message' => 'User data not updated'
            ]);
        }
    }
}
