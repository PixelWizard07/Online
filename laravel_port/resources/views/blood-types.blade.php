@extends('layout')
@section('content')
<main class="container">
  <section class="section-copy">
    <h2>Blood Types Needed</h2>
  </section>
  <section class="blood-row">
    @foreach(['O+','O-','A+','A-','B+','B-','AB+','AB-'] as $type)
      <div class="bag">{{ $type }}</div>
    @endforeach
  </section>
</main>
@endsection
