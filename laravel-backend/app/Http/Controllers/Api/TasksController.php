<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request()->query('search');
        $userId = request()->query('user_id');
        $currentUser = User::find($userId);

        $query = Task::query();
        $users = User::pluck('name', 'id');

        if ($search) {
            $query->where('title', 'like', "%$search%");
        }

        if ($userId && $currentUser->role !== 1) {
            $query->where('assigned_to', $userId);
        }

        $tasks = $query->paginate(5);

        return Response()->json([
            'message' => 'Tasks fetched',
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => "required",
            'description' => "required",
        ]);

        $task = Task::create($request->all());

        return response()->json([
            'message' => 'Task registered successfully',
            'user' => $task
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::find($id);

        return response()->json([
            'message' => "Task fetched",
            'task' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => "required",
            'description' => "required",
        ]);

        $task = Task::find($id);
        $task->update($request->all());

        return response()->json([
            'message' => 'Task updated',
            'user' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        $task->delete();

        return response()->json([
            'message' => 'Task deleted',
        ]);
    }
}
