<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Group;
use App\Models\ProjectGroup;
use App\Models\Task;
use App\Models\TaskWorkers;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function store(Request $request){
        $project = new Project;
        $project->user_id = $request->user()->id;
        $project->project_name = $request->project_name;
        $project->start_date = $request->start_date;
        $project->finish_date = $request->finish_date;
        $project->save();
        $group_number = count($request->groups);
        for($i = 0; $i < $group_number; $i++){
            $project_group = new ProjectGroup;
            $project_group->project_id = $project->id;
            $project_group->group_id = $request->groups[$i];
            $project_group->save();
        }
        
       
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

        $workers_number = count($request->workers);
        if($workers_number > 0){
            $task->task_status = 1;
        }else{
            $task->task_status = 0;
        }
        $task->save();
        for($i = 0; $i < $workers_number; $i++){
            $task_worker = new TaskWorkers();
            $task_worker->task_id = $task->id;
            $task_worker->user_id = $request->workers[$i];
            $task_worker->save();
        }

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

    public function taskWorkers(Request $request, $id){
        $groups = DB::table('project_groups')
            ->where('project_groups.project_id', $id)
            ->join('group_workers', 'group_workers.group_id', '=', 'project_groups.group_id')
            ->select('user_id')
            ->distinct();

        $users = DB::table('users')
        ->joinSub($groups, 'groups', function ($join) {
            $join->on('users.id', '=', 'groups.user_id');
        })->get(['name', 'surname', 'id']);

        return response()->json([ 
            'status' => 200,
            'workers_list' =>  $users,
            'message' => 'Group list'
        ]);
    }

    public function taskStatus(Request $request){
        Task::where("id",  $request->id)->update(['task_status' => 1]); 
        return response()->json([ 
            'status' => 200,
            'message' => 'Task set to unfinished status'
        ]);
    }

    public function taskListForWorker(Request $request){
        $task_list = DB::table('task_workers')
            ->rightJoin('tasks', 'tasks.id', '=', 'task_workers.user_id')
            ->distinct()
            ->get(['task_name', 'tasks.id']);
        return response()->json([ 
            'status' => 200,
            'task_list' => $task_list,
            'message' => 'Task list'
        ]);
    }
}
