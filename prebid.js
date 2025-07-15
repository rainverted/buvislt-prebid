/**
 * Prebid.js integration hosted via GitHub
 * - Shared SSP config
 * - Detects divs on page
 * - Renders ads dynamically
 */

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

const adUnits = [
  {
    code: 'buvis_lt_300x600_sidebar_1',
    mediaTypes: { banner: { sizes: [[300, 600]] } },
    bids: [
      { bidder: 'adform', params: { mid: 1827042 } },
      { bidder: 'smartadserver', params: {
        domain: 'prg.smartadserver.com', siteId: 644690, pageId: 1947881, formatId: 85325
      }},
      { bidder: 'openx', params: { delDomain: 'setupad-d.openx.net', unit: '560637348' }},
      { bidder: 'luponmedia', params: { siteId: '13698', keyId: 'uid_buvislt-sa' }},
      { bidder: 'adaptmx', params: { tagId: 'c2V0dXBhZC1yb24uY29t' }},
      { bidder: 'rtbhouse', params: { region: 'prebid-eu', publisherId: 'd2380d6f45eaac2c7d22' }}
    ]
  },
  {
    code: 'buvis_lt_300x600_sidebar_2',
    mediaTypes: { banner: { sizes: [[300, 600]] } },
    bids: [
      { bidder: 'adform', params: { mid: 2147920 } },
      { bidder: 'smartadserver', params: {
        domain: 'prg.smartadserver.com', siteId: 644690, pageId: 1947881, formatId: 85325
      }},
      { bidder: 'openx', params: { delDomain: 'setupad-d.openx.net', unit: '560637348' }},
      { bidder: 'luponmedia', params: { siteId: '13698', keyId: 'uid_buvislt-sa' }},
      { bidder: 'adaptmx', params: { tagId: 'c2V0dXBhZC1yb24uY29t' }},
      { bidder: 'rtbhouse', params: { region: 'prebid-eu', publisherId: 'd2380d6f45eaac2c7d23' }}
    ]
  },
  {
    code: 'buvis_lt_300x250_mobile_article_1',
    mediaTypes: { banner: { sizes: [[300, 250]] } },
    bids: [
      { bidder: 'adform', params: { mid: 1827044 } },
      { bidder: 'smartadserver', params: {
        domain: 'prg.smartadserver.com', siteId: 644690, pageId: 1947881, formatId: 84779
      }},
      { bidder: 'openx', params: { delDomain: 'setupad-d.openx.net', unit: '560637352' }},
      { bidder: 'luponmedia', params: { siteId: '13698', keyId: 'uid_buvislt-sa' }},
      { bidder: 'adaptmx', params: { tagId: 'c2V0dXBhZC1yb24uY29t' }},
      { bidder: 'rtbhouse', params: { region: 'prebid-eu', publisherId: 'd2380d6f45eaac2c7d24' }}
    ]
  },
  {
    code: 'buvis_lt_300x250_mobile_article_2',
    mediaTypes: { banner: { sizes: [[300, 250]] } },
    bids: [
      { bidder: 'adform', params: { mid: 2147917 } },
      { bidder: 'smartadserver', params: {
        domain: 'prg.smartadserver.com', siteId: 644690, pageId: 1947881, formatId: 84779
      }},
      { bidder: 'openx', params: { delDomain: 'setupad-d.openx.net', unit: '560637352' }},
      { bidder: 'luponmedia', params: { siteId: '13698', keyId: 'uid_buvislt-sa' }},
      { bidder: 'adaptmx', params: { tagId: 'c2V0dXBhZC1yb24uY29t' }},
      { bidder: 'rtbhouse', params: { region: 'prebid-eu', publisherId: 'd2380d6f45eaac2c7d25' }}
    ]
  },
  {
    code: 'buvis_lt_300x250_article_left_1',
    mediaTypes: { banner: { sizes: [[300, 250]] } },
    bids: [
      { bidder: 'adform', params: { mid: 2147921 } },
      { bidder: 'smartadserver', params: {
        domain: 'prg.smartadserver.com', siteId: 644690, pageId: 1947881, formatId: 84779
      }},
      { bidder: 'openx', params: { delDomain: 'setupad-d.openx.net', unit: '560637352' }},
      { bidder: 'luponmedia', params: { siteId: '13698', keyId: 'uid_buvislt-sa' }},
      { bidder: 'adaptmx', params: { tagId: 'c2V0dXBhZC1yb24uY29t' }},
      { bidder: 'rtbhouse', params: { region: 'prebid-eu', publisherId: 'd2380d6f45eaac2c7d26' }}
    ]
  },
  {
    code: 'buvis_lt_300x250_article_right_1',
    mediaTypes: { banner: { sizes: [[300, 250]] } },
    bids: [
      { bidder: 'adform', params: { mid: 2147923 } },
      { bidder: 'smartadserver', params: {
        domain: 'prg.smartadserver.com', siteId: 644690, pageId: 1947881, formatId: 84779
      }},
      { bidder: 'openx', params: { delDomain: 'setupad-d.openx.net', unit: '560637352' }},
      { bidder: 'luponmedia', params: { siteId: '13698', keyId: 'uid_buvislt-sa' }},
      { bidder: 'adaptmx', params: { tagId: 'c2V0dXBhZC1yb24uY29t' }},
      { bidder: 'rtbhouse', params: { region: 'prebid-eu', publisherId: 'd2380d6f45eaac2c7d27' }}
    ]
  }
];


// --- Config ---
pbjs.que.push(function () {
  pbjs.setConfig({
    debug: true,
    bidderTimeout: 1500,
    currency: {
      adServerCurrency: 'EUR',
      defaultRates: {
        EUR: { EUR: 1 }
      }
    },
    consentManagement: {
      gdpr: {
        cmpApi: 'iab',
        timeout: 8000,
        defaultGdprScope: true
      }
    },
    userSync: {
      iframeEnabled: true,
      userIds: [
        { name: "sharedId", params: { syncTime: 86400 } },
        { name: "id5Id", params: { partner: "your_id5_partner_id" } },
        { name: "uid2", params: { uid2Token: "" } },
        { name: "criteoId" }
      ]
    }
  });
  pbjs.addAdUnits(adUnits);

  setupGA4Tracking();
  refreshAd();

  //Refresh ads every 5 minutes automatically
  setInterval(refreshAd, 300000);
});

// --- Helper: render ad in iframe ---
function createCleanIframe(adUnitCode) {
  const container = document.getElementById(adUnitCode);
  if (!container) {
    console.warn('No container found for ad unit:', adUnitCode);
    return null;
  }

  // Remove existing iframe
  const oldIframe = container.querySelector('iframe');
  if (oldIframe) oldIframe.remove();

  const iframe = document.createElement('iframe');
  iframe.className = 'ad-frame';
  iframe.width = container.offsetWidth || 300;
  iframe.height = container.offsetHeight || 250;
  iframe.frameBorder = 0;
  iframe.scrolling = 'no';

  container.appendChild(iframe);
  return iframe;
}

function renderAdInCleanIframe(adUnitCode, adId) {
  const iframe = createCleanIframe(adUnitCode);
  if (!iframe) return;

  const doc = iframe.contentWindow.document;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        html, body {
          margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: transparent;
        }
        #ad-slot {
          width: 100%; height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="ad-slot"></div>
    </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    try {
      pbjs.renderAd(doc, adId);
      setTimeout(() => {
        const style = doc.createElement('style');
        style.innerHTML = `
          * { margin: 0 !important; padding: 0 !important; box-sizing: border-box !important; }
          body { display: flex !important; justify-content: center !important; align-items: center !important; }
          img, iframe, div { margin: 0 auto !important; display: block !important; float: none !important; }
        `;
        doc.head.appendChild(style);
      }, 200);
    } catch (e) {
      console.error("Render failed:", e);
    }
  }, 50);
}

// --- Request bids and render ---
function refreshAd() {
  pbjs.que.push(function () {
    pbjs.requestBids({
      adUnits: adUnits,
      bidsBackHandler: function () {
        adUnits.forEach(function(adUnit) {
           const bids = pbjs.getHighestCpmBids(adUnit.code);
          console.log(adUnit.code, 'bids:', bids);
          const winningBid = pbjs.getHighestCpmBids(adUnit.code)[0];
          if (winningBid) {
            renderAdInCleanIframe(adUnit.code, winningBid.adId);
            console.log(`Ad rendered for ${adUnit.code}: bidder=${winningBid.bidder}, CPM=${winningBid.cpm} ${winningBid.currency}`);
          } else {
            console.warn(`No winning bid for ad unit: ${adUnit.code}`);
          }
        });
      }
    });
  });
}

// --- GA4 Event tracking ---
function setupGA4Tracking() {
  pbjs.onEvent('bidResponse', function (bid) {
    if (typeof gtag === 'function') {
      gtag('event', 'bid_response', {
        bidder: bid.bidder,
        ad_unit: bid.adUnitCode,
        cpm: bid.cpm,
        response_time: bid.timeToRespond
      });
    }
  });

  pbjs.onEvent('bidWon', function (bid) {
    if (typeof gtag === 'function') {
      gtag('event', 'bid_won', {
        bidder: bid.bidder,
        ad_unit: bid.adUnitCode,
        cpm: bid.cpm
      });
    }
  });

  pbjs.onEvent('bidTimeout', function (bidders) {
    if (typeof gtag === 'function') {
      bidders.forEach(function (b) {
        gtag('event', 'bid_timeout', {
          bidder: b.bidder
        });
      });
    }
  });

  pbjs.onEvent('auctionEnd', function (data) {
    if (typeof gtag === 'function') {
      gtag('event', 'auction_end', {
        timestamp: Date.now(),
        adUnits: data.length
      });
    }
  });
}
