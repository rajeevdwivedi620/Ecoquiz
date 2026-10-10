const express = require('express');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const initSqlJs = require('sql.js');

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = __dirname;
const dbPath = path.join(rootDir, 'buildsmart.db');

let db;

function persistDb() {
  if (!db) return;
  try {
    const data = db.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
  } catch (error) {
    console.error('Failed to persist database:', error.message);
  }
}

function runQuery(sql, params = []) {
  const stmt = db.prepare(sql);
  if (Array.isArray(params)) {
    stmt.bind(params);
  } else if (params && typeof params === 'object') {
    stmt.bind(params);
  }
  stmt.step();
  stmt.free();
  persistDb();
}

function insertAndReturnId(sql, params = []) {
  const stmt = db.prepare(sql);
  if (Array.isArray(params)) {
    stmt.bind(params);
  } else if (params && typeof params === 'object') {
    stmt.bind(params);
  }
  stmt.step();
  stmt.free();
  persistDb();

  const row = getOne('SELECT last_insert_rowid() AS id');
  return row ? Number(row.id) : 0;
}

function getOne(sql, params = []) {
  const stmt = db.prepare(sql);
  if (Array.isArray(params)) {
    stmt.bind(params);
  } else if (params && typeof params === 'object') {
    stmt.bind(params);
  }

  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return row;
}

function getAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (Array.isArray(params)) {
    stmt.bind(params);
  } else if (params && typeof params === 'object') {
    stmt.bind(params);
  }

  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function parseJsonList(value, fallback = []) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
}

function questionDto(row) {
  const enOptions = parseJsonList(row.options_en, []);
  const hiOptions = parseJsonList(row.options_hi, []);

  return {
    id: row.id,
    question: {
      en: row.question_en,
      hi: row.question_hi,
    },
    options: enOptions.map((option, index) => ({
      en: option,
      hi: hiOptions[index] || '',
    })),
    correctIndex: Number(row.correct_index || 0),
    difficulty: row.difficulty || 'easy',
  };
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.replace('Bearer ', '').trim();
}

function requireAuth(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ ok: false, message: 'Authentication required.' });
  }

  const session = getOne('SELECT user_id FROM sessions WHERE token = ?', [token]);
  if (!session) {
    return res.status(401).json({ ok: false, message: 'Session expired.' });
  }

  const user = getOne('SELECT * FROM users WHERE id = ?', [session.user_id]);
  if (!user) {
    return res.status(401).json({ ok: false, message: 'User not found.' });
  }

  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ ok: false, message: 'Admin access required.' });
    }
    next();
  });
}

function upsertDefaultAdmin() {
  const email = 'admin@buildsmart.com';
  const existing = getOne('SELECT id FROM users WHERE email = ?', [email]);
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    if (!existing) {
      console.warn('ADMIN_PASSWORD is not set; the default admin account was not created.');
    }
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  if (existing) {
    runQuery('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, existing.id]);
    return;
  }

  insertAndReturnId(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    ['Admin', email, passwordHash, 'admin'],
  );
}

const defaultQuestions = [
  {
    question: { en: 'Which gas do plants take in from the air to make food?', hi: 'पौधे भोजन बनाने के लिए हवा से कौन सी गैस लेते हैं?' },
    options: [
      { en: 'Carbon dioxide', hi: 'कार्बन डाइऑक्साइड' },
      { en: 'Oxygen', hi: 'ऑक्सीजन' },
      { en: 'Smoke', hi: 'धुआँ' },
      { en: 'Hydrogen', hi: 'हाइड्रोजन' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'World Environment Day is celebrated on?', hi: 'विश्व पर्यावरण दिवस कब मनाया जाता है?' },
    options: [
      { en: '5 June', hi: '5 जून' },
      { en: '26 January', hi: '26 जनवरी' },
      { en: '15 August', hi: '15 अगस्त' },
      { en: '2 October', hi: '2 अक्टूबर' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'The ozone layer protects us from?', hi: 'ओज़ोन परत हमें किससे बचाती है?' },
    options: [
      { en: 'Harmful ultraviolet (UV) rays of the Sun', hi: 'सूर्य की हानिकारक पराबैंगनी (UV) किरणों से' },
      { en: 'Rain', hi: 'बारिश से' },
      { en: 'Wind', hi: 'हवा से' },
      { en: 'Sound', hi: 'आवाज़ से' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'What is the main cause of global warming?', hi: 'ग्लोबल वार्मिंग का मुख्य कारण क्या है?' },
    options: [
      { en: 'Greenhouse gases from burning coal, oil and petrol', hi: 'कोयला, तेल और पेट्रोल जलाने से निकली ग्रीनहाउस गैसें' },
      { en: 'Planting more trees', hi: 'अधिक पेड़ लगाना' },
      { en: 'Using cycles', hi: 'साइकिल चलाना' },
      { en: 'Rainfall', hi: 'बारिश होना' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Which is a renewable source of energy?', hi: 'नवीकरणीय ऊर्जा का स्रोत कौन सा है?' },
    options: [
      { en: 'Solar energy', hi: 'सौर ऊर्जा' },
      { en: 'Coal', hi: 'कोयला' },
      { en: 'Petrol', hi: 'पेट्रोल' },
      { en: 'Diesel', hi: 'डीज़ल' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'What is the best way to save water at home?', hi: 'घर में पानी बचाने का सबसे अच्छा तरीका क्या है?' },
    options: [
      { en: 'Fix leaking taps and collect rainwater', hi: 'टपकते नल ठीक करें और बारिश का पानी जमा करें' },
      { en: 'Leave the tap running', hi: 'नल खुला छोड़ें' },
      { en: 'Wash cars daily', hi: 'रोज़ गाड़ी धोएँ' },
      { en: 'Waste water while brushing', hi: 'ब्रश करते समय पानी बहाएँ' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Which is a common air pollutant from vehicles?', hi: 'वाहनों से निकलने वाला आम वायु प्रदूषक कौन सा है?' },
    options: [
      { en: 'Carbon monoxide and smoke', hi: 'कार्बन मोनोऑक्साइड और धुआँ' },
      { en: 'Fresh oxygen', hi: 'ताज़ा ऑक्सीजन' },
      { en: 'Water vapour from rain', hi: 'बारिश की भाप' },
      { en: 'Pollen of flowers', hi: 'फूलों का पराग' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Which of these is biodegradable waste?', hi: 'इनमें से कौन सा जैव-अपघटनीय कचरा है?' },
    options: [
      { en: 'Vegetable and fruit peels', hi: 'सब्ज़ी और फल के छिलके' },
      { en: 'Plastic bag', hi: 'प्लास्टिक की थैली' },
      { en: 'Glass bottle', hi: 'काँच की बोतल' },
      { en: 'Iron nail', hi: 'लोहे की कील' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Deforestation means?', hi: 'वनों की कटाई का मतलब क्या है?' },
    options: [
      { en: 'Cutting down forests on a large scale', hi: 'बड़े पैमाने पर जंगल काटना' },
      { en: 'Planting new forests', hi: 'नए जंगल लगाना' },
      { en: 'Protecting animals', hi: 'जानवरों की रक्षा करना' },
      { en: 'Cleaning rivers', hi: 'नदियाँ साफ़ करना' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'What does recycling do?', hi: 'रीसाइक्लिंग क्या करती है?' },
    options: [
      { en: 'Turns old waste into new useful things and saves resources', hi: 'पुराने कचरे से नई उपयोगी चीज़ें बनाती है और संसाधन बचाती है' },
      { en: 'Makes more garbage', hi: 'ज़्यादा कचरा बनाती है' },
      { en: 'Burns plastic in open air', hi: 'प्लास्टिक खुले में जलाती है' },
      { en: 'Pollutes rivers', hi: 'नदियों को प्रदूषित करती है' },
    ],
    correctIndex: 0,
  },
];

const mediumQuestions = [
  {
    question: { en: 'Why can compact, mixed-use neighbourhoods reduce transport emissions?', hi: 'सघन, मिश्रित उपयोग वाले पड़ोस परिवहन उत्सर्जन कैसे घटा सकते हैं?' },
    options: [
      { en: 'Homes, shops and services are closer, so people can make shorter trips', hi: 'घर, दुकानें और सेवाएँ पास होने से यात्राएँ छोटी हो सकती हैं' },
      { en: 'They require more private cars', hi: 'इनमें अधिक निजी कारों की ज़रूरत होती है' },
      { en: 'They eliminate the need for public spaces', hi: 'इनमें सार्वजनिक स्थानों की ज़रूरत नहीं रहती' },
      { en: 'They increase the distance between daily services', hi: 'ये रोज़मर्रा की सेवाओं के बीच दूरी बढ़ाते हैं' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'What does embodied carbon in a building mainly refer to?', hi: 'किसी इमारत में अंतर्निहित कार्बन का मुख्य अर्थ क्या है?' },
    options: [
      { en: 'Emissions from making, transporting and constructing with materials', hi: 'सामग्री बनाने, ढोने और निर्माण में होने वाला उत्सर्जन' },
      { en: 'Only the electricity used by occupants', hi: 'केवल निवासियों द्वारा उपयोग की गई बिजली' },
      { en: 'Carbon stored in the surrounding soil only', hi: 'केवल आसपास की मिट्टी में जमा कार्बन' },
      { en: 'Emissions from commuting after the building is demolished', hi: 'इमारत गिराने के बाद यात्रा से होने वाला उत्सर्जन' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Which window arrangement usually supports cross-ventilation?', hi: 'कौन-सी खिड़की व्यवस्था आमतौर पर आर-पार हवा आने में मदद करती है?' },
    options: [
      { en: 'Openings on opposite sides of a room', hi: 'कमरे की आमने-सामने वाली दीवारों पर खुली जगहें' },
      { en: 'One sealed window on a single wall', hi: 'एक दीवार पर बंद खिड़की' },
      { en: 'Windows covered permanently with insulation', hi: 'इन्सुलेशन से हमेशा ढकी खिड़कियाँ' },
      { en: 'A door and window both kept closed', hi: 'दरवाज़ा और खिड़की दोनों बंद रखना' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'How does a high-albedo roof help a building in a hot climate?', hi: 'गर्म जलवायु में अधिक परावर्तक छत इमारत की कैसे मदद करती है?' },
    options: [
      { en: 'It reflects more sunlight and reduces heat absorbed by the roof', hi: 'यह अधिक धूप परावर्तित करके छत द्वारा सोखी जाने वाली गर्मी घटाती है' },
      { en: 'It stores more heat during the day', hi: 'यह दिन में अधिक गर्मी जमा करती है' },
      { en: 'It increases the need for artificial lighting', hi: 'यह कृत्रिम रोशनी की ज़रूरत बढ़ाती है' },
      { en: 'It prevents rainwater from reaching drains', hi: 'यह वर्षा जल को नालियों तक पहुँचने से रोकती है' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Why are recharge pits used in rainwater harvesting?', hi: 'वर्षा जल संचयन में रिचार्ज पिट का उपयोग क्यों होता है?' },
    options: [
      { en: 'To help collected rainwater soak into the ground and replenish groundwater', hi: 'जमा बारिश के पानी को ज़मीन में पहुँचाकर भूजल बढ़ाने के लिए' },
      { en: 'To send all rainwater directly into the sea', hi: 'सारे बारिश के पानी को सीधे समुद्र में भेजने के लिए' },
      { en: 'To increase runoff from paved areas', hi: 'पक्के क्षेत्रों से बहाव बढ़ाने के लिए' },
      { en: 'To store household solid waste', hi: 'घरेलू ठोस कचरा जमा करने के लिए' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Why can public transport lower emissions per passenger?', hi: 'सार्वजनिक परिवहन प्रति यात्री उत्सर्जन कैसे घटा सकता है?' },
    options: [
      { en: 'Many passengers share one vehicle and its energy use', hi: 'कई यात्री एक वाहन और उसकी ऊर्जा का साझा उपयोग करते हैं' },
      { en: 'Buses always travel shorter distances than walking', hi: 'बसें हमेशा पैदल चलने से कम दूरी तय करती हैं' },
      { en: 'It removes the need to maintain roads', hi: 'इससे सड़कों के रखरखाव की ज़रूरत नहीं रहती' },
      { en: 'Every passenger uses a separate vehicle', hi: 'हर यात्री अलग वाहन का उपयोग करता है' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'A building life-cycle assessment can include which stages?', hi: 'इमारत के जीवन-चक्र आकलन में कौन-से चरण शामिल हो सकते हैं?' },
    options: [
      { en: 'Material production, construction, use and end-of-life', hi: 'सामग्री उत्पादन, निर्माण, उपयोग और अंतिम निपटान' },
      { en: 'Only the day the building opens', hi: 'केवल इमारत खुलने का दिन' },
      { en: 'Only the colour of the exterior paint', hi: 'केवल बाहरी रंग का चुनाव' },
      { en: 'Only the number of floors', hi: 'केवल मंज़िलों की संख्या' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'What is a key benefit of permeable paving?', hi: 'पानी सोखने वाले पेवमेंट का एक मुख्य लाभ क्या है?' },
    options: [
      { en: 'It lets some rainwater pass through and reduces surface runoff', hi: 'यह बारिश के कुछ पानी को नीचे जाने देकर सतही बहाव घटाता है' },
      { en: 'It makes every paved surface completely waterproof', hi: 'यह हर पक्की सतह को पूरी तरह जलरोधी बनाता है' },
      { en: 'It prevents trees from receiving water', hi: 'यह पेड़ों तक पानी पहुँचने से रोकता है' },
      { en: 'It increases flooding by blocking drains', hi: 'यह नालियाँ रोककर बाढ़ बढ़ाता है' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Why should external shading be designed for the Sun’s direction?', hi: 'बाहरी छाया को सूर्य की दिशा के अनुसार क्यों बनाना चाहिए?' },
    options: [
      { en: 'To block unwanted direct heat while still allowing useful daylight', hi: 'अनचाही सीधी गर्मी रोकते हुए उपयोगी दिन की रोशनी आने देने के लिए' },
      { en: 'To make every room dark throughout the day', hi: 'दिन भर हर कमरे को अँधेरा रखने के लिए' },
      { en: 'To increase heat gain through windows', hi: 'खिड़कियों से आने वाली गर्मी बढ़ाने के लिए' },
      { en: 'To prevent fresh air from entering the building', hi: 'इमारत में ताज़ी हवा आने से रोकने के लिए' },
    ],
    correctIndex: 0,
  },
  {
    question: { en: 'Which approach best supports construction-waste reduction?', hi: 'निर्माण कचरा घटाने में कौन-सा तरीका सबसे अधिक मदद करता है?' },
    options: [
      { en: 'Plan material quantities and separate reusable waste on site', hi: 'सामग्री की मात्रा पहले तय करें और दोबारा उपयोग योग्य कचरा अलग रखें' },
      { en: 'Mix all materials and send them to landfill', hi: 'सभी सामग्री मिलाकर लैंडफिल में भेजें' },
      { en: 'Order extra material without measuring', hi: 'मापे बिना अतिरिक्त सामग्री मँगाएँ' },
      { en: 'Burn leftover materials beside the site', hi: 'बची सामग्री को निर्माण स्थल के पास जला दें' },
    ],
    correctIndex: 0,
  },
];

initSqlJs().then((SQL) => {
  const fileBuffer = fs.existsSync(dbPath) ? fs.readFileSync(dbPath) : null;
  db = new SQL.Database(fileBuffer || undefined);

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS quiz_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_en TEXT NOT NULL,
      question_hi TEXT NOT NULL,
      options_en TEXT NOT NULL,
      options_hi TEXT NOT NULL,
      correct_index INTEGER NOT NULL,
      difficulty TEXT NOT NULL DEFAULT 'easy',
      active INTEGER NOT NULL DEFAULT 1,
      created_by INTEGER,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      score INTEGER NOT NULL,
      difficulty TEXT NOT NULL DEFAULT 'easy',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  const questionColumns = getAll('PRAGMA table_info(quiz_questions)');
  if (!questionColumns.some((column) => column.name === 'difficulty')) {
    db.run("ALTER TABLE quiz_questions ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'easy'");
  }
  const leaderboardColumns = getAll('PRAGMA table_info(leaderboard)');
  if (!leaderboardColumns.some((column) => column.name === 'difficulty')) {
    db.run("ALTER TABLE leaderboard ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'easy'");
  }
  persistDb();
  upsertDefaultAdmin();

  const admin = getOne('SELECT id FROM users WHERE email = ?', ['admin@buildsmart.com']);
  [
    ...defaultQuestions.map((item) => ({ ...item, difficulty: 'easy' })),
    ...mediumQuestions.map((item) => ({ ...item, difficulty: 'medium' })),
  ].forEach((item) => {
    const existing = getOne('SELECT id FROM quiz_questions WHERE question_en = ?', [item.question.en]);
    if (existing) return;

    insertAndReturnId(
      'INSERT INTO quiz_questions (question_en, question_hi, options_en, options_hi, correct_index, difficulty, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        item.question.en,
        item.question.hi,
        JSON.stringify(item.options.map((option) => option.en)),
        JSON.stringify(item.options.map((option) => option.hi)),
        item.correctIndex,
        item.difficulty,
        admin ? admin.id : null,
      ],
    );
  });

  app.use(express.json({ limit: '2mb' }));
  app.use(express.static(rootDir));

  app.get('/api/health', (req, res) => {
    res.json({ ok: true, status: 'healthy' });
  });

  app.post('/api/auth/signup', (req, res) => {
    const body = req.body || {};
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!name || !email || password.length < 6) {
      return res.status(400).json({ ok: false, message: 'Name, valid email and password (6+ chars) are required.' });
    }

    if (getOne('SELECT id FROM users WHERE email = ?', [email])) {
      return res.status(409).json({ ok: false, message: 'A user with this email already exists.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const userId = insertAndReturnId('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash]);
    const user = getOne('SELECT * FROM users WHERE id = ?', [userId]);
    const token = generateToken();
    insertAndReturnId('INSERT INTO sessions (token, user_id) VALUES (?, ?)', [token, user.id]);

    res.json({ ok: true, token, user: publicUser(user) });
  });

  app.post('/api/auth/login', (req, res) => {
    const body = req.body || {};
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Email and password are required.' });
    }

    const user = getOne('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ ok: false, message: 'Invalid email or password.' });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ ok: false, message: 'Invalid email or password.' });
    }

    const token = generateToken();
    insertAndReturnId('INSERT INTO sessions (token, user_id) VALUES (?, ?)', [token, user.id]);

    res.json({ ok: true, token, user: publicUser(user) });
  });

  app.post('/api/auth/logout', requireAuth, (req, res) => {
    const token = getTokenFromRequest(req);
    if (token) {
      runQuery('DELETE FROM sessions WHERE token = ?', [token]);
    }
    res.json({ ok: true });
  });

  app.get('/api/auth/me', requireAuth, (req, res) => {
    res.json({ ok: true, user: publicUser(req.user) });
  });

  app.get('/api/questions', (req, res) => {
    const rows = getAll('SELECT * FROM quiz_questions WHERE active = 1 ORDER BY id ASC');
    res.json({ questions: rows.map(questionDto) });
  });

  app.post('/api/questions', requireAdmin, (req, res) => {
    const body = req.body || {};
    const questionEn = String(body.question?.en || '').trim();
    const questionHi = String(body.question?.hi || '').trim();
    const options = Array.isArray(body.options) ? body.options : [];
    const correctIndex = Number(body.correctIndex || 0);
    const difficulty = String(body.difficulty || 'easy');

    if (!questionEn || !questionHi || options.length !== 4) {
      return res.status(400).json({ ok: false, message: 'Please provide a question with four options.' });
    }

    const normalizedOptions = options.map((option) => ({
      en: String(option?.en || '').trim(),
      hi: String(option?.hi || '').trim(),
    }));

    if (normalizedOptions.some((option) => !option.en || !option.hi)) {
      return res.status(400).json({ ok: false, message: 'Each option must include both English and Hindi text.' });
    }

    if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) {
      return res.status(400).json({ ok: false, message: 'Correct index must be an integer between 0 and 3.' });
    }
    if (!['easy', 'medium'].includes(difficulty)) {
      return res.status(400).json({ ok: false, message: 'Difficulty must be easy or medium.' });
    }

    const id = insertAndReturnId(
      'INSERT INTO quiz_questions (question_en, question_hi, options_en, options_hi, correct_index, difficulty, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        questionEn,
        questionHi,
        JSON.stringify(normalizedOptions.map((option) => option.en)),
        JSON.stringify(normalizedOptions.map((option) => option.hi)),
        correctIndex,
        difficulty,
        req.user.id,
      ],
    );

    const created = getOne('SELECT * FROM quiz_questions WHERE id = ?', [id]);
    res.json({ ok: true, question: questionDto(created) });
  });

  app.get('/api/admin/summary', requireAdmin, (req, res) => {
    const users = Number(getOne('SELECT COUNT(*) AS total FROM users')?.total || 0);
    const questions = Number(getOne('SELECT COUNT(*) AS total FROM quiz_questions WHERE active = 1')?.total || 0);
    const attempts = Number(getOne('SELECT COUNT(*) AS total FROM leaderboard')?.total || 0);
    const leaderboard = getAll('SELECT name, score, created_at FROM leaderboard ORDER BY score DESC, created_at DESC LIMIT 10');

    res.json({
      ok: true,
      stats: {
        users,
        questions,
        attempts,
      },
      leaderboard,
    });
  });

  app.get('/api/leaderboard', (req, res) => {
    const rows = getAll('SELECT * FROM leaderboard ORDER BY score DESC, created_at ASC LIMIT 20');
    res.json({ leaderboard: rows });
  });

  app.post('/api/leaderboard', (req, res) => {
    const name = String(req.body?.name || 'Guest').trim().slice(0, 24) || 'Guest';
    const score = Number(req.body?.score ?? 0);
    const difficulty = String(req.body?.difficulty || 'easy');

    if (!Number.isFinite(score) || score < 0 || score > 10) {
      return res.status(400).json({ ok: false, message: 'Score must be between 0 and 10.' });
    }
    if (!['easy', 'medium'].includes(difficulty)) {
      return res.status(400).json({ ok: false, message: 'Difficulty must be easy or medium.' });
    }

    const userId = req.user ? req.user.id : null;
    insertAndReturnId(
      'INSERT INTO leaderboard (user_id, name, score, difficulty) VALUES (?, ?, ?, ?)',
      [userId, name, Math.round(score), difficulty],
    );

    const rows = getAll('SELECT * FROM leaderboard ORDER BY score DESC, created_at ASC LIMIT 20');
    res.json({ ok: true, leaderboard: rows });
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'quiz.html'));
  });

  app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ ok: false, message: 'Not found.' });
    }
    res.sendFile(path.join(rootDir, 'quiz.html'));
  });

  app.listen(PORT, () => {
    console.log(`BuildSmart backend running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Database init failed:', error.message);
  process.exit(1);
});
