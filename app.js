const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const menuToggle = $("#menuToggle");
const siteNav = $("#siteNav");
menuToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$(".site-nav a").forEach(a => a.addEventListener("click", () => {
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#readingProgress").style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
});

const reflectionInput = $("#reflectionInput");
const savedReflection = localStorage.getItem("institut_reflection");
if (savedReflection) reflectionInput.value = savedReflection;
$("#saveReflection").addEventListener("click", () => {
  localStorage.setItem("institut_reflection", reflectionInput.value.trim());
  $("#saveStatus").textContent = "Réflexion conservée sur cet appareil.";
  showToast("Votre réflexion a été conservée.");
});

const interview = {
  step: 0,
  answers: [],
  questions: [
    "Qu’aimeriez-vous que je comprenne avant toute chose ?",
    "Si je reformule, cette situation vous préoccupe parce qu’elle touche à quelque chose de plus profond. Qu’est-ce qui vous inquiète le plus exactement ?",
    "Depuis quand observez-vous cette difficulté, et est-elle ponctuelle ou répétée ?",
    "Qu’avez-vous déjà essayé, même de manière informelle ?",
    "Parmi les éléments que vous venez de décrire, qu’est-ce qui dépend réellement de votre action aujourd’hui ?"
  ]
};

const interviewCard = $("#interviewCard");
const conversation = $("#conversation");
const form = $("#interviewForm");
const input = $("#interviewInput");

function addMessage(type, text) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = `<small>${type === "guide" ? "L’Institut" : "Vous"}</small>${escapeHtml(text)}`;
  conversation.appendChild(div);
  conversation.scrollTop = conversation.scrollHeight;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML.replace(/\n/g, "<br>");
}

function beginInterview() {
  interview.step = 0;
  interview.answers = [];
  conversation.innerHTML = "";
  interviewCard.hidden = false;
  $("#dossier").hidden = true;
  addMessage("guide", "Prenons quelques minutes. Je vous poserai une seule question à la fois.");
  setTimeout(() => addMessage("guide", interview.questions[0]), 250);
  interviewCard.scrollIntoView({ behavior: "smooth", block: "center" });
  input.focus();
}

$("#startInterview").addEventListener("click", beginInterview);
$("#resetInterview").addEventListener("click", beginInterview);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  addMessage("reader", value);
  interview.answers.push(value);
  input.value = "";
  interview.step += 1;

  if (interview.step < interview.questions.length) {
    setTimeout(() => addMessage("guide", interview.questions[interview.step]), 350);
  } else {
    setTimeout(() => {
      addMessage("guide", "Je perçois maintenant trois niveaux dans votre situation : les faits, l’inquiétude qu’ils suscitent, et la décision qui vous appartient. Je vous propose d’en garder une synthèse.");
      form.hidden = true;
      buildDossier();
    }, 400);
  }
});

function buildDossier() {
  const first = interview.answers[0] || "la situation que vous avez décrite";
  const concern = interview.answers[1] || "l’inquiétude qui accompagne cette situation";
  const summary = `Vous êtes venu pour clarifier ${first.toLowerCase()}. Au fil de l’échange, il apparaît que l’enjeu ne se limite pas aux faits eux-mêmes : il concerne aussi ${concern.toLowerCase()}. Avant toute intervention, le premier travail consiste à vérifier ce qui se répète, ce qui reste ponctuel et ce qui peut encore être tenté par votre enfant.`;

  $("#dossierSummary").textContent = summary;
  $("#dossierDate").textContent = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date());
  $("#dossier").hidden = false;
  localStorage.setItem("institut_last_interview", JSON.stringify({
    date: new Date().toISOString(),
    answers: interview.answers,
    summary
  }));
  setTimeout(() => $("#dossier").scrollIntoView({ behavior: "smooth" }), 500);
}

$("#printDossier").addEventListener("click", () => window.print());
$("#closeJourney").addEventListener("click", () => showToast("Votre dossier reste disponible sur cet appareil."));

const libraryContent = {
  echec: {
    label: "Fiche Institut 01",
    title: "L’échec scolaire",
    html: `
      <p>L’échec ne constitue pas une catégorie unique. Il peut désigner un résultat ponctuel, une difficulté durable, un décalage entre attentes et performance ou encore une expérience de comparaison sociale.</p>
      <h3>Questions utiles</h3>
      <ul><li>Que sait-on avec certitude ?</li><li>La difficulté est-elle nouvelle ou répétée ?</li><li>L’enfant comprend-il ce qui a conduit au résultat ?</li><li>Dispose-t-il d’un prochain essai identifiable ?</li></ul>
      <h3>Référence</h3>
      <p>Gunderson, E. A. et al. (2013), <em>Child Development</em>, 84(5), 1526–1541.</p>`
  },
  autorite: {
    label: "Fiche Institut 02",
    title: "L’autorité",
    html: `
      <p>L’autorité éducative ne se réduit ni au contrôle ni à la négociation permanente. Elle articule un cadre intelligible, une parole cohérente et des conséquences proportionnées.</p>
      <h3>Questions utiles</h3>
      <ul><li>La règle est-elle claire avant d’être transgressée ?</li><li>La conséquence est-elle liée au comportement ?</li><li>La dignité de l’enfant reste-t-elle préservée ?</li></ul>
      <h3>Lecture</h3>
      <p>Hannah Arendt, « La crise de l’éducation », dans <em>La crise de la culture</em>.</p>`
  },
  ecrans: {
    label: "Fiche Institut 03",
    title: "Les écrans",
    html: `
      <p>Les conflits autour des écrans mêlent souvent durée, type d’usage, sommeil, attention, sociabilité et sentiment de contrôle parental. Une règle utile doit préciser le contexte qu’elle cherche à protéger.</p>
      <h3>Questions utiles</h3>
      <ul><li>Quel usage pose réellement problème ?</li><li>Quel rythme de vie cherche-t-on à préserver ?</li><li>La règle vaut-elle aussi pour les adultes ?</li></ul>
      <h3>Point de vigilance</h3>
      <p>Éviter les causalités simplistes : tous les usages numériques ne se valent pas, et les effets dépendent du contexte, du contenu et de la vulnérabilité de chacun.</p>`
  }
};

const dialog = $("#libraryDialog");
$$("[data-library]").forEach(button => {
  button.addEventListener("click", () => {
    const item = libraryContent[button.dataset.library];
    $("#dialogLabel").textContent = item.label;
    $("#dialogTitle").textContent = item.title;
    $("#dialogContent").innerHTML = item.html;
    dialog.showModal();
  });
});
$("#dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

const lastInterview = localStorage.getItem("institut_last_interview");
if (lastInterview) {
  try {
    const data = JSON.parse(lastInterview);
    if (data.summary) {
      $("#dossierSummary").textContent = data.summary;
      $("#dossierDate").textContent = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(data.date));
    }
  } catch {}
}
