<?php

namespace App\Http\Controllers;

use App\Models\Emergency;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmergencyController extends Controller
{
    public function create()
    {
        return view('emergency');
    }

    public function store(Request $request): RedirectResponse
    {
        $emergency = Emergency::create($request->validate([
            'hospital' => ['required', 'string', 'max:150'],
            'blood_group' => ['required', 'string', 'max:5'],
            'units' => ['required', 'integer', 'min:1'],
        ]));

        file_put_contents(storage_path('app/emergency.log'), json_encode([
            'type' => 'emergency',
            'hospital' => $emergency->hospital,
            'blood_group' => $emergency->blood_group,
            'units' => $emergency->units,
        ]) . PHP_EOL, FILE_APPEND);

        return back()->with('status', 'Emergency published');
    }
}
