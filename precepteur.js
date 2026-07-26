(() => {
  const form = document.getElementById('advisorForm');
  const input = document.getElementById('situation');
  const result = document.getElementById('advisorResult');
  const facts = document.getElementById('factsText');
  const intro = document.getElementById('advisorIntro');
  const restart = document.getElementById('restartAdvisor');
  if (!form || !input || !result || !facts || !intro || !restart) return;

  const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const profiles = [
    {
      keys: ['telephone','ecran','portable','reseau','tiktok','instagram','jeu video'],
      judgment: 'Le conflit peut donner l’impression que le téléphone est toute la cause. Il faut encore distinguer l’usage, le moment, la durée et ce que l’écran vient éventuellement éviter.',
      question: 'Lors du dernier conflit, quelle règle précise avait été annoncée, et que s’est-il passé exactement lorsqu’elle a dû s’appliquer ?',
      action: 'Formulez une seule règle observable pour une durée courte — par exemple le lieu où le téléphone est déposé le soir — puis convenez d’un moment précis pour en reparler.'
    },
    {
      keys: ['travail','devoir','note','ecole','college','lycee','motivation','bulletin'],
      judgment: 'Une baisse de travail ne signifie pas nécessairement un manque de volonté. Elle peut relever d’une difficulté, d’un découragement, d’une fatigue ou d’un conflit de sens.',
      question: 'Quel est le dernier travail qui n’a pas été fait, et qu’a dit votre enfant lorsqu’on lui a demandé ce qui l’en empêchait ?',
      action: 'Choisissez une tâche scolaire unique et limitée. Demandez à votre enfant d’identifier lui-même le premier obstacle, sans commencer par corriger ni conseiller.'
    },
    {
      keys: ['anxieux','anxiete','angoisse','isole','isolement','triste','pleure','peur'],
      judgment: 'Votre inquiétude mérite d’être prise au sérieux, mais une impression générale ne suffit pas encore à mesurer la situation. Il faut observer la durée, l’intensité et les changements concrets.',
      question: 'Depuis quand observez-vous ce changement, et quels signes précis touchent le sommeil, l’alimentation, les relations ou la fréquentation scolaire ?',
      action: 'Notez trois observations datées, puis proposez un échange calme. Si les signes sont durables, intenses ou s’aggravent, prenez rapidement conseil auprès d’un professionnel.'
    },
    {
      keys: ['limite','autorite','obeit','respect','colere','insulte','crise'],
      judgment: 'Le sentiment de perdre l’autorité peut conduire à vouloir rétablir immédiatement l’obéissance. Il est souvent plus utile de distinguer la règle, la manière dont elle a été posée et la réponse à sa transgression.',
      question: 'Quelle règle précise n’a pas été respectée lors du dernier épisode, et quelle conséquence avait été annoncée auparavant ?',
      action: 'Reprenez une seule règle, exprimez-la brièvement et annoncez une conséquence proportionnée que vous êtes réellement en mesure d’appliquer sans colère.'
    }
  ];

  function selectProfile(text) {
    const clean = normalize(text);
    return profiles.find(profile => profile.keys.some(key => clean.includes(key))) || {
      judgment: 'Votre formulation contient probablement à la fois une observation et une interprétation. Pour discerner, il faut les séparer sans minimiser votre inquiétude.',
      question: 'Pouvez-vous décrire le dernier épisode précis : où, quand, avec qui, et quelles paroles ou quels gestes ont été observés ?',
      action: 'Écrivez une phrase qui commence par « J’ai observé que… », sans employer « toujours », « jamais » ni attribuer d’intention. Utilisez cette phrase pour ouvrir le dialogue.'
    };
  }

  document.querySelectorAll('.situation-chips button').forEach(button => {
    button.type = 'button';
    button.addEventListener('click', () => {
      input.value = button.dataset.text || '';
      input.focus();
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = input.value.trim();
    if (value.length < 8) {
      input.setCustomValidity('Décrivez la situation en quelques mots supplémentaires.');
      input.reportValidity();
      return;
    }
    input.setCustomValidity('');
    const profile = selectProfile(value);
    facts.textContent = `Vous rapportez : « ${value} » Pour avancer, cette formulation doit maintenant être ramenée à une scène précise, observable et datée.`;
    const cards = result.querySelectorAll('.discern-grid article p');
    if (cards[1]) cards[1].textContent = profile.judgment;
    const question = result.querySelector('.preceptor-question p');
    const action = result.querySelector('.first-action p');
    if (question) question.textContent = profile.question;
    if (action) action.textContent = profile.action;
    form.hidden = true;
    intro.hidden = true;
    result.hidden = false;
    requestAnimationFrame(() => result.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  });

  restart.addEventListener('click', () => {
    result.hidden = true;
    form.hidden = false;
    intro.hidden = false;
    input.value = '';
    input.setCustomValidity('');
    input.focus();
  });
})();
