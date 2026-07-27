(() => {
  'use strict';
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
  const back = document.getElementById('advisorBack');
  const messages = document.getElementById('advisorMessages');
  const count = document.getElementById('charCount');
  const answers = [];
  const prompts = [
    ['Décrivez un épisode précis.', 'Qui était présent ? Qu’a-t-on vu ou entendu ? À quel moment ?', 'Continuer'],
    ['Quels faits pourriez-vous rapporter sans employer d’adjectif ?', 'Exemple : « il a fermé son cahier trois soirs de suite » plutôt que « il est paresseux ».', 'Continuer'],
    ['Quelle émotion cette situation fait-elle naître chez vous ?', 'Inquiétude, colère, impuissance, honte, tristesse… Nommez-la et dites ce qu’elle vous pousse à faire.', 'Continuer'],
    ['Quelle conclusion tirez-vous actuellement ?', 'Exemple : « il ne respecte plus rien », « je suis un mauvais parent », « l’école ne fait rien ».', 'Continuer'],
    ['Qu’avez-vous déjà essayé et qu’avez-vous observé ensuite ?', 'Décrivez une action concrète et son effet, même minime.', 'Établir la carte']
  ];
  let step = 0;
  const themes = [
    {re:/téléphone|portable|écran|jeu|réseau|tiktok|instagram/i, risk:'Une escalade du conflit, la privation de sommeil ou un usage qui isole durablement.', action:'Proposez un entretien de quinze minutes hors conflit. Partez d’un usage observable, convenez d’une règle testable pendant sept jours et fixez dès maintenant la date de réévaluation.', links:[['regard-attention.html','Lire : Retrouver l’attention'],['dialogue-telephone.html','Dialogue : Le téléphone']]},
    {re:/travail|devoir|note|école|collège|lycée|cours|cahier/i, risk:'La confusion entre difficulté scolaire et valeur personnelle, ou l’existence d’un obstacle non identifié.', action:'Choisissez un objectif très limité pour les trois prochains jours. Demandez d’abord : « Qu’est-ce qui rend le travail difficile en ce moment ? » puis convenez d’un seul essai observable.', links:[['regard-echec.html','Lire : Traverser l’échec'],['carnet-eleve-19.html','Carnet : La vie de l’élève']]},
    {re:/angoiss|anxi|isol|triste|pleur|peur|dort|sommeil/i, risk:'Une aggravation, une atteinte au sommeil, à l’alimentation, à la fréquentation scolaire ou à la sécurité.', action:'Ouvrez un échange sans exiger d’explication immédiate. Dites ce que vous observez et proposez un rendez-vous avec un professionnel si les signes persistent, s’intensifient ou touchent la sécurité.', links:[['regard-courage.html','Lire : Le courage juste'],['regard-temps-long.html','Lire : Le temps long']]},
    {re:/limite|autorité|obéi|colère|insulte|conflit|crise/i, risk:'Une règle changeante, une conséquence disproportionnée ou un dialogue tenté au sommet de la crise.', action:'Formulez une seule limite, sa raison et une conséquence prévisible. Négociez les modalités, non le principe, puis revenez-y lorsque chacun a retrouvé son calme.', links:[['distinction-autorite.html','Distinguer : Autorité et domination'],['regard-autorite.html','Lire : L’autorité']]}
  ];
  function addMessage(text, role){const p=document.createElement('p');p.className=`advisor-message ${role}`;p.textContent=text;messages.appendChild(p);}
  function renderPrompt(){const p=prompts[step];question.textContent=p[0];input.placeholder=p[1];submit.textContent=p[2];input.value=answers[step]||'';count.textContent=`${input.value.length} / 1200`;stepLabel.textContent=`Étape ${step+1} sur 5`;progressBar.style.width=`${((step+1)/5)*100}%`;progress.hidden=false;back.hidden=step===0;input.focus();}
  function firstSentence(text){const cleaned=text.replace(/\s+/g,' ').trim();return cleaned.length>260?cleaned.slice(0,257)+'…':cleaned;}
  function buildResult(){const full=answers.join(' ');const theme=themes.find(t=>t.re.test(full));const emotion=firstSentence(answers[2]);const judgment=firstSentence(answers[3]);document.getElementById('factsText').textContent=firstSentence(answers[1]);document.getElementById('emotionText').textContent=emotion||'L’émotion n’a pas été précisée.';document.getElementById('judgmentText').textContent=`« ${judgment} » est une interprétation à examiner, non un fait définitivement établi.`;document.getElementById('controlText').textContent='Le moment et le ton du dialogue, la précision de votre observation, la cohérence de la règle, votre capacité à demander de l’aide et à réviser une stratégie inefficace.';document.getElementById('outsideText').textContent='La réaction immédiate de votre enfant, son rythme d’évolution, ce qu’il pense et ressent, ainsi que les décisions prises par d’autres adultes.';document.getElementById('riskText').textContent=theme?theme.risk:'La répétition du conflit, l’épuisement de chacun ou la présence d’un facteur que le récit ne permet pas encore d’identifier.';document.getElementById('actionText').textContent=theme?theme.action:'Choisissez un moment calme. Décrivez un seul fait, formulez une question ouverte et proposez une action limitée que vous pourrez réévaluer dans quelques jours.';const box=document.getElementById('resourceLinks');box.innerHTML='';const links=theme?theme.links:[['regard-frustration.html','Lire : La frustration'],['bibliotheque.html#collections','Explorer la Bibliothèque']];links.forEach(([href,label])=>{const a=document.createElement('a');a.href=href;a.textContent=label;box.appendChild(a);});form.hidden=true;progress.hidden=true;intro.hidden=true;result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'start'});}
  form.addEventListener('submit',e=>{e.preventDefault();const value=input.value.trim();if(value.length<8){input.setCustomValidity('Décrivez la situation en quelques mots supplémentaires.');input.reportValidity();return;}input.setCustomValidity('');answers[step]=value;addMessage(value,'parent');addMessage(step===4?'Merci. Je rassemble maintenant les éléments de votre discernement.':prompts[step+1][0],'preceptor');if(step<4){step++;renderPrompt();}else buildResult();});
  back.addEventListener('click',()=>{if(step===0)return;step--;messages.lastElementChild?.remove();messages.lastElementChild?.remove();renderPrompt();});
  input.addEventListener('input',()=>count.textContent=`${input.value.length} / 1200`);
  document.querySelectorAll('[data-text]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.text;count.textContent=`${input.value.length} / 1200`;input.focus();}));
  document.getElementById('restartAdvisor').addEventListener('click',()=>{answers.length=0;step=0;messages.innerHTML='';result.hidden=true;form.hidden=false;intro.hidden=false;renderPrompt();window.scrollTo({top:document.querySelector('.advisor-shell').offsetTop-90,behavior:'smooth'});});
  document.getElementById('printAdvisor').addEventListener('click',()=>window.print());
})();