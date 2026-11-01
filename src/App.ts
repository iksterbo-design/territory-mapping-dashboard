import * as data from './data/mock';
import { AppShell, Card, Badge, Stat } from './components/ui';
const members = data.Member as any[];
const worship = data.Worship as any[];
const queue = data.SongQueue as any[];

export function App(): HTMLElement {
  const root = document.createElement('div');
  root.className = 'tw-flex tw-flex-col tw-gap-4';
  const contrib = { count: 0 };
  const stats = [
    ['Family members', members.length.toString()],
    ['Active gatherings', worship.length.toString()],
    ['Song queue items', queue.length.toString()],
  ];
  const statsHtml = stats.map((s) =>
    '<Card title="' + s[0] + '"><div class="tw-text-2xl tw-font-bold tw-text-slate-800 dark:tw-text-white">' + s[1] + '</div><div class="tw-text-xs tw-text-slate-500"></div></Card>').join('');
  const memberBox = document.getElementById('members') as HTMLElement;
  memberBox.innerHTML = members.map((m: any) =>
    '<div class="tw-flex tw-items-center tw-gap-2 tw-border tw-border-slate-200 twrounded-md tw-px-3 tw-py-2 tw-bg-white tw-shadow-sm">' +
      '<span class="tw-text-sm tw-font-semibold tw-text-slate-800 dark:tw-text-white">' + m.name + '</span>' +
      '<span class="tw-text-xs tw-text-slate-500">' + m.role + '</span>' +
      '<span class="tw-text-xs tw-text-slate-500">' + m.contributions + ' contrib</span>' +
      '<button class="tw-bg-violet-500 tw-text-white tw-rounded-md tw-px-2 tw-py-1 tw-text-xs add-cont">+1</button>' +
    '</div>').join('');
  memberBox.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button.add-cont');
    if (btn) {
      btn.textContent = '++1';
      contrib.count += 1;
      const s = document.getElementById('stat-contrib');
      if (s) { s.textContent = String(contrib.count); }
    }
  });
  const worshipHtml = worship.map((w: any) =>
    '<div class="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1.5 tw-border-b tw-border-slate-100 tw-text-sm">' +
      '<span class="tw-font-medium tw-text-slate-700 dark:tw-text-white">' + w.song + '</span>' +
      '<span class="tw-text-xs tw-text-slate-500">' + w.leader + '</span>' +
      '<span class="tw-text-xs tw-text-slate-500">' + w.tempo + ' bpm</span>' +
    '</div>').join('');
  const queueHtml = queue.map((q: any) =>
    '<div class="tw-flex tw-items-center tw-gap-3 tw-px-2 tw-py-1.5 tw-border-b tw-border-slate-100 tw-text-sm">' +
      '<span class="tw-text-xs tw-text-slate-500">' + q.song + '</span>' +
      '<span class="tw-text-xs tw-text-slate-500 tw-w-20">' + q.church + '</span>' +
      '<button class="tw-bg-slate-200 tw-text-slate-700 tw-rounded-md tw-px-2 tw-py-1 tw-text-xs play-q">Play</button>' +
    '</div>').join('');
  const playBox = document.getElementById('queue') as HTMLElement;
  playBox.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button.play-q');
    if (btn) { btn.classList.add('tw-bg-emerald-500'); }
  });
  const flow = [['Opening prayer', '0:00'], ['Worship songs', '0:20'], ['Scripture reading', '0:40'], ['Offering', '0:55'], ['Prayer & blessing', '1:05']];
  const flowHtml = flow.map(([t, d]) =>
    '<div class="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-slate-600"><span class="tw-h-2 tw-w-2 tw-rounded-full tw-bg-violet-500"></span>' + t + '<span class="tw-text-xs tw-text-slate-400">' + d + '</span></div>').join('');
  root.innerHTML = `
    <div id="clock" class="tw-text-xs tw-text-right tw-text-slate-400"></div>
    <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-4">
      <div class="lg:tw-span-2">
        <div class="tw-flex tw-items-center tw-gap-3 tw-mb-3 tw-text-sm tw-text-slate-600">
          <span class="tw-font-semibold tw-text-slate-800 dark:tw-text-white">Total moves</span>
          <span id="stat-contrib" class="tw-text-lg tw-font-bold tw-text-violet-600 dark:tw-text-violet-400">0</span>
        </div>
        <div class="tw-grid tw-grid-cols-1 tw-gap-3">${statsHtml}</div>
        <Card title="Worship Service Flow" desc="Family worship service timeline">
          <div class="tw-mt-3">${flowHtml}</div>
        </Card>
      </div>
      <div class="lg:tw-w-80">
        <Card title="Worship Songs" desc="Song queue">
          <div id="queue" class="tw-max-h-48 tw-overflow-y-auto tw-text-sm tw-space-y-1">${queueHtml}</div>
        </Card>
        <Card title="Family Roster" desc="Contributions on stage">
          <div id="members" class="tw-max-h-40 tw-overflow-y-auto tw-text-sm tw-space-y-1"></div>
        </Card>
      </div>
    </div>
  `;
  setInterval(() => { const d = new Date(); document.getElementById('clock')!.textContent = d.toLocaleTimeString(); }, 1000);
  return root;
}
