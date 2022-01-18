<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\GroupController;
use App\Http\Middleware\Status;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/createUser', [UserController::class, 'store']);
Route::post('/loginUser', [UserController::class, 'login']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/projects', [ProjectController::class, 'projectList']);
    Route::put('/projects', [ProjectController::class, 'updateProject'])->middleware("status");
    Route::delete('/projects/{id}', [ProjectController::class, 'deleteProject'])->middleware("status");
    Route::delete('/task/{id}', [ProjectController::class, 'deleteTask'])->middleware("status");
    Route::post('/projects', [ProjectController::class, 'store'])->middleware("status");
    Route::post('/task', [ProjectController::class, 'storeTask'])->middleware("status");
    Route::put('/task', [ProjectController::class, 'updateTask'])->middleware("status");
    Route::get('/tasks/{id}', [ProjectController::class, 'taskList'])->middleware("status");;

    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'userProfile']);
    Route::put('/user', [UserController::class, 'updateProfile']);
    Route::delete('/user', [UserController::class, 'delete_everything'])->middleware("status");
    Route::delete('/worker/{id}', [GroupController::class, 'deleteWorker'])->middleware("status");
    Route::put('/change-password', [UserController::class, 'changePassword']);
    Route::post('/new-worker', [UserController::class, 'addWorker'])->middleware("status");
    Route::get('/workers', [UserController::class, 'workersList'])->middleware("status");
    Route::put('/workers', [UserController::class, 'updateWorker'])->middleware("status");


    Route::post('/new-group', [GroupController::class, 'createGroup'])->middleware("status");
    Route::get('/group-workers', [GroupController::class, 'groupWorkersList'])->middleware("status");
    Route::delete('/group/{id}', [GroupController::class, 'deleteGroup'])->middleware("status");
    Route::post('/group', [GroupController::class, 'updateGroup'])->middleware("status");
    Route::get('/group', [GroupController::class, 'groupList'])->middleware("status");
    Route::put('/reset-password/{id}', [GroupController::class, 'resetPassword'])->middleware("status");
});





