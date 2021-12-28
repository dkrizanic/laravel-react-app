<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\GroupController;

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
    Route::get('/project', [ProjectController::class, 'projectList']);
    Route::put('/project', [ProjectController::class, 'updateProject']);
    Route::delete('/project/{id}', [ProjectController::class, 'deleteProject']);
    Route::post('/createProject', [ProjectController::class, 'store']);

    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'userProfile']);
    Route::put('/user', [UserController::class, 'updateProfile']);
    Route::delete('/user', [UserController::class, 'delete_everything']);
    Route::put('/changePassword', [UserController::class, 'changePassword']);
    Route::post('/addWorker', [UserController::class, 'addWorker']);
    Route::get('/workersList', [UserController::class, 'workersList']);


    Route::post('/createGroup', [GroupController::class, 'createGroup']);
    Route::get('/groupWorkersList', [GroupController::class, 'groupWorkersList']);
    Route::delete('/group/{id}', [GroupController::class, 'deleteGroup']);
    Route::post('/updateGroup', [GroupController::class, 'updateGroup']);
    Route::get('/group', [GroupController::class, 'groupList']);
});



