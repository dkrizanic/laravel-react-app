<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;


class ProjectController extends Controller
{
    public function store(Request $request){
        $project = new Project;
        $project->user_id = $request->user()->id;
        $project->project_name = $request->project_name;
        $project->start_date = $request->start_date;
        $project->finish_date = $request->finish_date;
        $project->status = 1;
        $project->save();

        return response()->json([
            'status' => 200,
            'message' => 'Project added!'
        ]);
    }

    public function projectList(Request $request){
        $project_list = Project::all()->where("user_id",  $request->user()->id)->toArray(); 
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
