<?php require __DIR__ . '/partials.php'; render_head('Donate'); ?>
<main class="container" style="padding-bottom:40px">
  <section class="section-copy">
    <p style="font-size:58px;color:#b21f24;font-family:cursive;max-width:700px;">"Your small step today can save a life tomorrow; begin by completing the donation form."</p>
    <a class="card-btn" href="#form" style="margin-right:12px">Complete the form and let kindness flow</a>
    <a class="card-btn" href="/emergency.php">Emergency Need of Blood</a>
  </section>
  <section id="form" style="max-width:780px;margin:0 auto;background:#fff;padding:20px;border-radius:16px;border:1px solid #ddd">
    <h2>Donor Form</h2>
    <form method="post" action="/../api/donate.php">
      <p><input name="name" required placeholder="Full name" style="width:100%;padding:10px"></p>
      <p><input name="blood_group" required placeholder="Blood Group (A+, O-, etc.)" style="width:100%;padding:10px"></p>
      <p><input name="phone" required placeholder="Phone" style="width:100%;padding:10px"></p>
      <p><button class="card-btn" type="submit">Submit Donation Interest</button></p>
    </form>
  </section>
</main>
<?php render_end(); ?>
