@extends('layout')
@section('content')
<main class="container" style="max-width:780px;padding-bottom:30px">
  <h1 style="font-size:46px;color:#c51f24">Donor Form</h1>
  <form method="post" action="/donate" style="background:#fff;padding:20px;border-radius:14px;border:1px solid #ddd">
    @csrf
    <p><input name="name" required placeholder="Full name" style="width:100%;padding:10px"></p>
    <p><input name="blood_group" required placeholder="Blood Group" style="width:100%;padding:10px"></p>
    <p><input name="phone" required placeholder="Phone" style="width:100%;padding:10px"></p>
    <button class="card-btn" type="submit">Submit</button>
  </form>
</main>
@endsection
