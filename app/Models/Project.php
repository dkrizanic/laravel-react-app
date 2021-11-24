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
        'status'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

}
