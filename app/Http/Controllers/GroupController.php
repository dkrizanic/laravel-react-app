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
}
