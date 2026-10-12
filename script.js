const searchInput = document.querySelector("#searchInput");
const typeFilter = document.querySelector("#typeFilter");
const searchButton = document.querySelector("#searchButton");
const opportunityCards = [...document.querySelectorAll(".opportunity-card")];
const jobsCount = document.querySelector("#jobsCount");
const coursesCount = document.querySelector("#coursesCount");
const toast = document.querySelector("#toast");

function filterOpportunities() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const type = typeFilter.value;
  let visibleJobs = 0;
  let visibleCourses = 0;

  opportunityCards.forEach((card) => {
    const cardType = card.dataset.type;
    const searchableText = `${card.innerText} ${card.dataset.search}`.toLocaleLowerCase("pt-BR");
    const matchesText = !query || searchableText.includes(query);
    const matchesType = type === "todos" || cardType === type;
    const visible = matchesText && matchesType;
    card.hidden = !visible;

    if (visible && cardType === "vaga") visibleJobs++;
    if (visible && cardType === "curso") visibleCourses++;
  });

  jobsCount.textContent = `${visibleJobs} ${visibleJobs === 1 ? "oportunidade" : "oportunidades"}`;
  coursesCount.textContent = `${visibleCourses} ${visibleCourses === 1 ? "oportunidade" : "oportunidades"}`;

  document.querySelectorAll(".cards-grid").forEach((grid) => {
    const visibleCards = [...grid.querySelectorAll(".opportunity-card")].some((card) => !card.hidden);
    let empty = grid.querySelector(".empty-state");
    if (!visibleCards && !empty) {
      empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Nenhuma oportunidade encontrada. Tente outra palavra-chave ou altere o filtro.";
      grid.appendChild(empty);
    } else if (visibleCards && empty) {
      empty.remove();
    }
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

searchButton.addEventListener("click", () => {
  filterOpportunities();
  showToast("Busca atualizada. Confira os resultados abaixo.");
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    filterOpportunities();
    showToast("Busca atualizada. Confira os resultados abaixo.");
  }
});

typeFilter.addEventListener("change", filterOpportunities);

document.querySelectorAll('a[href="#como-verificar"]').forEach((link) => {
  link.addEventListener("click", () => {
    showToast("Confira sempre os canais oficiais antes de se candidatar.");
  });
});

filterOpportunities();
