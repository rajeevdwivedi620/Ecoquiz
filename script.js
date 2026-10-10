var L='en',T={
home:['Home','होम'],video:['Video','वीडियो'],play:['Play','चलाएँ'],pause:['Pause','रुकें'],voice:['Voice','आवाज़'],learn:['Learn','सीखें'],quiz:['Quiz','क्विज़'],board:['Leaderboard','लीडरबोर्ड'],about:['About Us','हमारे बारे में'],admin:['Admin','एडमिन'],login:['Login','लॉगिन'],signup:['Sign Up','साइन अप'],logout:['Logout','लॉग आउट'],guest:['Guest','अतिथि'],easy:['Easy','आसान'],medium:['Medium','मध्यम'],chooseLevel:['Choose a quiz level','क्विज़ का स्तर चुनें'],levelHint:['Each quiz has 10 questions.','हर क्विज़ में 10 प्रश्न हैं।'],difficulty:['Difficulty','कठिनाई'],
h1:['Learn the Built Environment, Simply','निर्मित पर्यावरण, आसान भाषा में सीखें'],
h2:['Buildings, cities, materials and green living — free lessons and quizzes for everyone, in Hindi and English.','इमारतें, शहर, सामग्री और हरित जीवन — सबके लिए मुफ़्त पाठ और क्विज़, हिंदी और अंग्रेज़ी में।'],
startq:['Take the Quiz','क्विज़ शुरू करें'],startl:['Start Learning','सीखना शुरू करें'],
founder:['Founder, BuildSmart','संस्थापक, BuildSmart'],quizQuestionsBy:['Quiz questions by:','क्विज़ प्रश्न:'],websiteDesignBy:['Website design by:','वेबसाइट डिज़ाइन:'],
mission:['Our mission is to make built environment knowledge simple and accessible to every person — students, builders, homeowners and citizens — in the language they are most comfortable with.','हमारा मिशन निर्मित पर्यावरण का ज्ञान हर व्यक्ति — विद्यार्थी, निर्माता, गृहस्वामी और नागरिक — तक उनकी अपनी भाषा में सरल बनाना है।']};
var FEAT=[['🧱',['Easy Lessons','आसान पाठ'],['Short, clear topics','छोटे और स्पष्ट विषय']],[ '🧠',['Bilingual Quiz','द्विभाषी क्विज़'],['Hindi & English','हिंदी और अंग्रेज़ी']],[ '🏆',['Leaderboard','लीडरबोर्ड'],['Compete & improve','प्रतिस्पर्धा करें, सुधरें']]];
var TOP=[['🏙️',['Urban Planning','शहरी नियोजन'],['How cities are designed for people, transport and green space.','शहर लोगों, परिवहन और हरियाली के लिए कैसे डिज़ाइन होते हैं।']],
['🌿',['Green Buildings','हरित भवन'],['Buildings that save energy, water and cost (IGBC, GRIHA).','ऊर्जा, पानी और खर्च बचाने वाली इमारतें (IGBC, GRIHA)।']],
['🧱',['Building Materials','निर्माण सामग्री'],['Cement, bricks, steel, fly-ash and sustainable alternatives.','सीमेंट, ईंट, स्टील, फ्लाई-ऐश और टिकाऊ विकल्प।']],
['☀️',['Energy & Climate','ऊर्जा और जलवायु'],['Solar, ventilation, insulation and heat islands.','सौर ऊर्जा, हवादारी, इन्सुलेशन और हीट आइलैंड।']],
['💧',['Water & Waste','जल और कचरा'],['Rainwater harvesting, recycling and waste management.','वर्षा जल संचयन, पुनर्चक्रण और कचरा प्रबंधन।']],
['🚇',['Transport','परिवहन'],['Metro, walkability and low-carbon mobility.','मेट्रो, पैदल-अनुकूलता और कम-कार्बन आवागमन।']]];
var DEFAULT_QUESTIONS=[
[['Which gas do plants take in from the air to make food?','पौधे भोजन बनाने के लिए हवा से कौन सी गैस लेते हैं?'],[['Carbon dioxide','कार्बन डाइऑक्साइड'],['Oxygen','ऑक्सीजन'],['Smoke','धुआँ'],['Hydrogen','हाइड्रोजन']],0],
[['World Environment Day is celebrated on…','विश्व पर्यावरण दिवस कब मनाया जाता है?'],[['5 June','5 जून'],['26 January','26 जनवरी'],['15 August','15 अगस्त'],['2 October','2 अक्टूबर']],0],
[['The ozone layer protects us from…','ओज़ोन परत हमें किससे बचाती है?'],[['Harmful ultraviolet (UV) rays of the Sun','सूर्य की हानिकारक पराबैंगनी (UV) किरणों से'],['Rain','बारिश से'],['Wind','हवा से'],['Sound','आवाज़ से']],0],
[['What is the main cause of global warming?','ग्लोबल वार्मिंग का मुख्य कारण क्या है?'],[['Greenhouse gases from burning coal, oil and petrol','कोयला, तेल और पेट्रोल जलाने से निकली ग्रीनहाउस गैसें'],['Planting more trees','अधिक पेड़ लगाना'],['Using cycles','साइकिल चलाना'],['Rainfall','बारिश होना']],0],
[['Which is a renewable source of energy?','नवीकरणीय (दोबारा मिलने वाली) ऊर्जा का स्रोत कौन सा है?'],[['Solar energy','सौर ऊर्जा'],['Coal','कोयला'],['Petrol','पेट्रोल'],['Diesel','डीज़ल']],0],
[['Which of these is biodegradable waste?','इनमें से कौन सा जैव-अपघटनीय (सड़ने वाला) कचरा है?'],[['Vegetable and fruit peels','सब्ज़ी और फल के छिलके'],['Plastic bag','प्लास्टिक की थैली'],['Glass bottle','काँच की बोतल'],['Iron nail','लोहे की कील']],0],
[['What is the best way to save water at home?','घर में पानी बचाने का सबसे अच्छा तरीका क्या है?'],[['Fix leaking taps and collect rainwater','टपकते नल ठीक करें और बारिश का पानी जमा करें'],['Leave the tap running','नल खुला छोड़ना'],['Wash cars daily','रोज़ गाड़ी धोना'],['Waste water while brushing','ब्रश करते समय पानी बहाना']],0],
[['Which is a common air pollutant from vehicles?','वाहनों से निकलने वाला आम वायु प्रदूषक कौन सा है?'],[['Carbon monoxide and smoke','कार्बन मोनोऑक्साइड और धुआँ'],['Fresh oxygen','ताज़ा ऑक्सीजन'],['Water vapour from rain','बारिश की भाप'],['Pollen of flowers','फूलों का पराग']],0],
[['Deforestation means…','वनों की कटाई (डिफॉरेस्टेशन) का मतलब है…'],[['Cutting down forests on a large scale','बड़े पैमाने पर जंगल काटना'],['Planting new forests','नए जंगल लगाना'],['Protecting animals','जानवरों की रक्षा करना'],['Cleaning rivers','नदियाँ साफ़ करना']],0],
[['What does recycling do?','रीसाइक्लिंग (पुनर्चक्रण) क्या करती है?'],[['Turns old waste into new useful things and saves resources','पुराने कचरे से नई उपयोगी चीज़ें बनाती है और संसाधन बचाती है'],['Makes more garbage','ज़्यादा कचरा बनाती है'],['Burns plastic in open air','प्लास्टिक खुले में जलाती है'],['Pollutes rivers','नदियों को प्रदूषित करती है']],0]];
var Q=[];
var QS=[];
var DEFAULT_MEDIUM_QUESTIONS=[
[['Why can compact, mixed-use neighbourhoods reduce transport emissions?','सघन, मिश्रित उपयोग वाले पड़ोस परिवहन उत्सर्जन कैसे घटा सकते हैं?'],[['Homes, shops and services are closer, so people can make shorter trips','घर, दुकानें और सेवाएँ पास होने से यात्राएँ छोटी हो सकती हैं'],['They require more private cars','इनमें अधिक निजी कारों की ज़रूरत होती है'],['They eliminate the need for public spaces','इनमें सार्वजनिक स्थानों की ज़रूरत नहीं रहती'],['They increase the distance between daily services','ये रोज़मर्रा की सेवाओं के बीच दूरी बढ़ाते हैं']],0],
[['What does embodied carbon in a building mainly refer to?','किसी इमारत में अंतर्निहित कार्बन का मुख्य अर्थ क्या है?'],[['Emissions from making, transporting and constructing with materials','सामग्री बनाने, ढोने और निर्माण में होने वाला उत्सर्जन'],['Only the electricity used by occupants','केवल निवासियों द्वारा उपयोग की गई बिजली'],['Carbon stored in the surrounding soil only','केवल आसपास की मिट्टी में जमा कार्बन'],['Emissions from commuting after the building is demolished','इमारत गिराने के बाद यात्रा से होने वाला उत्सर्जन']],0],
[['Which window arrangement usually supports cross-ventilation?','कौन-सी खिड़की व्यवस्था आमतौर पर आर-पार हवा आने में मदद करती है?'],[['Openings on opposite sides of a room','कमरे की आमने-सामने वाली दीवारों पर खुली जगहें'],['One sealed window on a single wall','एक दीवार पर बंद खिड़की'],['Windows covered permanently with insulation','इन्सुलेशन से हमेशा ढकी खिड़कियाँ'],['A door and window both kept closed','दरवाज़ा और खिड़की दोनों बंद रखना']],0],
[['How does a high-albedo roof help a building in a hot climate?','गर्म जलवायु में अधिक परावर्तक छत इमारत की कैसे मदद करती है?'],[['It reflects more sunlight and reduces heat absorbed by the roof','यह अधिक धूप परावर्तित करके छत द्वारा सोखी जाने वाली गर्मी घटाती है'],['It stores more heat during the day','यह दिन में अधिक गर्मी जमा करती है'],['It increases the need for artificial lighting','यह कृत्रिम रोशनी की ज़रूरत बढ़ाती है'],['It prevents rainwater from reaching drains','यह वर्षा जल को नालियों तक पहुँचने से रोकती है']],0],
[['Why are recharge pits used in rainwater harvesting?','वर्षा जल संचयन में रिचार्ज पिट का उपयोग क्यों होता है?'],[['To help collected rainwater soak into the ground and replenish groundwater','जमा बारिश के पानी को ज़मीन में पहुँचाकर भूजल बढ़ाने के लिए'],['To send all rainwater directly into the sea','सारे बारिश के पानी को सीधे समुद्र में भेजने के लिए'],['To increase runoff from paved areas','पक्के क्षेत्रों से बहाव बढ़ाने के लिए'],['To store household solid waste','घरेलू ठोस कचरा जमा करने के लिए']],0],
[['Why can public transport lower emissions per passenger?','सार्वजनिक परिवहन प्रति यात्री उत्सर्जन कैसे घटा सकता है?'],[['Many passengers share one vehicle and its energy use','कई यात्री एक वाहन और उसकी ऊर्जा का साझा उपयोग करते हैं'],['Buses always travel shorter distances than walking','बसें हमेशा पैदल चलने से कम दूरी तय करती हैं'],['It removes the need to maintain roads','इससे सड़कों के रखरखाव की ज़रूरत नहीं रहती'],['Every passenger uses a separate vehicle','हर यात्री अलग वाहन का उपयोग करता है']],0],
[['A building life-cycle assessment can include which stages?','इमारत के जीवन-चक्र आकलन में कौन-से चरण शामिल हो सकते हैं?'],[['Material production, construction, use and end-of-life','सामग्री उत्पादन, निर्माण, उपयोग और अंतिम निपटान'],['Only the day the building opens','केवल इमारत खुलने का दिन'],['Only the colour of the exterior paint','केवल बाहरी रंग का चुनाव'],['Only the number of floors','केवल मंज़िलों की संख्या']],0],
[['What is a key benefit of permeable paving?','पानी सोखने वाले पेवमेंट का एक मुख्य लाभ क्या है?'],[['It lets some rainwater pass through and reduces surface runoff','यह बारिश के कुछ पानी को नीचे जाने देकर सतही बहाव घटाता है'],['It makes every paved surface completely waterproof','यह हर पक्की सतह को पूरी तरह जलरोधी बनाता है'],['It prevents trees from receiving water','यह पेड़ों तक पानी पहुँचने से रोकता है'],['It increases flooding by blocking drains','यह नालियाँ रोककर बाढ़ बढ़ाता है']],0],
[['Why should external shading be designed for the Sun’s direction?','बाहरी छाया को सूर्य की दिशा के अनुसार क्यों बनाना चाहिए?'],[['To block unwanted direct heat while still allowing useful daylight','अनचाही सीधी गर्मी रोकते हुए उपयोगी दिन की रोशनी आने देने के लिए'],['To make every room dark throughout the day','दिन भर हर कमरे को अँधेरा रखने के लिए'],['To increase heat gain through windows','खिड़कियों से आने वाली गर्मी बढ़ाने के लिए'],['To prevent fresh air from entering the building','इमारत में ताज़ी हवा आने से रोकने के लिए']],0],
[['Which approach best supports construction-waste reduction?','निर्माण कचरा घटाने में कौन-सा तरीका सबसे अधिक मदद करता है?'],[['Plan material quantities and separate reusable waste on site','सामग्री की मात्रा पहले तय करें और दोबारा उपयोग योग्य कचरा अलग रखें'],['Mix all materials and send them to landfill','सभी सामग्री मिलाकर लैंडफिल में भेजें'],['Order extra material without measuring','मापे बिना अतिरिक्त सामग्री मँगाएँ'],['Burn leftover materials beside the site','बची सामग्री को निर्माण स्थल के पास जला दें']],0]
];
var QUESTION_BANK={easy:DEFAULT_QUESTIONS,medium:DEFAULT_MEDIUM_QUESTIONS};
var quizLevel='easy',quizScreen='select';
try{localStorage.removeItem('bs_name')}catch(e){}
var state={lang:'en',token:localStorage.getItem('bs_token')||'',user:null,activePage:'home'};
var $=function(s){return document.querySelector(s)},t=function(k){return T[k][L=='en'?0:1]},p=function(a){return a[L=='en'?0:1]};

function ensureShellUI(){
  if(!document.getElementById('authBar')){
    var nav=$('nav');
    var authBar=document.createElement('div');
    authBar.id='authBar';
    authBar.className='auth-bar';
    authBar.innerHTML='<button id="loginBtn" class="btn alt auth-btn">'+t('login')+'</button><button id="signupBtn" class="btn auth-btn">'+t('signup')+'</button><button id="logoutBtn" class="btn auth-btn" hidden>'+t('logout')+'</button><span id="userChip" class="user-chip">'+t('guest')+'</span>';
    nav.appendChild(authBar);
  }
  if(!document.getElementById('adminTab')){
    var nav=$('nav');
    var adminBtn=document.createElement('button');
    adminBtn.id='adminTab';
    adminBtn.dataset.p='admin';
    adminBtn.className='nav-admin';
    adminBtn.innerHTML='🛠️ <span>'+t('admin')+'</span>';
    nav.appendChild(adminBtn);
  }
  if(!document.getElementById('admin')){
    var main=$('main');
    var adminPage=document.createElement('section');
    adminPage.className='page';
    adminPage.id='admin';
    adminPage.innerHTML='<div class="card" id="adminBox"></div>';
    main.appendChild(adminPage);
  }
  if(!document.getElementById('authModal')){
    document.body.insertAdjacentHTML('beforeend', '<div id="authModal" class="auth-modal" hidden><div class="auth-card"><button id="authClose" class="close-btn" aria-label="Close">×</button><h3 id="authTitle">Login</h3><form id="authForm"><input id="authName" class="auth-field" type="text" placeholder="Your name"><input id="authEmail" class="auth-field" type="email" placeholder="Email" required><input id="authPassword" class="auth-field" type="password" placeholder="Password" required><button type="submit" class="btn alt" id="authSubmit">Login</button><div id="authMessage" class="auth-message"></div></form></div></div>');
  }
  bindAuthEvents();
}

function bindAuthEvents(){
  var loginBtn=$('#loginBtn'); var signupBtn=$('#signupBtn'); var logoutBtn=$('#logoutBtn'); var modal=$('#authModal'); var closeBtn=$('#authClose');
  if(loginBtn){loginBtn.onclick=function(){openAuthModal('login')}};
  if(signupBtn){signupBtn.onclick=function(){openAuthModal('signup')}};
  if(logoutBtn){logoutBtn.onclick=logout};
  if(closeBtn){closeBtn.onclick=function(){modal.hidden=true}};
  if(modal){modal.onclick=function(e){if(e.target===modal)modal.hidden=true}};
  var form=$('#authForm');
  if(form){form.onsubmit=submitAuthForm}
}

function openAuthModal(mode){
  var modal=$('#authModal');
  var authTitle=$('#authTitle');
  var authName=$('#authName');
  var authSubmit=$('#authSubmit');
  var inputMode=(mode==='signup'?'signup':'login');
  modal.hidden=false;
  authTitle.textContent=inputMode==='signup'?t('signup'):t('login');
  authName.style.display=inputMode==='signup'?'block':'none';
  authSubmit.textContent=inputMode==='signup'?t('signup'):t('login');
  $('#authMessage').textContent='';
  if(inputMode==='signup'){authName.value='';}
  $('#authEmail').value='';
  $('#authPassword').value='';
  var form=$('#authForm');
  form.dataset.mode=inputMode;
}

function renderAuthBar(){
  var authBar=$('#authBar');
  var loginBtn=$('#loginBtn');
  var signupBtn=$('#signupBtn');
  var logoutBtn=$('#logoutBtn');
  var userChip=$('#userChip');
  var adminTab=$('#adminTab');
  if(!authBar||!loginBtn||!signupBtn||!logoutBtn||!userChip||!adminTab){return}
  authBar.hidden=state.activePage==='home';
  var isLoggedIn=!!state.user;
  loginBtn.hidden=isLoggedIn;
  signupBtn.hidden=isLoggedIn;
  logoutBtn.hidden=!isLoggedIn;
  userChip.textContent=state.user?state.user.name:(t('guest'));
  adminTab.style.display=(state.user&&state.user.role==='admin')?'inline-flex':'none';
}

async function fetchCurrentUser(){
  var token=state.token;
  if(!token){state.user=null;renderAuthBar();return null;}
  try{
    var res=await fetch('/api/auth/me',{headers:{Authorization:'Bearer '+token}});
    if(!res.ok){throw new Error('Unauthorized');}
    var data=await res.json();
    state.user=data.user||null;
    renderAuthBar();
    return state.user;
  }catch(e){
    state.user=null;
    localStorage.removeItem('bs_token');
    state.token='';
    renderAuthBar();
    return null;
  }
}

async function submitAuthForm(e){
  e.preventDefault();
  var mode=e.target.dataset.mode||'login';
  var payload={
    email:$('#authEmail').value.trim(),
    password:$('#authPassword').value
  };
  if(mode==='signup'){payload.name=$('#authName').value.trim();}
  var endpoint=mode==='signup'?'/api/auth/signup':'/api/auth/login';
  var message=$('#authMessage');
  message.textContent='Please wait...';
  try{
    var res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    var data=await res.json();
    if(!res.ok){throw new Error(data.message||'Authentication failed');}
    state.token=data.token||'';
    state.user=data.user||null;
    if(state.token){localStorage.setItem('bs_token',state.token);}
    renderAuthBar();
    $('#authModal').hidden=true;
    if(state.user&&state.user.role==='admin'){show('admin');}else{show('home');}
  }catch(err){
    message.textContent=err.message||'Authentication failed';
  }
}

async function logout(){
  var token=state.token;
  if(token){
    try{await fetch('/api/auth/logout',{method:'POST',headers:{Authorization:'Bearer '+token}})}catch(e){}
  }
  state.token='';
  state.user=null;
  localStorage.removeItem('bs_token');
  renderAuthBar();
  show('home');
}

function transformQuestion(raw){
  if(!raw||!raw.question){return null;}
  var opts=Array.isArray(raw.options)?raw.options:[];
  return [
    [String(raw.question.en||''), String(raw.question.hi||'')],
    opts.map(function(o){return [String(o.en||''), String(o.hi||'')];}),
    Number(raw.correctIndex||0),
    raw.difficulty==='medium'?'medium':'easy'
  ];
}

async function fetchQuestions(){
  try{
    var res=await fetch('/api/questions',{cache:'no-store'});
    if(!res.ok){throw new Error('backend unavailable');}
    var data=await res.json();
    var rows=Array.isArray(data.questions)?data.questions:[];
    if(rows.length){
      var questions=rows.map(transformQuestion).filter(Boolean);
      QUESTION_BANK={
        easy:questions.filter(function(question){return question[3]==='easy'}),
        medium:questions.filter(function(question){return question[3]==='medium'})
      };
      return;
    }
  }catch(e){
    console.warn('Using default questions because backend questions are unavailable.', e);
  }
  QUESTION_BANK={easy:DEFAULT_QUESTIONS.slice(),medium:DEFAULT_MEDIUM_QUESTIONS.slice()};
}

async function renderAdminPanel(){
  var box=$('#adminBox');
  if(!box){return;}
  if(!state.user||state.user.role!=='admin'){
    box.innerHTML='<h2>Admin</h2><div class="card"><p>Admin access required. Please log in as admin.</p><button class="btn alt" id="adminLoginBtn">Login</button></div>';
    var btn=$('#adminLoginBtn');
    if(btn){btn.onclick=function(){openAuthModal('login')}};
    return;
  }
  try{
    var res=await fetch('/api/admin/summary',{headers:{Authorization:'Bearer '+state.token}});
    if(!res.ok){throw new Error('Failed to load summary');}
    var data=await res.json();
    var stats=data.stats||{};
    var rows=Array.isArray(data.leaderboard)?data.leaderboard:[];
    box.innerHTML='<h2>Admin Dashboard</h2><div class="stats-grid"><div class="mini-card"><strong>'+stats.users+'</strong><span>Users</span></div><div class="mini-card"><strong>'+stats.questions+'</strong><span>Questions</span></div><div class="mini-card"><strong>'+stats.attempts+'</strong><span>Attempts</span></div></div><div class="card admin-form-card"><h3>Add Question</h3><form id="adminQuestionForm"><div class="admin-form-grid"><input name="questionEn" placeholder="Question in English" required><input name="questionHi" placeholder="प्रश्न हिंदी में" required></div><div class="admin-option-grid"><div><input name="option1En" placeholder="Option 1 (EN)" required><input name="option1Hi" placeholder="विकल्प 1 (HI)" required></div><div><input name="option2En" placeholder="Option 2 (EN)" required><input name="option2Hi" placeholder="विकल्प 2 (HI)" required></div><div><input name="option3En" placeholder="Option 3 (EN)" required><input name="option3Hi" placeholder="विकल्प 3 (HI)" required></div><div><input name="option4En" placeholder="Option 4 (EN)" required><input name="option4Hi" placeholder="विकल्प 4 (HI)" required></div></div><div class="admin-inline"><label>Question level</label><select name="difficulty"><option value="easy">Easy</option><option value="medium">Medium</option></select><label>Correct option index</label><input name="correctIndex" type="number" min="0" max="3" value="0" required></div><button type="submit" class="btn">Save Question</button><div id="adminMessage" class="auth-message"></div></form></div><div class="card"><h3>Top Scores</h3><ul class="leader-list">'+(rows.map(function(r){return '<li>'+esc(r.name)+' — '+r.score+'/10</li>'}).join('')||'<li>No attempts yet.</li>')+'</ul></div>';
    var form=$('#adminQuestionForm');
    if(form){form.onsubmit=submitAdminQuestion;}
  }catch(err){
    box.innerHTML='<h2>Admin Dashboard</h2><p>Unable to load admin data.</p>';
  }
}

async function submitAdminQuestion(e){
  e.preventDefault();
  var form=e.target;
  var data={
    question:{en:form.questionEn.value.trim(), hi:form.questionHi.value.trim()},
    options:[
      {en:form.option1En.value.trim(), hi:form.option1Hi.value.trim()},
      {en:form.option2En.value.trim(), hi:form.option2Hi.value.trim()},
      {en:form.option3En.value.trim(), hi:form.option3Hi.value.trim()},
      {en:form.option4En.value.trim(), hi:form.option4Hi.value.trim()},
    ],
    correctIndex:Number(form.correctIndex.value),
    difficulty:form.difficulty.value
  };
  var msg=$('#adminMessage');
  msg.textContent='Saving...';
  try{
    var res=await fetch('/api/questions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+state.token},body:JSON.stringify(data)});
    var payload=await res.json();
    if(!res.ok){throw new Error(payload.message||'Question could not be saved');}
    msg.textContent='Question saved successfully.';
    form.reset();
    form.correctIndex.value=0;
    await fetchQuestions();
    if(state.activePage==='admin'){renderAdminPanel();}
  }catch(err){
    msg.textContent=err.message||'Question could not be saved';
  }
}

var qi=0,sc=0,done=false,order=[];
function renderQuizLevelSelect(){
  quizScreen='select';
  $('#qbox').innerHTML='<div class="quiz-level-select"><h2>'+t('chooseLevel')+'</h2><p>'+t('levelHint')+'</p><button class="btn" id="easyQuizBtn">🌱 '+t('easy')+'</button><button class="btn alt" id="mediumQuizBtn">🧠 '+t('medium')+'</button></div>';
  $('#easyQuizBtn').onclick=function(){selectQuizLevel('easy')};
  $('#mediumQuizBtn').onclick=function(){selectQuizLevel('medium')};
}
function selectQuizLevel(level){
  quizLevel=level==='medium'?'medium':'easy';
  Q=QUESTION_BANK[quizLevel]||[];
  order=[];
  done=false;
  quizScreen='playing';
  startQuiz();
}
function startQuiz(){
  Q=QUESTION_BANK[quizLevel]||[];
  if(!Q.length){
    $('#qbox').innerHTML='<p>Questions for this level are not available yet.</p>';
    return;
  }
  if(!order.length||done){
    order=Q.map(function(_,i){return i}).sort(function(){return Math.random()-.5}).slice(0,10);
    qi=0;sc=0;done=false;
    QS=Q.map(function(q){
      var ix=q[1].map(function(_,k){return k}).sort(function(){return Math.random()-.5});
      return [q[0],ix.map(function(k){return q[1][k]}),ix.indexOf(q[2])];
    });
  }
  quizScreen='playing';
  drawQ();
}
function renderCurrentQuiz(){
  if(quizScreen==='select'){renderQuizLevelSelect();}
  else if(quizScreen==='result'){finish();}
  else{drawQ();}
}
function drawQ(){var b=$('#qbox');if(qi>=order.length){return finish()}var q=QS[order[qi]];
b.innerHTML='<div style="display:flex;justify-content:space-between;color:var(--mu);font-size:14px"><span>'+(L=='en'?'Question':'प्रश्न')+' '+(qi+1)+'/'+order.length+'</span><span>'+t(quizLevel)+' · ⭐ '+sc+'</span></div><div class="bar"><i style="width:'+(qi/order.length*100)+'%"></i></div><h3>'+p(q[0])+'</h3><div id="os"></div><div class="exp" id="ex"></div>';
q[1].forEach(function(o,i){var e=document.createElement('button');e.className='opt';e.textContent=p(o);e.onclick=function(){pick(i,q)};$('#os').appendChild(e)})}
function pick(i,q){var os=$('#os').children;if(os[0].disabled)return;for(var k=0;k<os.length;k++){os[k].disabled=true;if(k==q[2])os[k].classList.add('ok')}if(i==q[2])sc++;else os[i].classList.add('no');
$('#ex').innerHTML=(i==q[2]?'✅ ':'❌ ')+(i==q[2]?(L=='en'?'Correct!':'सही!'):(L=='en'?'Correct answer highlighted.':'सही उत्तर हरे रंग में है।'))+'<br><button class="btn alt" id="nx">'+(L=='en'?'Next ➜':'आगे ➜')+'</button>';$('#nx').onclick=function(){qi++;drawQ()}}

function finish(){done=true;quizScreen='result';
$('#qbox').innerHTML='<div style="text-align:center"><div style="font-size:56px">🎉</div><div class="quiz-level-badge">'+t(quizLevel)+'</div><h2>'+(L=='en'?'Your score':'आपका स्कोर')+': '+sc+'/'+order.length+'</h2><input id="nm" maxlength="24" placeholder="'+(L=='en'?'Your name':'आपका नाम')+'" value="'+(state.user?esc(state.user.name):'')+'"><br><button class="btn" id="sv">🏆 '+(L=='en'?'Save to Leaderboard':'लीडरबोर्ड में सेव करें')+'</button><button class="btn alt" id="rt">🔁 '+(L=='en'?'Retry':'फिर से खेलें')+'</button><button class="btn alt" id="chooseQuizLevel">↩ '+t('chooseLevel')+'</button></div>';
$('#rt').onclick=function(){done=true;startQuiz()};$('#chooseQuizLevel').onclick=function(){order=[];renderQuizLevelSelect()};$('#sv').onclick=function(){saveScore($('#nm').value.trim()||'Guest',sc)}}
function local(){try{return JSON.parse(localStorage.getItem('bs_lb')||'[]')}catch(e){return[]}}
async function saveScore(n,s){
  try{
    var res=await fetch('/api/leaderboard',{method:'POST',headers:{'Content-Type':'application/json','Authorization':state.token?('Bearer '+state.token):''},body:JSON.stringify({name:n,score:s,difficulty:quizLevel})});
    if(res.ok){
      show('board');
      return;
    }
  }catch(e){}
  var rec={name:n,score:s,difficulty:quizLevel,at:Date.now()};
  try{var a=local();a.push(rec);localStorage.setItem('bs_lb',JSON.stringify(a))}catch(x){}
  show('board');
}
async function renderLB(){
  var go=function(rows){
    rows=Array.isArray(rows)?rows:[];
    rows.sort(function(a,b){return b.score-a.score||a.at-b.at});
    $('#lb').innerHTML='<tr><th>#</th><th>'+(L=='en'?'Name':'नाम')+'</th><th>'+t('difficulty')+'</th><th>'+(L=='en'?'Score':'स्कोर')+'</th></tr>'+(rows.slice(0,20).map(function(r,i){return '<tr><td>'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</td><td>'+esc(r.name)+'</td><td>'+t(r.difficulty==='medium'?'medium':'easy')+'</td><td>'+r.score+'/10</td></tr>'}).join('')||'<tr><td colspan="4">'+(L=='en'?'No scores yet — be the first!':'अभी कोई स्कोर नहीं — पहले बनें!')+'</td></tr>')};
  try{
    var res=await fetch('/api/leaderboard',{cache:'no-store'});
    if(res.ok){
      var data=await res.json();
      go(data.leaderboard||[]);
      return;
    }
  }catch(e){}
  go(local());
}
function esc(s){return String(s).replace(/[&<>\"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

var SC=[
['🌍🌳💧🏠','Environment = Everything Around Us','पर्यावरण = हमारे चारों ओर सब कुछ','Air, water, soil, trees, animals, houses and people — everything around us is our environment.','हवा, पानी, मिट्टी, पेड़, जानवर, घर और लोग — हमारे आसपास जो कुछ है, वही पर्यावरण है।'],
['🌳🏞️🐦🌤️','Natural Environment','प्राकृतिक पर्यावरण','Nature made these: forests, rivers, mountains, sky and animals. We did not build them.','इन्हें प्रकृति ने बनाया है: जंगल, नदियाँ, पहाड़, आसमान और जानवर। इन्हें हमने नहीं बनाया।'],
['🏠🏫🛣️🌉','Built Environment','निर्मित पर्यावरण','Human-made spaces like homes, roads, schools, parks and bridges.','मानव-निर्मित स्थान जैसे घर, सड़कें, स्कूल, पार्क और पुल।'],
['🏗️➡️🌳❌','Both Are Connected','दोनों जुड़े हुए हैं','When we build too much and cut trees, the place gets hot and the air gets dirty.','जब हम बहुत निर्माण करते हैं और पेड़ काटते हैं, तो जगह गर्म और हवा गंदी हो जाती है।'],
['🏭🚗🗑️💧','Problems We Face','हमारी समस्याएँ','Smoke, garbage and wasted water harm our health and the earth.','धुआँ, कचरा और पानी की बर्बादी हमारी सेहत और धरती को नुकसान पहुँचाते हैं।'],
['🌱💧💡🚲','What We Can Do','हम क्या कर सकते हैं','Plant trees. Save water. Switch off lights. Walk, cycle or use the bus. Put waste in the dustbin.','पेड़ लगाएँ। पानी बचाएँ। बिजली बंद करें। पैदल, साइकिल या बस से चलें। कचरा कूड़ेदान में डालें।'],
['💚🌍👨‍👩‍👧','Care Today, Safe Tomorrow','आज संभालें, कल सुरक्षित','A clean and green place keeps our family healthy. Let us all take care of it!','साफ़ और हरा-भरा स्थान हमारे परिवार को स्वस्थ रखता है। आइए, सब मिलकर इसकी देखभाल करें!']];
var vi=0,vtm=null,vplay=true,vvoice=false;
function vidDraw(){var c=SC[vi],e=L=='en'?0:1;clearTimeout(vtm);
$('#vem').innerHTML=Array.from(c[0].replace(/\uFE0F/g,'').match(/\p{Extended_Pictographic}|➡|❌/gu)||[]).map(function(x,i){return '<span style="animation-delay:'+i*.25+'s,'+i*.25+'s">'+x+'</span>'}).join('');
$('#vtt').textContent=c[1+e];$('#vtx').textContent=c[3+e];
var d=Math.max(7000,c[3+e].length*110);var b=$('#vb');b.style.transition='none';b.style.width=(vi/SC.length*100)+'%';
if(vvoice&&window.speechSynthesis){speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(c[1+e]+'. '+c[3+e]);u.lang=e?'hi-IN':'en-IN';u.rate=.9;u.onend=function(){if(vplay&&$('#video').classList.contains('on')){clearTimeout(vtm);vtm=setTimeout(vnext,900)}};speechSynthesis.speak(u);d=Math.max(d,20000)}
if(vplay)vtm=setTimeout(vnext,d)}
function vnext(){vi=(vi+1)%SC.length;vidDraw()}
$('#vnext').onclick=vnext;$('#vprev').onclick=function(){vi=(vi+SC.length-1)%SC.length;vidDraw()};
$('#vpp').onclick=function(){vplay=!vplay;this.textContent=vplay?'⏸':'▶';if(vplay)vidDraw();else{clearTimeout(vtm);if(window.speechSynthesis)speechSynthesis.cancel()}};
$('#vvo').onclick=function(){vvoice=!vvoice;this.style.opacity=vvoice?1:.55;if(!vvoice&&window.speechSynthesis)speechSynthesis.cancel();vidDraw()};$('#vvo').style.opacity=.55;

var lo=-1;
var LS=[
[['A city plan decides where houses, schools, hospitals, markets, roads and parks will be.','शहर की योजना तय करती है कि घर, स्कूल, अस्पताल, बाज़ार, सड़कें और पार्क कहाँ होंगे।'],['When everything is close by, people save time, money and fuel.','जब सब कुछ पास होता है, तो समय, पैसा और ईंधन बचता है।'],['Parks and trees keep a city cool and give clean air.','पार्क और पेड़ शहर को ठंडा रखते हैं और साफ़ हवा देते हैं।'],['Wide footpaths and cycle tracks keep people safe and healthy.','चौड़े फुटपाथ और साइकिल ट्रैक लोगों को सुरक्षित और स्वस्थ रखते हैं।'],['Tip: Plan first, build later. Fixing a badly planned city costs a lot.','सीख: पहले योजना, फिर निर्माण। ख़राब योजना को सुधारना बहुत महँगा पड़ता है।']],
[['A green building uses less energy, less water and better materials.','हरित भवन कम ऊर्जा, कम पानी और बेहतर सामग्री का उपयोग करता है।'],['Big windows bring in daylight, so lights are needed less in the day.','बड़ी खिड़कियाँ दिन की रोशनी लाती हैं, इसलिए दिन में बिजली कम लगती है।'],['Solar panels on the roof make free electricity.','छत पर सोलर पैनल मुफ़्त बिजली बनाते हैं।'],['A rainwater tank stores water for later use.','वर्षा जल की टंकी पानी को बाद में उपयोग के लिए जमा रखती है।'],['In India, buildings get green ratings from IGBC and GRIHA.','भारत में भवनों को IGBC और GRIHA से हरित रेटिंग मिलती है।'],['Tip: A green building costs a little more at first but saves money every month.','सीख: हरित भवन शुरू में थोड़ा महँगा होता है, पर हर महीने पैसे बचाता है।']],
[['Cement, sand, bricks, steel and wood are the most common building materials.','सीमेंट, रेत, ईंट, स्टील और लकड़ी सबसे आम निर्माण सामग्री हैं।'],['Making cement and steel creates a lot of smoke and carbon.','सीमेंट और स्टील बनाने में बहुत धुआँ और कार्बन निकलता है।'],['Fly-ash bricks use waste from power plants and save good soil.','फ्लाई-ऐश ईंटें बिजली संयंत्रों के कचरे से बनती हैं और उपजाऊ मिट्टी बचाती हैं।'],['Bamboo, mud and lime are old, cheap and eco-friendly materials.','बाँस, मिट्टी और चूना पुराने, सस्ते और पर्यावरण-अनुकूल पदार्थ हैं।'],['Tip: Choose materials that are strong, local and reusable.','सीख: ऐसी सामग्री चुनें जो मज़बूत, स्थानीय और दोबारा उपयोग होने वाली हो।']],
[['Fans, ACs and lights use a lot of electricity in buildings.','पंखे, AC और लाइटें इमारतों में बहुत बिजली खर्च करते हैं।'],['A light-coloured roof reflects the Sun and keeps the house cooler.','हल्के रंग की छत धूप लौटाती है और घर को ठंडा रखती है।'],['Shade from trees and balconies reduces heat inside.','पेड़ों और बालकनी की छाया अंदर की गर्मी कम करती है।'],['Cross-ventilation: open windows on opposite sides so fresh air flows through.','क्रॉस-वेंटिलेशन: आमने-सामने की खिड़कियाँ खोलें ताकि ताज़ी हवा आर-पार बहे।'],['Tip: Switch off lights and fans when you leave a room.','सीख: कमरे से निकलते समय लाइट और पंखा बंद करें।']],
[['Rainwater harvesting collects rain and refills groundwater.','वर्षा जल संचयन बारिश का पानी जमा करता है और भूजल बढ़ाता है।'],['A dripping tap can waste many litres of water every day. Fix it.','टपकता नल रोज़ कई लीटर पानी बर्बाद करता है। उसे ठीक करवाएँ।'],['Keep two dustbins: green for wet waste (peels), blue for dry waste (paper, plastic).','दो कूड़ेदान रखें: हरा गीले कचरे (छिलके) के लिए, नीला सूखे कचरे (कागज़, प्लास्टिक) के लिए।'],['Wet waste can become compost. Dry waste can be recycled.','गीले कचरे से खाद बन सकती है। सूखे कचरे का पुनर्चक्रण हो सकता है।'],['Tip: Reduce, Reuse, Recycle. Never throw waste in drains or rivers.','सीख: घटाएँ, दोबारा उपयोग करें, रीसायकल करें। कचरा नाली या नदी में कभी न डालें।']],
[['Metro, buses and trains carry many people with less smoke per person.','मेट्रो, बसें और ट्रेनें कम धुएँ में बहुत लोगों को ले जाती हैं।'],['Walking and cycling are free and keep you healthy.','पैदल चलना और साइकिल मुफ़्त हैं और सेहत बनाए रखते हैं।'],['Car-pooling means fewer cars on the road, less traffic and less fuel.','कार-पूलिंग से सड़क पर कम गाड़ियाँ, कम जाम और कम ईंधन लगता है।'],['Electric vehicles give no smoke on the road.','इलेक्ट्रिक वाहन सड़क पर धुआँ नहीं छोड़ते।'],['Tip: For short trips, walk or cycle.','सीख: छोटी दूरी के लिए पैदल या साइकिल से जाएँ।']]];
function openL(i){lo=i;renderTopics();window.scrollTo(0,0)}
function renderTopics(){var g=$('#topics'),e=L=='en'?0:1;
if(lo<0){g.style.display='';g.innerHTML=TOP.map(function(f,i){return '<div class="card tc" onclick="openL('+i+')"><div class="ic">'+f[0]+'</div><h3>'+p(f[1])+'</h3><p>'+p(f[2])+'</p><button class="btn alt">'+(L=='en'?'Read lesson':'पाठ पढ़ें')+' ➜</button></div>'}).join('');return}
var f=TOP[lo],pts=LS[lo],tip=pts[pts.length-1][e];g.style.display='block';
g.innerHTML='<button class="btn alt" onclick="openL(-1)">⬅ '+(L=='en'?'All topics':'सभी विषय')+'</button><div class="card" style="margin-top:12px"><div style="font-size:60px">'+f[0]+'</div><h2 style="margin:4px 0 10px">'+p(f[1])+'</h2><ul class="lsn">'+pts.slice(0,-1).map(function(x){return '<li>'+x[e]+'</li>'}).join('')+'</ul><div class="tip">💡 '+tip+'</div><button class="btn" onclick="show(\'quiz\')">🧠 '+(L=='en'?'Take the Quiz':'क्विज़ दें')+'</button>'+(lo<TOP.length-1?'<button class="btn alt" onclick="openL('+(lo+1)+')">'+(L=='en'?'Next lesson':'अगला पाठ')+' ➜</button>':'')+'</div>'}

var Z=1;function setZ(z){Z=Math.max(.75,Math.min(2,Math.round(z*100)/100));document.querySelector('main').style.zoom=Z;$('#zl').textContent=Math.round(Z*100)+'%';try{localStorage.setItem('bs_z',Z)}catch(e){}}
$('#zm').onclick=function(){setZ(Z-.25)};$('#zp').onclick=function(){setZ(Z+.25)};
try{var z0=parseFloat(localStorage.getItem('bs_z'));if(z0)setZ(z0)}catch(e){}

function render(){
  document.documentElement.lang=L=='en'?'en':'hi';
  document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=t(e.dataset.t)});
  $('#lang').textContent=L=='en'?'हिंदी':'English';
  $('#feat').innerHTML=FEAT.map(function(f){return '<div class="card"><div class="ic">'+f[0]+'</div><h3>'+p(f[1])+'</h3><p>'+p(f[2])+'</p></div>'}).join('');
  renderTopics();
  renderAuthBar();
  if($('#quiz').classList.contains('on'))renderCurrentQuiz();
  if($('#board').classList.contains('on'))renderLB();
  if($('#admin').classList.contains('on'))renderAdminPanel();
}
function show(id){
  state.activePage=id;
  renderAuthBar();
  if(id=='learn'){lo=-1;renderTopics()}if(id!='video'){clearTimeout(window.vtm);try{speechSynthesis.cancel()}catch(e){}}if(id=='video'){setTimeout(function(){vplay=true;$('#vpp').textContent='⏸';vidDraw()},0)}
  document.querySelectorAll('.page').forEach(function(e){e.classList.toggle('on',e.id==id)});
  document.querySelectorAll('nav button[data-p]').forEach(function(b){b.classList.toggle('on',b.dataset.p==id)});
  if(id=='quiz')renderQuizLevelSelect();
  if(id=='board')renderLB();
  if(id=='admin')renderAdminPanel();
  window.scrollTo(0,0)
}

document.querySelectorAll('[data-p]').forEach(function(b){b.onclick=function(){show(b.dataset.p)}});
document.querySelectorAll('[data-go]').forEach(function(b){b.onclick=function(){show(b.dataset.go)}});
$('#lang').onclick=function(){L=L=='en'?'hi':'en';render();vidDraw()};

async function initApp(){
  ensureShellUI();
  await fetchQuestions();
  await fetchCurrentUser();
  render();
  show('home');
}

initApp();