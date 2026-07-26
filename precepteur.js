(() => {
  const form = document.getElementById('advisorForm');
  if (!form) return;

  const input = document.getElementById('situation');
  const intro = document.getElementById('advisorIntro');
  const result = document.getElementById('advisorResult');
  const progress = document.getElementById('advisorProgress');
  const progressBar = document.getElementById('advisorProgressBar');
  const stepLabel = document.getElementById('advisorStepLabel');
  const question = document.getElementById('advisorQuestion');
  const submit = document.getElementById('advisorSubmit');
  const messages = document.getElementById('advisorMessages');

  const answers = [];
  const prompts = [
    {
      label: 'Que s’est-il passé ?',
      placeholder: 'Décrivez un épisode précis : qui était présent, ce qui a été dit ou fait, et ce qui vous inquiète.',
      button: 'Continuer'
    },
    {
      label: 'Qu’avez-vous observé directement, sans interprétation ?',
      placeholder: 'Par exemple : « il a refusé d’ouvrir son cahier trois soirs de suite » plutôt que « il est devenu paresseux ».',
      button: 'Continuer'
    },
    {
      label: 'Qu’avez-vous déjà essayé, et avec quel effet ?',
      placeholder: 'Décrivez une action concrète et la réaction observée.',
      button: 'Établir le discernement'
    }
  ];
  let step = 0;

  const themes = [
    { key: /téléphone|portable|écran|jeu|réseau/i, name: 'les écrans', action: 'Fixez un temps bref de discussion hors conflit. Partez d’un usage observable, convenez d’une règle testable pendant sept jours, puis réévaluez-la ensemble.' },
    { key: /travail|devoir|note|école|collège|lycée|cours/i, name: 'le travail scolaire', action: 'Séparez la question du travail de celle de la valeur personnelle. Choisissez un objectif très limité pour les trois prochains jours et vérifiez d’abord l’existence d’un obstacle concret.' },
    { key: /angoiss|anxi|isol|triste|pleur|peur/i, name: 'l’anxiété ou l’isolement', action: 'Ouvrez un échange sans exiger d’explication immédiate. Si les signes persistent, s’intensifient ou affectent le sommeil, l’alimentation ou la sécurité, sollicitez rapidement un professionnel.' },
    { key: /limite|autorité|obéi|colère|insulte|conflit/i, name: 'l’autorité et les limites', action: 'Formulez une seule limite, sa raison et sa conséquence prévisible. Évitez de renégocier au cœur de la crise ; revenez-y ensuite, lorsque chacun a retrouvé son calme.' }
  ];

  function addMessage(text, role) {
    const p = document.createElement('p');
    p.className = `advisor-message ${role}`;
    p.textContent = text;
    messages.appendChild(p);
  }

  function updateProgress() {
    progress.hidden = false;
    stepLabel.textContent = `Étape ${Math.min(step + 1, 3)} sur 3`;
    progressBar.style.width = `${Math.min(((step + 1) / 3) * 100, 100)}%`;
  }

  function setPrompt() {
    const current = prompts[step];
    question.innerHTML = current.label;
    input.placeholder = current.placeholder;
    submit.textContent = current.button;
    input.value = '';
    input.focus();
    updateProgress();
  }

  function buildResult() {
    const full = answers.join(' ');
    const theme = themes.find(t => t.key.test(full));
    const themeName = theme ? theme.name : 'la situation décrite';
    const action = theme ? theme.action : 'Choisissez un moment calme. Décrivez un seul fait sans accusation, dites ce que vous cherchez à comprendre, puis proposez une action limitée et réversible.';

    document.getElementById('factsText').textContent = `Vous décrivez ${themeName}. Le récit initial est : « ${answers[0]} » L’observation la plus directement vérifiable est : « ${answers[1]} »`;
    document.getElementById('judgmentText').textContent = 'Votre interprétation peut être juste, mais elle reste une hypothèse tant qu’elle n’a pas été confrontée aux faits et au point de vue de votre enfant. Évitons de transformer une conduite en identité.';
    document.getElementById('controlText').textContent = 'Vous pouvez choisir le moment, le ton, la précision de votre demande, la cohérence de la limite et le recours à une aide extérieure. Vous pouvez également modifier une stratégie qui n’a pas produit l’effet attendu.';
    document.getElementById('outsideText').textContent = 'Vous ne contrôlez ni l’adhésion immédiate de votre enfant, ni son émotion, ni la rapidité du changement. Une réponse juste peut produire d’abord de la résistance.';
    document.getElementById('questionText').textContent = 'Quelle explication votre enfant donnerait-il de cette scène, même si cette explication vous paraît incomplète ou injuste ?';
    document.getElementById('actionText').textContent = action;

    form.hidden = true;
    progress.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('.situation-chips button').forEach(button => {
    button.addEventListener('click', () => {
      input.value = button.dataset.text || '';
      input.focus();
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) {
      input.focus();
      return;
    }

    answers.push(value);
    addMessage(value, 'parent');

    if (step === 0) {
      intro.hidden = true;
      addMessage('Merci. Séparons maintenant ce que vous avez observé de ce que vous en concluez.', 'preceptor');
    } else if (step === 1) {
      addMessage('C’est plus précis. Regardons enfin ce que vous avez déjà tenté et l’effet obtenu.', 'preceptor');
    }

    step += 1;
    if (step < prompts.length) setPrompt();
    else buildResult();
  });

  document.getElementById('restartAdvisor').addEventListener('click', () => {
    answers.length = 0;
    step = 0;
    messages.innerHTML = '';
    result.hidden = true;
    intro.hidden = false;
    form.hidden = false;
    setPrompt();
    progress.hidden = true;
  });
})();
