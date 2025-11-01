document.addEventListener("DOMContentLoaded", () => {
  // Feather icons
  feather.replace();

  // VANTA background
  VANTA.NET({
    el: "#hero",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xcc0000,
    backgroundColor: 0x0,
    points: 8.00,
    maxDistance: 22.00,
    spacing: 18.00
  });

  // Formspree form
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/myzbjjyd", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Mensagem enviada com sucesso!";
        form.reset();
      } else {
        const result = await response.json();
        status.textContent = result.error || "Erro ao enviar a mensagem.";
      }
    } catch (err) {
      status.textContent = "Erro ao enviar a mensagem.";
      console.error(err);
    }
  });

  // Último repositório do GitHub
  const repoName = document.getElementById("repo-name");
  const repoLink = document.getElementById("repo-link");

  fetch("https://api.github.com/users/IsHirog/repos?sort=updated&direction=desc")
    .then(res => res.json())
    .then(repos => {
      if (repos.length > 0) {
        const lastRepo = repos[0];
        repoName.textContent = lastRepo.name;
        repoLink.href = lastRepo.html_url;
      } else {
        repoName.textContent = "Nenhum repositório encontrado.";
      }
    })
    .catch(err => {
      console.error("Erro ao buscar repositórios:", err);
      repoName.textContent = "Erro ao carregar.";
    });
});
