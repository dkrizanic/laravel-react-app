<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

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
}
