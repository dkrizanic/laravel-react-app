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
    Route::get('/projectList', [ProjectController::class, 'projectList']);
    Route::post('/updateProject', [ProjectController::class, 'updateProject']);
    Route::post('/deleteProject', [ProjectController::class, 'deleteProject']);
    Route::get('/groupList', [GroupController::class, 'groupList']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/createProject', [ProjectController::class, 'store']);
    Route::get('/userProfile', [UserController::class, 'userProfile']);
    Route::post('/updateProfile', [UserController::class, 'updateProfile']);
    Route::post('/changePassword', [UserController::class, 'changePassword']);
    Route::post('/deleteUser', [UserController::class, 'delete_everything']);
    Route::post('/addWorker', [UserController::class, 'addWorker']);
    Route::get('/workersList', [UserController::class, 'workersList']);
    Route::post('/createGroup', [GroupController::class, 'createGroup']);
    Route::get('/groupWorkersList', [GroupController::class, 'groupWorkersList']);
    Route::post('/deleteGroup', [GroupController::class, 'deleteGroup']);
    Route::post('/updateGroup', [GroupController::class, 'updateGroup']);
});



