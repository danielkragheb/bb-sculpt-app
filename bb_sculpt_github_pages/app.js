const state = {
  route: (window.location.hash || '#home').replace('#',''),
  toastTimer: null,
};

const routes = new Set(['home','schedule','plan','progress','therapy','photos','more','messages']);
if (!routes.has(state.route)) {
  state.route = 'home';
  window.location.hash = '#home';
}

const app = document.getElementById('app');
const toast = document.getElementById('toast');

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function setRoute(route){
  if (!routes.has(route)) return;
  state.route = route;
  if (window.location.hash !== `#${route}`) window.location.hash = `#${route}`;
  render();
}

function handleAction(action, value, message){
  if (action === 'route') setRoute(value);
  if (action === 'toast') showToast(message || 'Coming soon.');
}

document.body.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  const route = el.dataset.route;
  const message = el.dataset.message;
  handleAction(action, route, message);
});

window.addEventListener('hashchange', () => {
  const route = (window.location.hash || '#home').replace('#','');
  if (!routes.has(route)) return;
  state.route = route;
  render();
});

function sectionLabel(text, light = false){
  return `<div class="eyebrow${light ? ' light' : ''}">${text}</div>`;
}

function imageBlock(tone, label, height){
  return `
    <div class="image-block ${tone}" style="height:${height}px">
      <div class="image-chip">${label}</div>
    </div>
  `;
}

function card(inner, light = false, extra = ''){
  return `<div class="card${light ? ' light' : ''} ${extra}">${inner}</div>`;
}

function miniButton(label, route, { dark = false, booked = false, toast = '' } = {}){
  const klass = ['mini-btn'];
  if (dark) klass.push('dark');
  if (booked) klass.push('booked');
  const action = toast ? 'toast' : 'route';
  const attr = toast ? `data-message="${toast}"` : `data-route="${route}"`;
  return `<button class="${klass.join(' ')}" data-action="${action}" ${attr}>${label}</button>`;
}

function bottomNav(light = false){
  const current = state.route;
  const items = [
    ['home','Home'],
    ['schedule','Schedule'],
    ['plan','Plan'],
    ['progress','Progress'],
    ['more','More'],
  ];
  return `
    <div class="bottom-nav ${light ? 'light' : ''}">
      ${items.map(([route, label]) => `
        <button class="nav-btn ${current === route ? `active ${light ? 'light' : 'dark'}` : ''}" data-action="route" data-route="${route}">
          <span class="nav-dot"></span>
          <span>${label}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function homeScreen(){
  return `
    <div class="screen dark">
      <div class="app-header">
        <div>
          ${sectionLabel('Good morning')}
          <div class="title-main">Alexandra</div>
        </div>
      </div>

      <div class="section-row">
        ${sectionLabel('Upcoming')}
        <button class="small-link" data-action="route" data-route="schedule">View all</button>
      </div>

      <div class="list-stack">
        ${card(`
          <div class="split-card">
            <div class="card-pad">
              <div class="card-title">Sculpt Class</div>
              <div class="card-sub">Full Body</div>
              <div class="meta-list">
                <div>Today, 8:00 AM</div>
                <div>BB Sculpt Studio</div>
              </div>
            </div>
            ${imageBlock('bronze','Full Body',170)}
          </div>
        `)}
        ${card(`
          <div class="split-card">
            <div class="card-pad">
              <div class="card-title">Red Light Therapy</div>
              <div class="card-sub">Recovery Session</div>
              <div class="meta-list">
                <div>Tomorrow, 12:30 PM</div>
                <div>BB Sculpt Recovery</div>
              </div>
            </div>
            ${imageBlock('red','Recovery',170)}
          </div>
        `)}
      </div>

      ${card(`
        <div class="card-pad plan-gradient">
          ${sectionLabel('Your plan')}
          <div class="title-main" style="font-size:24px">Phase 2: Build & Define</div>
          <div class="card-sub">Week 5 of 12</div>
          <div class="progress-bar"><div class="progress-fill" style="width:58%"></div></div>
          <div class="progress-value">58%</div>
        </div>
      `, false, 'mt-16')}

      <div class="stats-grid">
        ${card(`<div class="card-pad"><div class="label-sm">Classes</div><div class="big-number" style="font-size:26px;font-weight:300;margin-top:8px">3 / 5</div><div class="sub-sm">this week</div></div>`)}
        ${card(`<div class="card-pad"><div class="label-sm">Recovery</div><div class="big-number" style="font-size:26px;font-weight:300;margin-top:8px">2 / 2</div><div class="sub-sm">this week</div></div>`)}
        ${card(`<div class="card-pad"><div class="label-sm">Streak</div><div class="big-number" style="font-size:26px;font-weight:300;margin-top:8px">12</div><div class="sub-sm">days</div></div>`)}
      </div>

      <div style="margin-top:20px">${sectionLabel('Recent progress')}</div>
      <div class="two-grid" style="margin-top:12px">
        ${card(`<div class="card-pad metrics-card"><div class="label-sm">Waist</div><div class="big-number">-1.2 in</div><div class="sub-sm">vs last month</div></div>`)}
        ${card(`<div class="card-pad metrics-card"><div class="label-sm">Body Fat</div><div class="big-number">-2.4%</div><div class="sub-sm">vs last month</div></div>`)}
      </div>

      ${bottomNav(false)}
    </div>
  `;
}

function scheduleScreen(){
  const items = [
    ['Red Light Therapy', '20 min', 'Boost recovery and support cellular repair.', 'red', true, 'therapy'],
    ['Compression Recovery', '30 min', 'Improve circulation and reduce soreness.', 'bronze', false, 'schedule'],
    ['Assisted Stretch', '30 min', 'Increase mobility and restore range of motion.', 'bronze', false, 'schedule'],
    ['Recovery Consult', '45 min', 'A personalized assessment with guidance.', 'bronze', false, 'schedule'],
  ];
  return `
    <div class="screen light" style="margin:-42px -16px -96px;padding:42px 16px 96px;background:var(--ivory-2);min-height:100%">
      <div style="text-align:center;font-size:13px;letter-spacing:.35em;text-transform:uppercase;color:#57534e">Book</div>
      <div class="segment three" style="margin-top:16px">
        <div class="segment-item">Classes</div>
        <div class="segment-item active">Recovery</div>
        <div class="segment-item">Consults</div>
      </div>

      <div class="date-row">
        ${['M','T','W','T','F','S','S'].map((d,i) => `
          <div>
            <div style="margin-bottom:8px">${d}</div>
            <div class="date-pill ${i===1 ? 'active' : ''}">${13+i}</div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:20px">${sectionLabel('Tuesday, May 14', true)}</div>
      <div class="list-stack">
        ${items.map(([title, mins, desc, tone, booked, route]) => card(`
          <div class="booking-row">
            <div class="booking-thumb">${imageBlock(tone, 'Recovery', 96)}</div>
            <div>
              <div style="font-weight:700;color:var(--text-dark)">${title}</div>
              <div class="card-sub">${mins}</div>
              <div style="font-size:14px;color:#57534e;margin-top:6px;line-height:1.45">${desc}</div>
            </div>
            ${miniButton(booked ? 'Booked' : 'Book', route, { booked, toast: booked ? 'Already booked in this prototype.' : '' })}
          </div>
        `, true)).join('')}
      </div>

      ${bottomNav(true)}
    </div>
  `;
}

function planScreen(){
  const items = [
    ['Class Cadence','3–4 classes per week'],
    ['Strength Training','2x per week'],
    ['Recovery & Mobility','2–3x per week'],
    ['Daily Movement','6–8K+ steps'],
    ['Nutrition Focus','High protein, whole foods'],
  ];
  return `
    <div class="screen light" style="margin:-42px -16px -96px;padding:42px 16px 96px;background:var(--ivory-2);min-height:100%">
      <div class="title-main">Your Plan</div>

      ${card(`
        <div style="display:grid;grid-template-columns:1fr 108px">
          <div class="card-pad">
            <div class="title-main" style="font-size:28px;color:var(--text-dark)">Phase 2: Build & Define</div>
            <div class="card-sub">Week 5 of 12</div>
            <div class="progress-bar"><div class="progress-fill" style="width:58%"></div></div>
            <div class="progress-value">58%</div>
          </div>
          <div style="padding:12px">${imageBlock('bronze','Plan',150)}</div>
        </div>
      `, true)}

      <div class="segment two" style="margin-top:16px">
        <div class="segment-item active">Plan Overview</div>
        <div class="segment-item">Recommendations</div>
      </div>

      <div class="list-stack">
        ${items.map(([title,text]) => card(`
          <div class="plan-row">
            <div class="plan-icon"></div>
            <div style="flex:1">
              <div style="font-weight:700;color:var(--text-dark)">${title}</div>
              <div class="card-sub">${text}</div>
            </div>
            <div class="arrow">›</div>
          </div>
        `, true)).join('')}
      </div>

      ${bottomNav(true)}
    </div>
  `;
}

function progressScreen(){
  const measurements = [
    ['Waist','-1.2 in'],
    ['Hips','-0.7 in'],
    ['Thighs','-0.6 in'],
    ['Arms','-0.4 in'],
  ];
  return `
    <div class="screen dark">
      <div class="title-main">Progress</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
        <div style="display:flex;background:#151515;border-radius:999px;padding:4px;font-size:12px">
          <div style="padding:8px 14px;border-radius:999px;background:#232323">Overview</div>
          <div style="padding:8px 14px;color:#a8a29e">Metrics</div>
          <button class="small-link" data-action="route" data-route="photos" style="padding:8px 14px;color:#a8a29e">Photos</button>
        </div>
        <div style="border:1px solid #2b2b2b;background:#111;color:#d6d3d1;border-radius:999px;padding:8px 12px;font-size:12px">30 Days</div>
      </div>

      ${card(`
        <div class="card-pad">
          <div style="font-weight:700">Body Composition</div>
          <div class="sub-sm" style="margin-top:4px">vs Apr 13 – May 13</div>
          <div style="display:grid;grid-template-columns:120px 1fr;gap:16px;margin-top:12px;align-items:center">
            <div class="donut"></div>
            <div style="font-size:14px;line-height:2">
              <div style="display:flex;justify-content:space-between"><span class="label-sm">Muscle Mass</span><span>+1.6 lbs</span></div>
              <div style="display:flex;justify-content:space-between"><span class="label-sm">Body Fat</span><span>-2.4%</span></div>
              <div style="display:flex;justify-content:space-between"><span class="label-sm">Weight</span><span>-2.8 lbs</span></div>
            </div>
          </div>
        </div>
      `)}

      ${card(`
        <div class="card-pad">
          <div style="font-weight:700">Measurements</div>
          <div class="sub-sm" style="margin-top:4px">vs Apr 13 – May 13</div>
          <div class="measure-list">
            ${measurements.map(([k,v]) => `<div class="measure-row"><span>${k}</span><span>${v}</span></div>`).join('')}
          </div>
        </div>
      `, false, 'mt-16')}

      <div class="two-grid" style="margin-top:16px">
        ${card(`<div class="card-pad"><div class="label-sm">Classes Completed</div><div class="big-number" style="font-size:30px;font-weight:300;margin-top:8px">9</div><div class="sub-sm">this month</div></div>`)}
        ${card(`<div class="card-pad"><div class="label-sm">Attendance Rate</div><div class="big-number" style="font-size:30px;font-weight:300;margin-top:8px">90%</div><div class="sub-sm">this month</div></div>`)}
      </div>

      ${bottomNav(false)}
    </div>
  `;
}

function therapyScreen(){
  const benefits = [
    'Reduce muscle soreness and inflammation',
    'Support cellular repair and energy',
    'Promote healthy skin and collagen',
    'Enhance recovery and overall well-being',
  ];
  return `
    <div class="screen dark">
      <button class="back-btn" data-action="route" data-route="schedule">← Back</button>
      <div style="border-radius:26px;overflow:hidden;border:1px solid #292929">
        ${imageBlock('red','Recovery',288)}
      </div>
      <div style="margin-top:20px">
        ${sectionLabel('Recovery')}
        <div class="title-main" style="font-size:36px">Red Light Therapy</div>
        <div style="font-size:14px;line-height:1.7;color:#d6d3d1;margin-top:12px">
          Non-invasive light therapy to support recovery, reduce inflammation, and promote cellular repair and performance.
        </div>
      </div>

      <div class="stats-grid" style="margin-top:20px">
        ${card(`<div class="card-pad" style="text-align:center"><div style="font-size:24px;font-weight:300">20 min</div><div class="sub-sm">Duration</div></div>`)}
        ${card(`<div class="card-pad" style="text-align:center"><div style="font-size:24px;font-weight:300">Relax</div><div class="sub-sm">Recharge</div></div>`)}
        ${card(`<div class="card-pad" style="text-align:center"><div style="font-size:24px;font-weight:300">Recovery</div><div class="sub-sm">Performance</div></div>`)}
      </div>

      ${card(`
        <div class="card-pad">
          <div style="font-weight:700">Benefits</div>
          <div class="benefits">${benefits.map(b => `<div>• ${b}</div>`).join('')}</div>
        </div>
      `, false, 'mt-16')}

      <div class="list-stack" style="margin-top:20px">
        <button class="primary-btn" data-action="toast" data-message="Booking flow would connect to your scheduling backend.">Book this session</button>
        <button class="ghost-btn" data-action="toast" data-message="This is the front-end MVP.">Learn more</button>
      </div>
    </div>
  `;
}

function photosScreen(){
  return `
    <div class="screen light" style="margin:-42px -16px -96px;padding:42px 16px 96px;background:var(--ivory-2);min-height:100%">
      <button class="back-btn" data-action="route" data-route="progress">← Back</button>
      <div class="title-main" style="color:var(--text-dark)">Progress Photos</div>
      <div class="segment three" style="margin-top:16px">
        <div class="segment-item active">Front</div>
        <div class="segment-item">Side</div>
        <div class="segment-item">Back</div>
      </div>

      <div class="photos-grid">
        ${card(`<div><div class="photo-placeholder"></div><div class="photo-label">Apr 13</div></div>`, true)}
        ${card(`<div><div class="photo-placeholder"></div><div class="photo-label">May 13</div></div>`, true)}
      </div>

      <div style="margin-top:16px">
        <button class="primary-btn" style="width:100%" data-action="toast" data-message="Photo upload would hook into device camera and storage.">Add new photos</button>
      </div>
    </div>
  `;
}

function moreScreen(){
  const items = [
    ['Membership','Elevate Membership','Renews Jun 1, 2024'],
    ['Packages','10 Recovery Sessions','8 remaining'],
    ['Messages','Coach & concierge support','Open inbox'],
  ];
  return `
    <div class="screen dark">
      <div class="title-main">My Account</div>

      ${card(`
        <div class="account-head">
          <div class="avatar">AS</div>
          <div style="flex:1">
            <div style="font-size:20px">Alexandra Smith</div>
            <div class="card-sub">Member since Jan 2024</div>
            <div style="font-size:14px;color:#d6d3d1;margin-top:8px">View profile ›</div>
          </div>
        </div>
      `, false, 'mt-16')}

      <div class="account-list">
        ${items.map(([a,b,c]) => card(`
          <div class="account-row">
            <div>
              <div class="label-sm">${a}</div>
              <div class="large">${b}</div>
              <div class="sub-sm" style="margin-top:4px">${c}</div>
            </div>
            <div class="arrow">›</div>
          </div>
        `)).join('')}
      </div>

      <div class="two-grid" style="margin-top:16px">
        <button class="ghost-btn" data-action="route" data-route="messages">Open messages</button>
        <button class="primary-btn" data-action="route" data-route="plan">Manage plan</button>
      </div>

      ${bottomNav(false)}
    </div>
  `;
}

function messagesScreen(){
  return `
    <div class="screen light" style="margin:-42px -16px -96px;padding:42px 16px 96px;background:var(--ivory-2);min-height:100%;position:relative">
      <div class="title-main" style="color:var(--text-dark)">Messages</div>

      <div class="messages-stack">
        <div class="bubble-row"><div class="bubble coach">Hi Alexandra! How did your red light therapy session feel?<div class="bubble-time">9:30 AM</div></div></div>
        <div class="bubble-row user"><div class="bubble user">It was great — my muscles feel much better today.<div class="bubble-time" style="color:#d6d3d1">9:32 AM</div></div></div>
        <div class="bubble-row"><div class="bubble coach">Amazing. Consistency is key. Let us know if you need anything.<div class="bubble-time">9:33 AM</div></div></div>
      </div>

      <div class="message-compose">
        <input placeholder="Type a message..." />
        <button class="primary-btn" style="width:40px;height:40px;border-radius:12px;padding:0" data-action="toast" data-message="Messaging backend not wired in this MVP.">→</button>
      </div>
    </div>
  `;
}

function render(){
  const map = {
    home: homeScreen,
    schedule: scheduleScreen,
    plan: planScreen,
    progress: progressScreen,
    therapy: therapyScreen,
    photos: photosScreen,
    more: moreScreen,
    messages: messagesScreen,
  };
  app.innerHTML = map[state.route]();
  app.scrollTop = 0;
}

render();
