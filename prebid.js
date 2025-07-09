/**
 * Prebid.js integration hosted via GitHub
 * - Supports buvis_lt_300x600_sidebar_1 and _2
 * - Shared SSP config
 * - Detects divs on page
 * - Renders ads dynamically
 */

var pbjs = window.pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];

const allAdUnits = [
  'buvis_lt_300x600_sidebar_1',
  'buvis_lt_300x600_sidebar_2'
];

function getPresentAdUnits() {
  return allAdUnits.filter(unitCode => document.getElementById(unitCode));
}

function buildAdUnit(code) {
  return {
    code: code,
    mediaTypes: {
      banner: { sizes: [[300, 600]] }
    },
    bids: [
      { bidder: 'adform', params: { mid: 1827042 } },
      { bidder: 'smartadserver', params: {
          domain: 'prg.smartadserver.com',
          siteId: 644690,
          pageId: 1947881,
          formatId: 85325
      } },
      { bidder: 'openx', params: {
          delDomain: 'setupad-d.openx.net',
          unit: '560637348'
      } },
      { bidder: 'luponmedia', params: {
          siteId: '13698',
          keyId: 'uid_buvislt-sa'
      } },
      { bidder: 'adaptmx', params: {
          tagId: 'c2V0dXBhZC1yb24udmVydGljYWwuYnV2aXMubHQ'
      } },
      { bidder: 'rtbhouse', params: {
          region: 'prebid-eu',
          publisherId: 'd2380d6f45eaac2c7d22'
      } }
    ]
  };
}

pbjs.que.push(function () {
  const activeAdUnits = getPresentAdUnits().map(buildAdUnit);
  if (activeAdUnits.length === 0) return;

  pbjs.setConfig({
    debug: true,
    bidderTimeout: 1500,
    currency: {
      adServerCurrency: 'EUR',
      defaultRates: { EUR: { EUR: 1 } }
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

  setupGA4Tracking();
  pbjs.addAdUnits(activeAdUnits);

  pbjs.requestBids({
    adUnits: activeAdUnits,
    bidsBackHandler: function () {
      activeAdUnits.forEach(unit => {
        const winningBid = pbjs.getHighestCpmBids(unit.code)[0];
        if (winningBid) renderAd(unit.code, winningBid.adId);
      });
    }
  });
});

function renderAd(divId, adId) {
  const container = document.getElementById(divId);
  if (!container) return;

  const iframe = document.createElement('iframe');
  iframe.width = 300;
  iframe.height = 600;
  iframe.style.border = 'none';
  iframe.scrolling = 'no';
  iframe.id = `${divId}_iframe`;

  container.innerHTML = '';
  container.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><body style='margin:0;padding:0;'><div id="ad-slot"></div></body></html>`);
  doc.close();

  pbjs.renderAd(doc, adId);
}

function setupGA4Tracking() {
  pbjs.onEvent('bidResponse', function (bid) {
    gtag('event', 'bid_response', {
      bidder: bid.bidder,
      cpm: bid.cpm,
      currency: bid.currency,
      adUnitCode: bid.adUnitCode,
      responseTime: bid.timeToRespond
    });
  });

  pbjs.onEvent('bidWon', function (bid) {
    gtag('event', 'bid_won', {
      bidder: bid.bidder,
      cpm: bid.cpm,
      adUnitCode: bid.adUnitCode
    });
  });

  pbjs.onEvent('bidTimeout', function (bidders) {
    bidders.forEach(function (b) {
      gtag('event', 'bid_timeout', {
        bidder: b.bidder
      });
    });
  });

  pbjs.onEvent('auctionEnd', function (data) {
    gtag('event', 'auction_end', {
      timestamp: Date.now(),
      adUnits: data.length
    });
  });
}
