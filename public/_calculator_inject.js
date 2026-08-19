(function(){
  function ensureAnalytics() {
    try {
      if (!document.querySelector('script[src*="/_vercel/insights/script.js"]')) {
        var vaScript = document.createElement('script');
        vaScript.src = '/_vercel/insights/script.js';
        vaScript.defer = true;
        document.head.appendChild(vaScript);
      }
      if (!document.querySelector('script[src*="/_vercel/speed-insights/script.js"]')) {
        var siScript = document.createElement('script');
        siScript.src = '/_vercel/speed-insights/script.js';
        siScript.defer = true;
        document.head.appendChild(siScript);
      }
    } catch (e) {
      console.error('analytics-inject error', e);
    }
  }

  function ensureCalculator() {
    try {
      // Desktop nav
      var nav = document.querySelector('nav[aria-label="Primary"]');
      if (nav && !nav.querySelector('a[href="/calculator"]')) {
        var ref = nav.querySelector('a[href="/msp-lead-generation"]') || nav.querySelector('a');
        var a = document.createElement('a');
        a.href = '/calculator';
        a.textContent = 'Calculator';
        a.setAttribute('data-injected','1');
        a.className = 'text-[0.95rem] transition text-neutral-600 hover:text-neutral-950';
        if (ref) nav.insertBefore(a, ref);
        else nav.appendChild(a);
      }
      // Mobile nav
      var mnav = document.querySelector('nav[aria-label="Mobile"]');
      if (mnav && !mnav.querySelector('a[href="/calculator"]')) {
        var a2 = document.createElement('a');
        a2.href = '/calculator';
        a2.textContent = 'Calculator';
        a2.setAttribute('data-injected','1');
        a2.className = 'rounded-lg px-3 py-3 text-base font-medium text-brand-700 hover:bg-brand-50';
        // insert after services list
        var servicesHeader = Array.from(mnav.querySelectorAll('div, h2')).find(function(n){
          return n.textContent && n.textContent.trim().toLowerCase().includes('noc services');
        });
        if (servicesHeader && servicesHeader.nextSibling) mnav.insertBefore(a2, servicesHeader.nextSibling);
        else mnav.appendChild(a2);
      }
    } catch (e) {
      console.error('calculator-inject error', e);
    }
  }

  function createModal() {
    if (document.getElementById('calc-modal-root')) return;
    var root = document.createElement('div');
    root.id = 'calc-modal-root';
    root.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:99999;padding:24px;backdrop-filter:blur(4px);background:rgba(7,18,32,0.45)';

    var container = document.createElement('div');
    container.style.cssText = 'width:100%;max-width:1100px;height:80vh;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 20px 50px rgba(11,37,69,0.4);position:relative;';

    var close = document.createElement('button');
    close.innerText = '×';
    close.setAttribute('aria-label','Close calculator');
    close.style.cssText = 'position:absolute;right:14px;top:10px;z-index:2;background:transparent;border:0;font-size:28px;color:#0b2545;cursor:pointer';
    close.addEventListener('click', hideModal);

    var iframe = document.createElement('iframe');
    iframe.id = 'calc-iframe';
    iframe.src = '';
    iframe.style.cssText = 'width:100%;height:100%;border:0;display:block;';

    container.appendChild(close);
    container.appendChild(iframe);
    root.appendChild(container);
    document.body.appendChild(root);

    // close on escape
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') hideModal(); });
    root.addEventListener('click', function(e){ if (e.target === root) hideModal(); });
  }

  function showModal() {
    createModal();
    var root = document.getElementById('calc-modal-root');
    var iframe = document.getElementById('calc-iframe');
    if (iframe) { iframe.src = '/calculator/index.html'; }
    if (root) root.style.display = 'flex';
  }
  function hideModal() {
    var root = document.getElementById('calc-modal-root');
    var iframe = document.getElementById('calc-iframe');
    if (iframe) { iframe.src = 'about:blank'; }
    if (root) root.style.display = 'none';
  }

  function attachHandlers() {
    // allow direct navigation to /calculator
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ ensureAnalytics(); ensureCalculator(); attachHandlers(); createModal(); });
  } else { ensureAnalytics(); ensureCalculator(); attachHandlers(); createModal(); }

  // Re-run when DOM mutates (e.g., React re-render)
  var mo = new MutationObserver(function(){ ensureCalculator(); });
  mo.observe(document.body, { childList: true, subtree: true });
})();
