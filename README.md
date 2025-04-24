
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ÉLUGAR - Comunidad Wellness</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Inter:wght@300;400&display=swap" rel="stylesheet">
  <style>
    :root {
      --main-color: #7BAE7F;
      --bg-color: #fdfdfb;
      --text-color: #333;
      --accent-color: #c5d8c8;
      --font-header: 'Playfair Display', serif;
      --font-body: 'Inter', sans-serif;
    }

    body {
      margin: 0;
      background: var(--bg-color);
      color: var(--text-color);
      font-family: var(--font-body);
    }

    header {
      background: var(--accent-color);
      padding: 2rem;
      text-align: center;
    }

    header h1 {
      font-family: var(--font-header);
      font-size: 2.5rem;
      margin: 0;
    }

    section {
      max-width: 900px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .section-title {
      font-family: var(--font-header);
      font-size: 2rem;
      margin-bottom: 1rem;
      text-align: center;
      color: var(--main-color);
    }

    .services {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
      text-align: center;
    }

    .service-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .service-card h3 {
      margin-top: 0.5rem;
    }

    .cta {
      text-align: center;
      margin: 3rem 0;
    }

    .cta a {
      display: inline-block;
      background: var(--main-color);
      color: white;
      text-decoration: none;
      padding: 1rem 2rem;
      border-radius: 30px;
      font-size: 1rem;
      transition: background 0.3s;
    }

    .cta a:hover {
      background: #679b6e;
    }

    footer {
      text-align: center;
      padding: 2rem 1rem;
      font-size: 0.9rem;
      background: var(--accent-color);
    }

    footer a {
      color: var(--text-color);
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <header>
    <h1>ÉLUGAR</h1>
    <p>Bienvenido a tu espacio de bienestar natural</p>
  </header>

  <section>
    <h2 class="section-title">Nuestros Servicios</h2>
    <div class="services">
      <div class="service-card">
        <h3>Barra Saludable</h3>
        <p>Bebidas nutritivas, batidos y meriendas balanceadas.</p>
      </div>
      <div class="service-card">
        <h3>Ejercicio</h3>
        <p>Clases grupales, pilates y movimiento consciente.</p>
      </div>
      <div class="service-card">
        <h3>Eventos</h3>
        <p>Encuentros, talleres y experiencias de bienestar.</p>
      </div>
      <div class="service-card">
        <h3>Bebidas Saludables</h3>
        <p>Tés energizantes, detox y elixir naturales.</p>
      </div>
      <div class="service-card">
        <h3>Motivación</h3>
        <p>Acompañamiento emocional y coaching inspirador.</p>
      </div>
    </div>
  </section>

  <section class="cta">
    <h2 class="section-title">Únete a nuestra comunidad</h2>
    <p>Conecta con el bienestar y una comunidad que vibra como tú</p>
    <a href="https://www.instagram.com/ehlugar.natural" target="_blank">@ehlugar.natural</a>
  </section>

  <footer>
    <p>© 2025 ÉLUGAR - Comunidad Wellness | Síguenos en <a href="https://www.instagram.com/ehlugar.natural" target="_blank">Instagram</a></p>
  </footer>

</body>
</html>
