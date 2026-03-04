import { cryptoList, cryptoListSidebar, cryptoLoadingSidebar, cryptoEmptySidebar } from '../dom.js';

const CACHE_KEY = 'cg_markets_v1';
const TTL = 15 * 60 * 1000; // 15 min
const MIN_LOADING_MS = 1200;

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const { ts, data } = JSON.parse(raw);
    if (!ts || !Array.isArray(data)) return null;

    return Date.now() - ts < TTL ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // ignore
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function renderMobileCrypto(listEl, data) {
  if (!listEl) return;

  listEl.innerHTML = data
    .map((d) => {
      const change = Number(d.price_change_percentage_24h ?? 0);
      const isUp = change > 0;

      return `
            <li class="crypto__list-item">
              <div class="crypto__box">
                <img src="${d.image}" alt="${d.name}" class="crypto__img" />
                <span class="crypto__coin-item">${d.name}</span>
              </div>
              <span class="crypto__symbol-item">${String(d.symbol).toUpperCase()}</span>
              <span class="crypto__price-item">$${Number(d.current_price).toFixed(2)}</span>
              <div class="crypto__change-item">
                <span class="crypto__change-amount">${change.toFixed(1)}</span>
                <span class="crypto__change-icon">
                  <i class="crypto__change-icon${isUp ? '--up' : '--down'} fa-solid fa-caret${isUp ? '-up' : '-down'}"></i>
                </span>
              </div>
            </li>
        `;
    })
    .join('');
}

function renderSidebarCrypto(listEl, data) {
  if (!listEl) return;

  listEl.innerHTML = data
    .map((d) => {
      const change = Number(d.price_change_percentage_24h ?? 0);
      const isUp = change > 0;

      return `<li class="sidebar__crypto-list-item">
            <div class="sidebar__crypto-coin">
              <img src="${d.image}" alt="${d.name}" class="sidebar__crypto-img" />
              <span class="sidebar__crypto-symbol">${String(d.symbol).toUpperCase()}</span>
            </div>
            <span class="sidebar__crypto-price">$${Number(d.current_price).toFixed(2)}</span>
            <div class="sidebar__crypto-change">
              <span class="sidebar__crypto-amount">${change.toFixed(1)}</span>
              <span class="sidebar__crypto-icon">
                <i class="sidebar__crypto-icon${isUp ? '--up' : '--down'} fa-solid fa-caret${isUp ? '-up' : '-down'}"></i>
              </span>
            </div>
          </li>`;
    })
    .join('');
}

function setSidebarState({ loading, empty }) {
  if (cryptoLoadingSidebar) cryptoLoadingSidebar.hidden = !loading;
  if (cryptoEmptySidebar) cryptoEmptySidebar.hidden = !empty;
}

export async function renderCrypto() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple&price_change_percentage=24h';

  setSidebarState({ loading: true, empty: false });

  const cached = readCache();

  if (cached) {
    setSidebarState({ loading: false, empty: false });
    renderMobileCrypto(cryptoList, cached);
    renderSidebarCrypto(cryptoListSidebar, cached);
    return;
  }

  try {
    const [response] = await Promise.all([fetch(url, { headers: { accept: 'application/json' } }), delay(MIN_LOADING_MS)]);

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data = await response.json();

    writeCache(data);

    setSidebarState({ loading: false, empty: false });
    renderMobileCrypto(cryptoList, data);
    renderSidebarCrypto(cryptoListSidebar, data);
  } catch (error) {
    console.error('Crypto fetch failed:', error);

    setSidebarState({ loading: false, empty: true });
  }
}
