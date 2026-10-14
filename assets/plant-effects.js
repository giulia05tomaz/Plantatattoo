(() => {
  'use strict';

  const leafPath = 'M110 304C95 281 83 259 78 239C61 257 39 267 24 255C43 233 52 214 54 195C37 210 15 215 5 199C29 181 42 162 46 142C28 149 10 146 6 130C34 121 50 108 58 91C43 94 30 87 29 74C51 72 70 61 82 47C88 32 98 20 110 12C122 21 132 33 138 48C151 62 168 72 190 74C189 88 177 94 161 92C170 108 186 121 214 130C210 146 192 150 174 143C179 162 191 181 215 199C205 215 183 211 166 196C168 214 176 233 197 255C181 267 160 257 143 240C138 260 126 281 110 304Z';

  const holes = [
    [79, 91, 8, 23, -36], [63, 133, 8, 27, -53], [67, 181, 7, 24, -67],
    [141, 92, 8, 23, 36], [157, 134, 8, 27, 53], [153, 181, 7, 24, 67],
    [91, 151, 6, 17, -18], [129, 151, 6, 17, 18]
  ];

  const veins = [
    'M110 294Q109 160 110 33',
    'M108 82Q83 79 56 91', 'M108 112Q75 112 46 139',
    'M108 146Q72 151 52 190', 'M109 181Q82 198 76 235',
    'M112 82Q137 79 164 92', 'M112 112Q145 112 174 139',
    'M112 146Q148 151 168 190', 'M111 181Q138 198 144 235'
  ];

  function monsteraSvg(index) {
    const maskId = `monstera-mask-${index}`;
    const gradientId = `monstera-gradient-${index}`;
    const holeMarkup = holes.map(([cx, cy, rx, ry, angle]) =>
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${angle} ${cx} ${cy})" fill="black"/>`
    ).join('');
    const veinMarkup = veins.map(path => `<path class="monstera-vein" d="${path}"/>`).join('');

    return `<svg viewBox="0 0 220 360" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${gradientId}" x1=".08" y1=".08" x2=".9" y2=".94">
          <stop offset="0" stop-color="#85b66b"/>
          <stop offset=".46" stop-color="#3f8254"/>
          <stop offset="1" stop-color="#174d35"/>
        </linearGradient>
        <mask id="${maskId}">
          <path d="${leafPath}" fill="white"/>
          ${holeMarkup}
        </mask>
      </defs>
      <path class="monstera-stem" d="M110 292Q113 326 106 354"/>
      <rect x="0" y="0" width="220" height="310" fill="url(#${gradientId})" mask="url(#${maskId})"/>
      <g>${veinMarkup}</g>
    </svg>`;
  }

  const configs = [
    ['left', 'deep', .78, 0], ['right', 'pale', 1.08, 1],
    ['left', 'pale', .9, 2], ['right', 'deep', .68, 3],
    ['left', 'deep', 1.15, 4], ['right', 'pale', .84, 5]
  ];

  const layer = document.createElement('div');
  layer.className = 'botanical-edges';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = configs.map(([side, tone, speed], index) =>
    `<div class="botanical-leaf botanical-leaf--${side} botanical-leaf--${tone} botanical-leaf--${index + 1}" data-plant-speed="${speed}" style="--plant-phase:${index * 1.17}">
      <div class="botanical-leaf__parallax"><div class="botanical-leaf__motion">${monsteraSvg(index + 1)}</div></div>
    </div>`
  ).join('');
  document.body.appendChild(layer);

  const leaves = [...layer.querySelectorAll('.botanical-leaf')];
  requestAnimationFrame(() => requestAnimationFrame(() => {
    leaves.forEach((leaf, index) => window.setTimeout(() => leaf.classList.add('is-active'), 120 + index * 145));
  }));

  let ticking = false;
  function updatePlants() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    leaves.forEach((leaf, index) => {
      const speed = Number(leaf.dataset.plantSpeed || 1);
      const movement = Math.sin(scrollTop / 470 + index * 1.17) * 18 * speed;
      leaf.style.setProperty('--parallax-y', `${movement.toFixed(2)}px`);
    });
    ticking = false;
  }
  function requestPlantUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updatePlants);
  }

  updatePlants();
  window.addEventListener('scroll', requestPlantUpdate, { passive: true });
  window.addEventListener('resize', requestPlantUpdate, { passive: true });
})();
