/**
 * Load test for https://test.swebbtv.se/w/7CUMPmZz12a1kcXFoC8uK6
 *
 * Script execution scenario:
 * 1. User does this...
 * 2. User does that...
 * 3. ?
 */
import {sleep, group} from 'k6'
import http from 'k6/http'

export const options = {
  stages: [
    {duration: '4m', target: 960},
    {duration: '5m', target: 960},
    {duration: '30s', target: 0},
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'], // http errors should be less than 2%
    http_req_duration: ['p(95)<5000'], // 95% requests should be below 5s
  },
}

const maxRangeKb = 2;

const getFakeIp = () => {
  // In range 178.28.0.0 to 178.31.255.255 (262k IPs)
  const ipSegments = [
    178,
    Math.floor(28 + Math.random() * 4),
    Math.round(Math.random() * 255),
    Math.ceil(Math.random() * 255),
  ]
  const fakeIp = ipSegments.join('.')
  console.info(`Generated fake IP ${fakeIp}`)
  return fakeIp
}

const capRange = (rangeStr) => {
  if (!rangeStr.startsWith('bytes=')) {
    throw new Error(`Bad range string ${rangeStr}`)
  }

  const range = rangeStr.split('=', 2)[1]
  const [rangeStart, rangeEnd] = range.split('-', 2)
  const rangeLength = parseInt(rangeEnd) - parseInt(rangeStart)

  if (rangeLength > (maxRangeKb * 1024)) {
    const cappedRange = `bytes=${rangeStart}-${parseInt(rangeStart) + maxRangeKb * 1024}`
    console.debug(`Range of ${rangeLength} bytes exceeds max range ${maxRangeKb} kB, capped ${rangeStr} to ${cappedRange}`)
    return cappedRange
  } else {
    return rangeStr;
  }
}

export default function main() {
  const fakeIp = getFakeIp()
  let response

  group('page_4 - https://test.swebbtv.se/videos/recently-added', function () {
    response = http.get('https://test.swebbtv.se/videos/recently-added', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(1.4)

    response = http.get(
      'https://test.swebbtv.se/plugins/global.css?hash=3fbb7d512576ffe66f9e3b59ffa5228eb964b82b33f2ffc7e8755474cab6284f',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'style',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/sv-SE/runtime.bf4534bdb8a29c2a.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/polyfills.0532020c31aa9a62.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/main.f7cb91186114833e.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/styles.fdfc9b6186f91c54.css', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'text/css,*/*;q=0.1',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'style',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/sbbi/?sbbpg=sbbShell&gprid=Gh', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'iframe',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'upgrade-insecure-requests': '1',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/client/sv-SE/SourceSans3VF-Roman.ttf.1befb5b37992491d.woff2',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'font',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(5.2)

    response = http.get(
      'https://test.swebbtv.se/plugins/social-sharing-ptv3/0.7.3/client-scripts/dist/common-client-plugin.js',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/plugins/google-analytics/0.1.1/client-scripts/dist/common-client-plugin.js',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/plugins/custom-pages/0.0.4/client-scripts/dist/common-client-plugin.js',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/plugins/tv-streaming/1.1.5/client-scripts/dist/common-client-plugin.js',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/plugins/hide-publish-button/0.0.3/client-scripts/dist/common-client-plugin.js',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/plugins/sentry/1.2.0/client-scripts/dist/common-client-plugin.js',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/api/v1/oauth-clients/local', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-mod-sbb-ctype': 'xhr',
      },
    })

    response = http.get('https://test.swebbtv.se/api/v1/config/', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-mod-sbb-ctype': 'xhr',
      },
    })

    response = http.get('https://test.swebbtv.se/client/locales/sv-SE/server.json', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-mod-sbb-ctype': 'xhr',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/6884.fa16446400bb0e9e.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/3003.88b61dcd01443e56.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/9237.a702703e55a78d74.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/785.5bc4beb83073e784.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/1504.09b9bc7182cfce44.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/3857.47bc5e3d1b924c06.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://om.swebbtv.se/images/contact_icons_swish.png', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
      },
    })

    response = http.get('https://om.swebbtv.se/images/contact_icons_bankgiro2.png', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/menu.f95723082925e997.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/client/assets/images/logo.svg?48ab51a5835f1b1e8547904de5538a230f2e9cba',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.6)

    response = http.get(
      'https://test.swebbtv.se/api/v1/plugins/peertube-plugin-custom-pages/public-settings',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/plugins/peertube-plugin-google-analytics/public-settings',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/api/v1/videos/languages', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-mod-sbb-ctype': 'xhr',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/api/v1/plugins/peertube-plugin-sentry/public-settings',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/api/v1/videos/categories', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-mod-sbb-ctype': 'xhr',
      },
    })

    response = http.get('https://cdn-test.swebbtv.se/artifacts/nyhetspuff-pa-peertube_2023.png', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/manifest.webmanifest?e0cc29bf3b6fa5dc0698cf239d75c0cb0ab94c33',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'manifest',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/client/assets/images/favicon.png?4e1fca18013403ef9d0f6bebb0cdfeb003f5a233',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/assets/images/icons/icon-144x144.png', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos?start=0&count=25&sort=-publishedAt&skipCount=true&nsfw=false',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )
    sleep(4.7)

    response = http.get('https://test.swebbtv.se/client/sv-SE/2030.ac0d5f91fc6bf708.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/common.74416e55e7d6c2da.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/9325.582c013f69d4b2c5.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(2.5)

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/4f4ea98c-6d97-4706-b45e-7dd45efc69df.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/c63c8ec3-4fce-4c6c-955f-098fd0e8a13b.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/13744864-881e-42c2-b163-153088a29ce4.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/26490001-0991-475c-bc46-e82bd54477f6.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/37e10322-8204-49de-8d9b-d53b4c3f2ade.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/bf92c189-5290-4d8c-b1fe-34e2e33e3f90.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/df67f169-3073-4767-ae26-acdaaa5c32b0.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/8383d357-a837-4066-bc3f-0e7e7fe0069c.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/a4fb4902-34c8-44d1-93f6-97eae7c34522.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/48a87808-79b0-4a65-abe2-52744fcdbd68.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/de336b83-8c41-4955-8771-83f6f5de9e73.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/058dee00-5ea3-46fd-b7d1-65b5b510d87d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/267cbe48-cdf4-41e2-9173-2120a6a64b88.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/76dd8ab5-ae4a-425a-80f9-da998bf820c0.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/595d15c0-8348-41c9-a931-74b45ffee53d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.7)

    response = http.get('https://test.swebbtv.se/api/v1/videos/7CUMPmZz12a1kcXFoC8uK6/captions', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        baggage:
          'sentry-environment=test,sentry-release=5.1.0-c4,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=f116f54897de4361a201cbcdfdde7741,sentry-sample_rate=0.1',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sentry-trace': 'f116f54897de4361a201cbcdfdde7741-97797c975ea25291-0',
        'x-mod-sbb-ctype': 'xhr',
      },
    })

    response = http.get('https://test.swebbtv.se/api/v1/videos/7CUMPmZz12a1kcXFoC8uK6', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        baggage:
          'sentry-environment=test,sentry-release=5.1.0-c4,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=f116f54897de4361a201cbcdfdde7741,sentry-sample_rate=0.1',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sentry-trace': 'f116f54897de4361a201cbcdfdde7741-801b17d4fa37a73e-0',
        'x-mod-sbb-ctype': 'xhr',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/8462.5d434e4c1e3b47a7.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/api/v1/videos?start=0&count=6&sort=-createdAt', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        baggage:
          'sentry-environment=test,sentry-release=5.1.0-c4,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=f116f54897de4361a201cbcdfdde7741,sentry-sample_rate=0.1',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sentry-trace': 'f116f54897de4361a201cbcdfdde7741-96dc0b744f746ee8-0',
        'x-mod-sbb-ctype': 'xhr',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads?start=0&count=10&sort=-createdAt',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          baggage:
            'sentry-environment=test,sentry-release=5.1.0-c4,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=f116f54897de4361a201cbcdfdde7741,sentry-sample_rate=0.1',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sentry-trace': 'f116f54897de4361a201cbcdfdde7741-b7d50fffe17f5138-0',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/sv-SE/1582.3f566b6f0f61a4bf.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/2857.2b0edcf615bcebb5.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/1513.90baa2f04abc84c6.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/7195.5dd12268a8f147b2.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/cf1af4f9-8c31-421e-8142-5adced756bb2.png',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/client/assets/images/default-avatar-account-48x48.png',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/locales/sv-SE/player.json', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-mod-sbb-ctype': 'fetch',
      },
    })
    sleep(2.5)

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/c63c8ec3-4fce-4c6c-955f-098fd0e8a13b.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/13744864-881e-42c2-b163-153088a29ce4.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/26490001-0991-475c-bc46-e82bd54477f6.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/37e10322-8204-49de-8d9b-d53b4c3f2ade.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/static/thumbnails/bf92c189-5290-4d8c-b1fe-34e2e33e3f90.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/sv-SE/8487.f2ea22740581f3d2.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(3.4)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/553aa6e7-cc51-4621-8027-b7b7d3f7f457-segments-sha256.json',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/plugins/peertube-plugin-tv-streaming/public-settings',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/sv-SE/1833.5c7417ca4aeff5f5.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/9295.4fa5a02fab9c8f5f.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/6128.13b9b5b164eaf12e.js', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/lazy-static/previews/96108bff-8dde-4cf6-8a6d-868c26e4f2d9.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/2c75f34f-2b48-45c9-ac98-f73e8201b736-master.m3u8',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/sv-SE/tick-white.187d1b0dd21cc9be.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/next.7bb9b7a43970af24.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/volume.692d1a4732bbd64c.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/settings.14a35d6d75021030.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/theater.081bb7ad623ac50e.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/fullscreen.4d03daadc155d983.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":0}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080.m3u8',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=0-1350'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=1351-1972548'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    // response = http.get('wss://test.swebbtv.se/tracker/socket', {
    //   headers: {
    //     Origin: 'https://test.swebbtv.se',
    //     'Accept-Encoding': 'gzip, deflate, br',
    //     Host: 'test.swebbtv.se',
    //     'Accept-Language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
    //     'Sec-WebSocket-Key': 'E2iHz63WZVXxowSkTLKcBQ==',
    //     Upgrade: 'websocket',
    //     'Cache-Control': 'no-cache',
    //     Connection: 'Upgrade',
    //     'Sec-WebSocket-Version': '13',
    //     'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
    //   },
    // })

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=1972549-3101151'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/assets/images/icons/icon-192x192.png', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=3101152-3898478'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=3898479-4822070'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get('https://test.swebbtv.se/client/sv-SE/arrow-down.2bc5ce570c261fdc.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://test.swebbtv.se/client/sv-SE/arrow-up.ae0008f6eb19c5da.svg', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(4)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":4}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.7)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=4822071-5568563'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(3.4)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=5568564-6318274'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(0.9)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":9}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.2)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads?start=10&count=10&sort=-createdAt',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.6)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads?start=20&count=10&sort=-createdAt',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads?start=30&count=10&sort=-createdAt',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads?start=40&count=10&sort=-createdAt',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=6318275-7125414'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(2)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/80',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":14}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post('https://test.swebbtv.se/api/v1/metrics/playback', '{"resolution":1080,"fps":25,"playerMode":"p2p-media-loader","resolutionChanges":1,"errors":0,"downloadedBytesP2P":0,"downloadedBytesHTTP":7124064,"uploadedBytesP2P":0,"videoId":"35be2400-ca65-4c5a-9185-abd88361e90b"}', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(1.6)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=7125415-7850231'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(3)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/85',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":19}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.6)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/88',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=7850232-8639079'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.8)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/90',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.3)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/93',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.6)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/94',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.8)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=8639080-9415980'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/95',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":24}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(2.1)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/97',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.7)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/98',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.5)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=9415981-10960198'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/99',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.9)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/101',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":29}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post('https://test.swebbtv.se/api/v1/metrics/playback', '{"resolution":1080,"fps":25,"playerMode":"p2p-media-loader","resolutionChanges":0,"errors":0,"downloadedBytesP2P":0,"downloadedBytesHTTP":3834784,"uploadedBytesP2P":0,"videoId":"35be2400-ca65-4c5a-9185-abd88361e90b"}', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(1.5)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/104',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.6)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/105',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=10960199-12314262'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/106',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.4)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/108',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":34}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/109',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.2)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=12314263-13713235'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/110',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.1)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/111',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.9)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":39}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.6)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/46874036-5193-4849-bb37-4c3ccd6c4b64-1080-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=13713236-15116414'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(4.4)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":44}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post('https://test.swebbtv.se/api/v1/metrics/playback', '{"resolution":1080,"fps":25,"playerMode":"p2p-media-loader","resolutionChanges":0,"errors":0,"downloadedBytesP2P":0,"downloadedBytesHTTP":4156216,"uploadedBytesP2P":0,"videoId":"35be2400-ca65-4c5a-9185-abd88361e90b"}', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(0.7)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720.m3u8',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=0-1349'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=6108558-7152678'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=7152679-8253980'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=8253981-9283042'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=9283043-10289039'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=10289040-10998787'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(3.1)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":48}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.5)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=10998788-11573571'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(4)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=11573572-11881315'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(0.5)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":53}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.8)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/c1761d3a-8678-4afc-b7e9-617b2b6f2aec-480.m3u8',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/c1761d3a-8678-4afc-b7e9-617b2b6f2aec-480-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=0-1353'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/c1761d3a-8678-4afc-b7e9-617b2b6f2aec-480-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=6259638-6901777'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/c1761d3a-8678-4afc-b7e9-617b2b6f2aec-480-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=6901778-7284124'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/c1761d3a-8678-4afc-b7e9-617b2b6f2aec-480-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=7284125-7672080'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/c1761d3a-8678-4afc-b7e9-617b2b6f2aec-480-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=7672081-7881694'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(1.9)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/c1761d3a-8678-4afc-b7e9-617b2b6f2aec-480-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=7881695-8203761'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(1)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":58}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post('https://test.swebbtv.se/api/v1/metrics/playback', '{"resolution":480,"fps":25,"playerMode":"p2p-media-loader","resolutionChanges":2,"errors":0,"downloadedBytesP2P":0,"downloadedBytesHTTP":7716882,"uploadedBytesP2P":0,"videoId":"35be2400-ca65-4c5a-9185-abd88361e90b"}', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(2.9)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/c1761d3a-8678-4afc-b7e9-617b2b6f2aec-480-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=8203762-8487114'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(2.1)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":63}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360.m3u8',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=0-1349'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=5840900-6160557'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=6160558-6328042'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=6328043-6589198'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=6589199-6821360'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(1.5)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=6821361-7097038'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(2.5)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=7097039-7350900'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(0.5)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":68}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(3.5)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/1ce96df8-f5e6-400a-af9c-4ba499dc1f51-360-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=7350901-7618098'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/beb17635-0357-4032-8619-2dbb36489fa1-240.m3u8',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/beb17635-0357-4032-8619-2dbb36489fa1-240-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=0-1353'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/beb17635-0357-4032-8619-2dbb36489fa1-240-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=4921255-5117694'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/beb17635-0357-4032-8619-2dbb36489fa1-240-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=5117695-5345016'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/beb17635-0357-4032-8619-2dbb36489fa1-240-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=5345017-5557988'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/beb17635-0357-4032-8619-2dbb36489fa1-240-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=5557989-5779814'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(1.2)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":73}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post('https://test.swebbtv.se/api/v1/metrics/playback', '{"resolution":240,"fps":25,"playerMode":"p2p-media-loader","resolutionChanges":2,"errors":0,"downloadedBytesP2P":0,"downloadedBytesHTTP":2919112,"uploadedBytesP2P":0,"videoId":"35be2400-ca65-4c5a-9185-abd88361e90b"}', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(2.4)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/beb17635-0357-4032-8619-2dbb36489fa1-240-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=5779815-5971939'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(2.6)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":78}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.4)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/beb17635-0357-4032-8619-2dbb36489fa1-240-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=5971940-6155408'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(3.2)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=13254940-13690303'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=13690304-14158092'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=14158093-14533787'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=14533788-14833948'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":83}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=14833949-15229103'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(4)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=15229104-15705202'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(0.6)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":88}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post('https://test.swebbtv.se/api/v1/metrics/playback', '{"resolution":720,"fps":25,"playerMode":"p2p-media-loader","resolutionChanges":1,"errors":0,"downloadedBytesP2P":0,"downloadedBytesHTTP":2825857,"uploadedBytesP2P":0,"videoId":"35be2400-ca65-4c5a-9185-abd88361e90b"}', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/129',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/127',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.6)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/126',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=15705203-16256750'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(1.8)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":93}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.3)

    response = http.get(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/comment-threads/115',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-mod-sbb-ctype': 'xhr',
        },
      }
    )

    response = http.get(
      'https://test.swebbtv.se/lazy-static/avatars/40aec282-8c0b-4925-9b7f-1192fcac124d.jpg',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.8)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=16256751-16676149'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(2.8)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":98}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(1.1)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=16676150-17075386'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(3.9)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":103}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post('https://test.swebbtv.se/api/v1/metrics/playback', '{"resolution":720,"fps":25,"playerMode":"p2p-media-loader","resolutionChanges":0,"errors":0,"downloadedBytesP2P":0,"downloadedBytesHTTP":1370184,"uploadedBytesP2P":0,"videoId":"35be2400-ca65-4c5a-9185-abd88361e90b"}', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(1)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=17075387-17450086'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(4)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":108}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(0.9)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=17450087-18124357'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(4)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=18124358-19045746'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":113}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    sleep(3.9)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=19045747-19754347'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(1.1)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":118}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.post('https://test.swebbtv.se/api/v1/metrics/playback', '{"resolution":720,"fps":25,"playerMode":"p2p-media-loader","resolutionChanges":0,"errors":0,"downloadedBytesP2P":0,"downloadedBytesHTTP":2678961,"uploadedBytesP2P":0,"videoId":"35be2400-ca65-4c5a-9185-abd88361e90b"}', {
      headers: {
        'x-forwarded-for': fakeIp,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        origin: 'https://test.swebbtv.se',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(2.9)

    response = http.get(
      'https://cdn-test.swebbtv.se/streaming-playlists-native/hls/35be2400-ca65-4c5a-9185-abd88361e90b/7a5b0bf7-c1ce-4c5c-b916-ecd1a527738c-720-fragmented.mp4',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'identity',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          origin: 'https://test.swebbtv.se',
          range: capRange('bytes=19754348-20285876'),
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(2.1)

    response = http.post(
      'https://test.swebbtv.se/api/v1/videos/35be2400-ca65-4c5a-9185-abd88361e90b/views',
      '{"currentTime":123}',
      {
        headers: {
          'x-forwarded-for': fakeIp,
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          origin: 'https://test.swebbtv.se',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
  })
}
