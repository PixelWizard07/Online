@extends('layout')
@section('content')
<main class="container" style="max-width:780px;padding-bottom:30px">
  <h1 style="font-size:46px;color:#c51f24">Emergency Request</h1>
  <form method="post" action="/emergency" style="background:#fff;padding:20px;border-radius:14px;border:1px solid #ddd">
    @csrf
    <p><input name="hospital" required placeholder="Hospital" style="width:100%;padding:10px"></p>
    <p><input name="blood_group" required placeholder="Blood Group" style="width:100%;padding:10px"></p>
    <p><input name="units" type="number" min="1" required placeholder="Units" style="width:100%;padding:10px"></p>
    <button class="card-btn" type="submit">Broadcast</button>
  </form>
  <h2>Live Alerts</h2>
  <div data-alerts></div>
</main>
@endsection
