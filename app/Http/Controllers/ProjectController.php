<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Group;
use App\Models\ProjectGroup;
use App\Models\Task;

class ProjectController extends Controller
{
    public function store(Request $request){
        $project = new Project;
        $project = new ProjectGroup;
        $project->user_id = $request->user()->id;
        $project->project_name = $request->project_name;
        $project->start_date = $request->start_date;
        $project->finish_date = $request->finish_date;
        $project->save();

        return response()->json([
            'status' => 200,
            'message' => 'Project added!'
        ]);
    }

    public function projectList(Request $request){
        $project_list = Project::where("user_id",  $request->user()->id)->get(); 
        if($project_list){
            return response()->json([ 
                'status' => 200,
                'project_list' => $project_list,
                'message' => 'Project list'
            ]);
        }else{
            return response()->json([ 
                'message' => 'No projects'
            ]);
        }
    }

    public function updateProject(Request $request){
        Project::where("id",  $request->project_id)->update(['project_name' => $request->project_name, 'start_date' => $request->start_date,
        'finish_date' => $request->finish_date]); 
        return response()->json([ 
            'status' => 200,
            'message' => 'Project updated!'
        ]);
    }

    public function deleteproject($id){
        Project::where("id", $id)->delete(); 
        return response()->json([ 
            'status' => 200,
            'message' => 'Project deleted!'
        ]);
    }

    public function storeTask(Request $request){
        $task = new Task();
        $task->project_id = $request->id;
        $task->task_name = $request->name;
        $task->work_time = $request->work_time;
        $task->description = $request->description;
        $task->save();

        return response()->json([
            'status' => 200,
            'message' => 'Task added!'
        ]);
    }

    public function taskList($id){
        $task_list = Task::where("project_id",  $id)->get(); 
        if($task_list){
            return response()->json([ 
                'status' => 200,
                'task_list' => $task_list,
                'message' => 'Task list'
            ]);
        }else{
            return response()->json([ 
                'message' => 'No tasks'
            ]);
        }
    }

    public function deleteTask($id){
        Task::where("id", $id)->delete(); 
        return response()->json([ 
            'status' => 200,
            'message' => 'Task deleted!'
        ]);
    }

    public function updateTask(Request $request){
        Task::where("id",  $request->id)->update(['task_name' => $request->name, 'work_time' => $request->work_time,
        'description' => $request->description]); 
        return response()->json([ 
            'status' => 200,
            'message' => 'Task updated!'
        ]);
    }
}
