<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function store(Request $request){
        $project = new Project;
        
        $project->project_name = $request->name;
        $project->start_date = $request->start_date;
        $project->finish_date = $request->finish_date;
        $project->save();

        return response()->json([
            'status' => 200,
            'message' => 'Project added!'
        ]);
    }
}
