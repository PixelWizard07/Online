<?php

namespace App\Http\Controllers;

use App\Models\Donor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function create()
    {
        return view('donate');
    }

    public function store(Request $request): RedirectResponse
    {
        Donor::create($request->validate([
            'name' => ['required', 'string', 'max:120'],
            'blood_group' => ['required', 'string', 'max:5'],
            'phone' => ['required', 'string', 'max:30'],
        ]));

        return back()->with('status', 'Donation interest submitted');
    }
}
