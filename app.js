const state = {
  screen: window.location.hash.replace('#/', '') || 'home'
};

const routes = new Set(['home', 'schedule', 'plan', 'progress', 'therapy', 'photos', 'more', 'messages']);
if (!routes.has(state.screen)) state.screen = 'home';

function setScreen(screen) {
  state.screen = screen;
  window.location.hash = `/${screen}`;
  render();
}

window.addEventListener('hashchange', () => {
  const next = window.location.hash.replace('#/', '') || 'home';
  state.screen = routes.has(next) ? next : 'home';
  render();
});

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(child => {
    if (child == null) return;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });
  return node;
}

function button(label, kind = 'secondary', onClick = null, full = false) {
  return el('button', { class: `btn ${kind}`, onclick: onClick, style: full ? 'width:100%' : '' }, label);
}

function imageBlock(tone, label, height = 120) {
  return el('div', { class: `image-block ${tone === 'red' ? 'image-red' : 'image-bronze'}`, style: `min-height:${height}px` }, [
    el('div', { class: 'image-chip' }, label)
  ]);
}

function card(inner, light = false, pad = false, extraStyle = '') {
  return el('div', { class: `card ${light ? 'light' : 'dark'} ${pad ? 'pad' : ''}`, style: extraStyle }, inner);
}

function label(text, light = false) {
  return el('div', { class: 'label', style: light ? 'color:#78716c' : '' }, text);
}

function progressBar(value, light = false) {
  return el('div', { class: `progressbar ${light ? 'light' : ''}` }, [
    el('div', { class: 'fill', style: `width:${value}%` })
  ]);
}

function navButton(route, text, light = false) {
  const active = state.screen === route;
  return el('button', {
    class: `nav-btn ${active ? 'active' : ''} ${light ? 'light' : 'dark'}`,
    onclick: () => setScreen(route)
  }, [el('div', { class: 'nav-dot' }), text]);
}

function bottomNav(light = false) {
  return el('div', { class: `bottom-nav ${light ? 'light' : 'dark'}` }, [
    navButton('home', 'Home', light),
    navButton('schedule', 'Schedule', light),
    navButton('plan', 'Plan', light),
    navButton('progress', 'Progress', light),
    navButton('more', 'More', light),
  ]);
}

function phone(inner, light = false) {
  return el('div', { class: `phone ${light ? 'light' : 'dark'}` }, [
    el('div', { class: 'island' }),
    el('div', { class: 'viewport' }, inner),
  ]);
}

function homeScreen() {
  const body = el('div', {}, [
    label('Good morning'),
    el('div', { class: 'title-lg' }, 'Alexandra'),
    el('div', { style: 'margin-top:24px;display:flex;justify-content:space-between;align-items:center' }, [
      label('Upcoming'),
      el('button', { style: 'background:none;border:none;color:#d6d3d1;cursor:pointer', onclick: () => setScreen('schedule') }, 'View all')
    ]),
    el('div', { style: 'display:grid;gap:12px;margin-top:12px' }, [
      card(el('div', { style: 'display:grid;grid-template-columns:1.2fr 1fr' }, [
        el('div', { style: 'padding:16px' }, [
          el('div', { style: 'font-size:20px;font-weight:500' }, 'Sculpt Class'),
          el('div', { class: 'muted', style: 'font-size:14px;margin-top:2px' }, 'Full Body'),
          el('div', { class: 'muted', style: 'font-size:12px;margin-top:16px;line-height:1.8' }, [
            el('div', {}, 'Today, 8:00 AM'),
            el('div', {}, 'BB Sculpt Studio')
          ])
        ]),
        imageBlock('bronze', 'Full Body', 170)
      ])),
      card(el('div', { style: 'display:grid;grid-template-columns:1.2fr 1fr' }, [
        el('div', { style: 'padding:16px' }, [
          el('div', { style: 'font-size:20px;font-weight:500' }, 'Red Light Therapy'),
          el('div', { class: 'muted', style: 'font-size:14px;margin-top:2px' }, 'Recovery Session'),
          el('div', { class: 'muted', style: 'font-size:12px;margin-top:16px;line-height:1.8' }, [
            el('div', {}, 'Tomorrow, 12:30 PM'),
            el('div', {}, 'BB Sculpt Recovery')
          ])
        ]),
        imageBlock('red', 'Recovery', 170)
      ]))
    ]),
    card(el('div', { class: 'pad', style: 'background:linear-gradient(135deg,#121212 0%,#1a1714 100%)' }, [
      label('Your plan'),
      el('div', { style: 'font-size:24px;margin-top:8px' }, 'Phase 2: Build & Define'),
      el('div', { class: 'muted', style: 'font-size:14px;margin-top:4px' }, 'Week 5 of 12'),
      progressBar(58),
      el('div', { class: 'muted', style: 'text-align:right;margin-top:8px;font-size:12px' }, '58%')
    ]), false, false, 'margin-top:16px'),
    el('div', { class: 'grid-3', style: 'margin-top:16px' }, [
      card(el('div', { class: 'pad' }, [el('div', { class: 'metric-title' }, 'Classes'), el('div', { class: 'metric-value' }, '3 / 5'), el('div', { class: 'metric-sub' }, 'this week')])),
      card(el('div', { class: 'pad' }, [el('div', { class: 'metric-title' }, 'Recovery'), el('div', { class: 'metric-value' }, '2 / 2'), el('div', { class: 'metric-sub' }, 'this week')])),
      card(el('div', { class: 'pad' }, [el('div', { class: 'metric-title' }, 'Streak'), el('div', { class: 'metric-value' }, '12'), el('div', { class: 'metric-sub' }, 'days')]))
    ]),
    el('div', { style: 'margin-top:20px' }, label('Recent progress')),
    el('div', { class: 'grid-2', style: 'margin-top:12px' }, [
      card(el('div', { class: 'pad' }, [el('div', { class: 'metric-title' }, 'Waist'), el('div', { style: 'font-size:34px;margin-top:8px;font-weight:300' }, '-1.2 in'), el('div', { class: 'metric-sub' }, 'vs last month')])),
      card(el('div', { class: 'pad' }, [el('div', { class: 'metric-title' }, 'Body Fat'), el('div', { style: 'font-size:34px;margin-top:8px;font-weight:300' }, '-2.4%'), el('div', { class: 'metric-sub' }, 'vs last month')]))
    ]),
    bottomNav(false)
  ]);
  return phone(body, false);
}

function scheduleScreen() {
  const bookings = [
    ['Red Light Therapy', '20 min', 'Boost recovery and support cellular repair.', 'red', true],
    ['Compression Recovery', '30 min', 'Improve circulation and reduce soreness.', 'bronze', false],
    ['Assisted Stretch', '30 min', 'Increase mobility and restore range of motion.', 'bronze', false]
  ];
  const body = el('div', {}, [
    el('div', { style: 'text-align:center;font-size:13px;letter-spacing:.35em;text-transform:uppercase;color:#57534e' }, 'Book'),
    el('div', { class: 'segment seg-3', style: 'margin-top:16px' }, [
      el('div', { class: 'seg-item' }, 'Classes'),
      el('div', { class: 'seg-item active' }, 'Recovery'),
      el('div', { class: 'seg-item' }, 'Consults')
    ]),
    el('div', { class: 'days' }, ['M','T','W','T','F','S','S'].map((d, i) => el('div', {}, [
      el('div', {}, d),
      el('div', { class: `day-pill ${i===1 ? 'active' : ''}` }, String(13 + i))
    ]))),
    el('div', { style: 'margin-top:20px' }, label('Tuesday, May 14', true)),
    el('div', { style: 'display:grid;gap:12px;margin-top:12px' }, bookings.map(([title, mins, desc, tone, active]) =>
      card(el('div', { style: 'display:grid;grid-template-columns:84px 1fr auto;gap:12px;padding:12px;align-items:center' }, [
        el('div', { style: 'width:80px;height:96px' }, imageBlock(tone, 'Recovery', 96)),
        el('div', {}, [
          el('div', { style: 'font-weight:600;color:#1a1a1a' }, title),
          el('div', { class: 'muted-light', style: 'font-size:14px;margin-top:2px' }, mins),
          el('div', { style: 'font-size:14px;color:#57534e;margin-top:6px;line-height:1.45' }, desc),
        ]),
        el('button', { onclick: () => setScreen(title === 'Red Light Therapy' ? 'therapy' : 'schedule'), style: `border-radius:14px;padding:10px 14px;background:${active ? '#000' : 'transparent'};color:${active ? '#fff' : '#1a1a1a'};border:1px solid ${active ? '#000' : '#D1C2AF'};cursor:pointer;font-weight:600` }, active ? 'Booked' : 'Book')
      ]), true)
    )),
    bottomNav(true)
  ]);
  return phone(body, true);
}

function planScreen() {
  const items = [
    ['Class Cadence', '3–4 classes per week'],
    ['Strength Training', '2x per week'],
    ['Recovery & Mobility', '2–3x per week'],
    ['Daily Movement', '6–8K+ steps'],
    ['Nutrition Focus', 'High protein, whole foods']
  ];
  const body = el('div', {}, [
    el('div', { class: 'title-lg', style: 'margin-top:0' }, 'Your Plan'),
    card(el('div', { style: 'display:grid;grid-template-columns:1fr 108px' }, [
      el('div', { class: 'pad' }, [
        el('div', { style: 'font-size:28px;font-weight:300;color:#1a1a1a' }, 'Phase 2: Build & Define'),
        el('div', { class: 'muted-light', style: 'font-size:14px;margin-top:4px' }, 'Week 5 of 12'),
        progressBar(58, true),
        el('div', { class: 'muted-light', style: 'text-align:right;margin-top:8px;font-size:12px' }, '58%')
      ]),
      el('div', { style: 'padding:12px' }, imageBlock('bronze', 'Plan', 150))
    ]), true, false, 'margin-top:20px'),
    el('div', { class: 'segment seg-2', style: 'margin-top:16px' }, [
      el('div', { class: 'seg-item active' }, 'Plan Overview'),
      el('div', { class: 'seg-item' }, 'Recommendations')
    ]),
    el('div', { style: 'display:grid;gap:12px;margin-top:16px' }, items.map(([title, text]) =>
      card(el('div', { style: 'display:flex;align-items:center;gap:14px;padding:16px' }, [
        el('div', { style: 'width:44px;height:44px;border-radius:16px;background:#F4EEE6' }),
        el('div', { style: 'flex:1' }, [
          el('div', { style: 'font-weight:600;color:#1a1a1a' }, title),
          el('div', { class: 'muted-light', style: 'font-size:14px;margin-top:2px' }, text)
        ]),
        el('div', { class: 'muted-light' }, '›')
      ]), true)
    )),
    bottomNav(true)
  ]);
  return phone(body, true);
}

function progressScreen() {
  const body = el('div', {}, [
    el('div', { class: 'title-lg', style: 'margin-top:0' }, 'Progress'),
    el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-top:16px' }, [
      el('div', { style: 'display:flex;background:#151515;border-radius:999px;padding:4px;font-size:12px' }, [
        el('div', { style: 'padding:8px 14px;border-radius:999px;background:#232323' }, 'Overview'),
        el('div', { class: 'muted', style: 'padding:8px 14px' }, 'Metrics'),
        el('button', { onclick: () => setScreen('photos'), style: 'padding:8px 14px;color:#a8a29e;background:transparent;border:none;cursor:pointer' }, 'Photos')
      ]),
      el('div', { style: 'border:1px solid #2b2b2b;background:#111;color:#d6d3d1;border-radius:999px;padding:8px 12px;font-size:12px' }, '30 Days')
    ]),
    card(el('div', { class: 'pad' }, [
      el('div', { style: 'font-weight:600' }, 'Body Composition'),
      el('div', { class: 'metric-sub', style: 'margin-top:4px' }, 'vs Apr 13 – May 13'),
      el('div', { style: 'display:grid;grid-template-columns:120px 1fr;gap:16px;margin-top:12px;align-items:center' }, [
        el('div', { style: 'width:112px;height:112px;margin:0 auto;border-radius:50%;border:12px solid #2A2A2A;border-top-color:var(--bronze);border-right-color:#9e7752' }),
        el('div', { style: 'font-size:14px;line-height:2' }, [
          el('div', { class: 'kv' }, [el('span', { class: 'muted' }, 'Muscle Mass'), el('span', {}, '+1.6 lbs')]),
          el('div', { class: 'kv' }, [el('span', { class: 'muted' }, 'Body Fat'), el('span', {}, '-2.4%')]),
          el('div', { class: 'kv' }, [el('span', { class: 'muted' }, 'Weight'), el('span', {}, '-2.8 lbs')])
        ])
      ])
    ]), false, false, 'margin-top:16px'),
    card(el('div', { class: 'pad' }, [
      el('div', { style: 'font-weight:600' }, 'Measurements'),
      el('div', { class: 'metric-sub', style: 'margin-top:4px' }, 'vs Apr 13 – May 13'),
      el('div', { style: 'margin-top:12px;font-size:14px' }, [
        ...[['Waist', '-1.2 in'],['Hips', '-0.7 in'],['Thighs', '-0.6 in'],['Arms', '-0.4 in']].map(([k,v]) => el('div', { style: 'display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #222' }, [el('span', { class: 'muted' }, k), el('span', {}, v)]))
      ])
    ]), false, false, 'margin-top:16px'),
    el('div', { class: 'grid-2', style: 'margin-top:16px' }, [
      card(el('div', { class: 'pad' }, [el('div', { class: 'metric-title' }, 'Classes Completed'), el('div', { class: 'metric-value' }, '9'), el('div', { class: 'metric-sub' }, 'this month')])),
      card(el('div', { class: 'pad' }, [el('div', { class: 'metric-title' }, 'Attendance Rate'), el('div', { class: 'metric-value' }, '90%'), el('div', { class: 'metric-sub' }, 'this month')]))
    ]),
    bottomNav(false)
  ]);
  return phone(body, false);
}

function therapyScreen() {
  const body = el('div', {}, [
    el('button', { onclick: () => setScreen('schedule'), style: 'background:none;border:none;color:#d6d3d1;cursor:pointer;margin-bottom:16px' }, '← Back'),
    el('div', { style: 'border-radius:26px;overflow:hidden;border:1px solid #292929' }, imageBlock('red', 'Recovery', 288)),
    el('div', { style: 'margin-top:20px' }, [
      label('Recovery'),
      el('div', { style: 'font-size:36px;font-weight:300;margin-top:6px' }, 'Red Light Therapy'),
      el('div', { style: 'font-size:14px;line-height:1.7;color:#d6d3d1;margin-top:12px' }, 'Non-invasive light therapy to support recovery, reduce inflammation, and promote cellular repair and performance.')
    ]),
    el('div', { class: 'grid-3', style: 'margin-top:20px' }, [
      card(el('div', { class: 'pad', style: 'text-align:center' }, [el('div', { style: 'font-size:24px;font-weight:300' }, '20 min'), el('div', { class: 'metric-sub' }, 'Duration')])),
      card(el('div', { class: 'pad', style: 'text-align:center' }, [el('div', { style: 'font-size:24px;font-weight:300' }, 'Relax'), el('div', { class: 'metric-sub' }, 'Recharge')])),
      card(el('div', { class: 'pad', style: 'text-align:center' }, [el('div', { style: 'font-size:24px;font-weight:300' }, 'Recovery'), el('div', { class: 'metric-sub' }, 'Performance')]))
    ]),
    card(el('div', { class: 'pad' }, [
      el('div', { style: 'font-weight:600' }, 'Benefits'),
      el('div', { style: 'display:grid;gap:12px;margin-top:14px;font-size:14px;color:#d6d3d1' }, [
        el('div', {}, '• Reduce muscle soreness and inflammation'),
        el('div', {}, '• Support cellular repair and energy'),
        el('div', {}, '• Promote healthy skin and collagen'),
        el('div', {}, '• Enhance recovery and overall well-being')
      ])
    ]), false, false, 'margin-top:20px'),
    el('div', { style: 'display:grid;gap:12px;margin-top:20px' }, [
      button('Book This Session', 'primary', () => window.alert('Prototype only'), true),
      button('Learn More', 'secondary', () => window.alert('Prototype only'), true)
    ])
  ]);
  return phone(body, false);
}

function photosScreen() {
  const body = el('div', {}, [
    el('button', { onclick: () => setScreen('progress'), style: 'background:none;border:none;color:#1a1a1a;cursor:pointer;margin-bottom:16px' }, '← Back'),
    el('div', { class: 'title-lg', style: 'margin-top:0;color:#1a1a1a' }, 'Progress Photos'),
    el('div', { class: 'segment seg-3', style: 'margin-top:16px' }, [
      el('div', { class: 'seg-item active' }, 'Front'),
      el('div', { class: 'seg-item' }, 'Side'),
      el('div', { class: 'seg-item' }, 'Back')
    ]),
    el('div', { class: 'grid-2', style: 'margin-top:16px' }, ['Apr 13','May 13'].map(labelTxt =>
      card(el('div', {}, [
        el('div', { style: 'height:255px;background:linear-gradient(180deg,#efe7db 0%, #d8cabb 100%)' }),
        el('div', { style: 'padding:14px;text-align:center;border-top:1px solid var(--cream-line);color:#1a1a1a' }, labelTxt)
      ]), true)
    )),
    el('div', { style: 'margin-top:16px' }, button('Add New Photos', 'primary', () => window.alert('Prototype only'), true))
  ]);
  return phone(body, true);
}

function moreScreen() {
  const body = el('div', {}, [
    el('div', { class: 'title-lg', style: 'margin-top:0' }, 'My Account'),
    card(el('div', { style: 'display:flex;gap:16px;align-items:center;padding:16px' }, [
      el('div', { style: 'width:64px;height:64px;border-radius:50%;border:1px solid #2b2b2b;background:#1a1a1a;display:flex;align-items:center;justify-content:center;color:#f4efe7' }, 'AS'),
      el('div', { style: 'flex:1' }, [
        el('div', { style: 'font-size:20px' }, 'Alexandra Smith'),
        el('div', { class: 'muted', style: 'font-size:14px;margin-top:4px' }, 'Member since Jan 2024'),
        el('div', { style: 'font-size:14px;color:#d6d3d1;margin-top:8px' }, 'View profile ›')
      ])
    ]), false, false, 'margin-top:20px'),
    el('div', { style: 'display:grid;gap:12px;margin-top:16px' }, [
      ['Membership', 'Elevate Membership', 'Renews Jun 1, 2024'],
      ['Packages', '10 Recovery Sessions', '8 remaining'],
      ['Messages', 'Coach & concierge support', 'Open inbox']
    ].map(([a,b,c]) => card(el('div', { style: 'padding:16px;display:flex;justify-content:space-between;align-items:center' }, [
      el('div', {}, [
        el('div', { class: 'muted', style: 'font-size:14px' }, a),
        el('div', { style: 'font-size:22px;margin-top:6px' }, b),
        el('div', { class: 'metric-sub', style: 'font-size:14px;margin-top:4px' }, c)
      ]),
      el('div', { class: 'metric-sub' }, '›')
    ])))) ,
    el('div', { class: 'grid-2', style: 'margin-top:16px' }, [
      button('Open Messages', 'secondary', () => setScreen('messages'), true),
      button('Manage Plan', 'primary', () => setScreen('plan'), true)
    ]),
    bottomNav(false)
  ]);
  return phone(body, false);
}

function messagesScreen() {
  const body = el('div', {}, [
    el('div', { class: 'title-lg', style: 'margin-top:0;color:#1a1a1a' }, 'Messages'),
    el('div', { class: 'chat-wrap' }, [
      el('div', { class: 'msg-row left' }, el('div', { class: 'msg light' }, ['Hi Alexandra! How did your red light therapy session feel?', el('div', { class: 'msg-time muted' }, '9:30 AM') ])),
      el('div', { class: 'msg-row right' }, el('div', { class: 'msg dark' }, ['It was great — my muscles feel much better today.', el('div', { class: 'msg-time', style: 'color:#d6d3d1' }, '9:32 AM') ])),
      el('div', { class: 'msg-row left' }, el('div', { class: 'msg light' }, ['Amazing. Consistency is key. Let us know if you need anything.', el('div', { class: 'msg-time muted' }, '9:33 AM') ])),
    ]),
    el('div', { class: 'composer' }, [
      el('input', { placeholder: 'Type a message...' }),
      el('button', { class: 'send-btn' }, '→')
    ])
  ]);
  return phone(body, true);
}

function brandPanel() {
  return el('div', { class: 'brand-panel' }, [
    el('div', {}, [
      el('div', { class: 'brand-mark' }, 'BB'),
      el('div', { class: 'brand-word' }, 'SCULPT'),
      el('div', { class: 'brand-lines' }, [
        el('div', {}, 'Your studio.'),
        el('div', {}, 'Your plan.'),
        el('div', {}, 'Your progress.')
      ]),
      el('div', { class: 'brand-list' }, [
        el('div', {}, 'Book classes & recovery sessions'),
        el('div', {}, 'Track your progress'),
        el('div', {}, 'Personalized plans'),
        el('div', {}, 'Expert care & guidance'),
        el('div', {}, 'All in one place')
      ])
    ]),
    el('div', { style: 'display:grid;gap:12px' }, [
      el('div', { class: 'grid-2' }, [
        button('App Store', 'secondary', () => window.alert('Prototype only'), true),
        button('Google Play', 'secondary', () => window.alert('Prototype only'), true)
      ]),
      button('Open App', 'primary', () => setScreen('home'), true)
    ])
  ]);
}

function mobileShell() {
  const screens = {
    home: homeScreen,
    schedule: scheduleScreen,
    plan: planScreen,
    progress: progressScreen,
    therapy: therapyScreen,
    photos: photosScreen,
    more: moreScreen,
    messages: messagesScreen,
  };
  return el('div', { class: 'mobile-shell mobile-only' }, [screens[state.screen]()]);
}

function desktopLayout() {
  const screens = {
    home: [homeScreen(), scheduleScreen()],
    schedule: [scheduleScreen(), therapyScreen()],
    plan: [planScreen(), moreScreen()],
    progress: [progressScreen(), photosScreen()],
    therapy: [therapyScreen(), planScreen()],
    photos: [photosScreen(), progressScreen()],
    more: [moreScreen(), messagesScreen()],
    messages: [messagesScreen(), moreScreen()],
  };
  return el('div', { class: 'desktop-only' }, [
    el('div', { class: 'hero' }, [
      el('div', {}, [
        el('div', { class: 'kicker' }, 'BB Sculpt App'),
        el('h1', {}, 'Luxury movement, recovery, and progress.'),
        el('div', { class: 'subtext' }, 'A polished interactive prototype for BB Sculpt with booking, recovery, personalized plans, progress tracking, messages, and account management built into one premium experience.')
      ]),
      el('div', { class: 'top-actions' }, [
        button('Home', 'secondary', () => setScreen('home')),
        button('Schedule', 'secondary', () => setScreen('schedule')),
        button('Plan', 'secondary', () => setScreen('plan')),
        button('Progress', 'secondary', () => setScreen('progress')),
        button('More', 'primary', () => setScreen('more'))
      ])
    ]),
    el('div', { class: 'shell-grid' }, [
      brandPanel(),
      el('div', { class: 'phone-stack' }, screens[state.screen])
    ])
  ]);
}

function render() {
  const root = document.getElementById('app');
  root.innerHTML = '';
  root.appendChild(el('div', { class: 'page' }, [desktopLayout(), mobileShell()]));
}

render();
