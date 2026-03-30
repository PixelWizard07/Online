<?php require __DIR__ . '/partials.php'; render_head('Blood Donation Home'); ?>
<main class="container hero">
  <section>
    <h1 class="title">Find or become a blood donor in minutes</h1>
    <p class="subtitle">Your small step today can save a life tomorrow.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin:20px 0">
      <a class="card-btn" href="/donate.php">Donor Eligibility</a>
      <a class="card-btn" href="/blood-types.php">Lives Saved</a>
      <a class="card-btn" href="/emergency.php">Emergency requests</a>
    </div>
    <ul class="list-check">
      <li>Improves heart health</li>
      <li>Burns calories</li>
      <li>Free health check-up</li>
      <li>Boosts blood cell growth</li>
      <li>Saves lives</li>
    </ul>
  </section>
  <section><div class="circle-photo"></div></section>
</main>
<?php render_end(); ?>
