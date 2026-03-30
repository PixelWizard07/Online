<?php
function render_head(string $title): void
{
    echo "<!doctype html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'>";
    echo "<title>{$title}</title>";
    echo "<link rel='preconnect' href='https://fonts.googleapis.com'>";
    echo "<link rel='stylesheet' href='/assets/css/style.css'>";
    echo "</head><body><div class='site-shell'>";
    echo "<nav class='navbar container'>";
    echo "<div class='logo'><span class='logo-badge'>🩸</span><span>BLOOD<br>DONATION</span></div>";
    echo "<div class='nav-links'><a href='/index.php'>Home</a><a href='/donate.php'>Donate</a><a href='/join.php'>Join our Team</a><a href='/contact.php'>Contact</a></div>";
    echo "</nav>";
}

function render_end(): void
{
    echo "</div><script src='/assets/js/app.js'></script></body></html>";
}
