<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Group;

class ProjectController extends Controller
{
    public function store(Request $request){
        $group = Group::where("group_name",  $request->group_name)->first(); 
        if($group){
            $project = new Project;
            $project->user_id = $request->user()->id;
            $project->project_name = $request->project_name;
            $project->start_date = $request->start_date;
            $project->finish_date = $request->finish_date;
            $project->groups_id = $group->id;
            $project->save();

            return response()->json([
                'status' => 200,
                'message' => 'Project added!'
            ]);
        }else{
            return response()->json([
                'message' => 'err!'
            ]);
        }
    }

    public function projectList(Request $request){
        $project_list = Project::where("user_id",  $request->user()->id)->get(); 
        if($project_list){
            return response()->json([ 
                'project_list' => $project_list,
                'status' => 200,
                'message' => 'Project list'
            ]);
        }else{
            return response()->json([ 
                'message' => 'No projects'
            ]);
        }
    }
}
