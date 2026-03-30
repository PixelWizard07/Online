<?php require __DIR__ . '/partials.php'; render_head('Blood Types Needed'); ?>
<main class="container" style="padding-bottom:50px">
  <section class="section-copy">
    <h2>Blood Types Needed</h2>
    <p>Accidents, surgeries, and medical treatments never take a holiday. One donation can help save up to three lives.</p>
  </section>
  <section class="blood-row">
    <?php foreach (['O+','O-','A+','A-','B+','B-','AB+','AB-'] as $type): ?>
      <div class="bag"><?= $type ?></div>
    <?php endforeach; ?>
  </section>
  <p class="center"><a class="big-button" href="/donate.php">Schedule Appointment</a></p>
</main>
<?php render_end(); ?>
