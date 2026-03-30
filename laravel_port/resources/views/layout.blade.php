<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{{ $title ?? 'Blood Donation' }}</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
<div class="site-shell">
  <nav class="navbar container">
    <div class="logo"><span class="logo-badge">🩸</span><span>BLOOD<br>DONATION</span></div>
    <div class="nav-links">
      <a href="/">Home</a><a href="/donate">Donate</a><a href="/join">Join our Team</a><a href="/contact">Contact</a>
    </div>
  </nav>
  @yield('content')
</div>
<script src="/assets/js/app.js"></script>
</body>
</html>
