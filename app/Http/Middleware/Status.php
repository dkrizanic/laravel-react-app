<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Status 
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if($request->user()->status === 1){
            return $next($request);
        }else{
            return response()->json([ 
                'message' => '403'
            ]);
        }

    }
}
