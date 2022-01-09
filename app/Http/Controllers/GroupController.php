<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class GroupController extends Controller
{
    public function createGroup(Request $request){
        $group = new Group();
        $group->user_id = $request->user()->id;
        $group->group_name = $request->group_name;

        $group->save();

        return response()->json([
            'status' => 200,
            'message' => 'Group added!'
        ]);
    }

    public function groupList(Request $request){
        $group_list = Group::where("user_id",  $request->user()->id)->get(); 
        if($group_list){
            return response()->json([ 
                'group_list' => $group_list,
                'status' => 200,
                'message' => 'Group list'
            ]);
        }else{
            return response()->json([ 
                'message' => 'No groups yet'
            ]);
        }
    }

    public function groupWorkersList(Request $request){
        $workers_list = User::where("company",  $request->user()->company)->where("status", 0)->get(); 
        if($workers_list){
            return response()->json([ 
                'workers_list' => $workers_list,
                'status' => 200,
                'message' => 'Workers list'
            ]);
        }else{
            return response()->json([ 
                'message' => 'No workers yet'
            ]);
        }
    }

    public function deleteGroup($id){
        Group::where("id",  $id)->delete(); 
        return response()->json([ 
            'status' => 200,
            'message' => 'Group deleted!'
        ]);
    }

    public function updateGroup(Request $request){
        Group::where("id",  $request->group_id)->update(['group_name' => $request->group_name]); 
        return response()->json([ 
            'status' => 200,
            'message' => 'Group updated!'
        ]);
    }

    public function deleteWorker($id){
        User::where("id",  $id)->delete(); 
        return response()->json([ 
            'status' => 200,
            'message' => 'Worker deleted!'
        ]);
    }

    public function resetPassword(Request $request, $id){          
        $user = User::where("id",  $id)->first(); 
        $new_password_hash = Hash::make($request->new_password);
        if($user){
            $user->update(['password' => $new_password_hash]); 
            return response()->json([ 
                'status' => 200,
                'message' => 'Worker password reseted'
            ]);
        }else{
            return response()->json([ 
                'message' => 'User data not updated'
            ]);
        }
    }
    
}
