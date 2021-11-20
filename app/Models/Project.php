<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'project_name',
        'start_date',
        'finish_date',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

}
