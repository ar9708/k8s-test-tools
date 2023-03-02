// Creator: k6 Browser Recorder 0.6.2

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  stages: [
    { duration: '20m', target: 1000 },
    { duration: '20m', target: 1000 },
    { duration: '10m', target: 100 },
    { duration: '5m', target: 60 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'], // http errors should be less than 2%
    http_req_duration: ['p(95)<5000'], // 95% requests should be below 5s
  },
}

export default function main() {
  let response

  group('page_1 - https://swebbtv.se/videos/recently-added', function () {
    response = http.get('https://swebbtv.se/api/v1/videos/g8J47ZZStRQB9A4otWiHo1/captions', {
      headers: {
        accept: 'application/json, text/plain, */*',
        baggage:
          'sentry-environment=production,sentry-release=4.3.1-c3,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=09ae9ef7db454907a4c2f70e36970f48,sentry-sample_rate=0',
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '09ae9ef7db454907a4c2f70e36970f48-8fc1a0c2ebfb163b-0',
      },
    })
    response = http.get('https://swebbtv.se/api/v1/videos/g8J47ZZStRQB9A4otWiHo1', {
      headers: {
        accept: 'application/json, text/plain, */*',
        baggage:
          'sentry-environment=production,sentry-release=4.3.1-c3,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=09ae9ef7db454907a4c2f70e36970f48,sentry-sample_rate=0',
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '09ae9ef7db454907a4c2f70e36970f48-b50ddfcf096b2f3c-0',
      },
    })
    response = http.get(
      'https://swebbtv.se/client/assets/images/favicon.png?06bbba4515eb59854e43fca8805ef2703cb8ed7d',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(0.6)
    response = http.get('https://swebbtv.se/api/v1/videos?start=0&count=6&sort=-createdAt', {
      headers: {
        accept: 'application/json, text/plain, */*',
        baggage:
          'sentry-environment=production,sentry-release=4.3.1-c3,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=09ae9ef7db454907a4c2f70e36970f48,sentry-sample_rate=0',
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '09ae9ef7db454907a4c2f70e36970f48-b4587901393f5b7d-0',
      },
    })
    response = http.get(
      'https://swebbtv.se/api/v1/videos/7a8d33ef-2819-4486-a0a8-b78d27733ca8/comment-threads?start=0&count=10&sort=-createdAt',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          baggage:
            'sentry-environment=production,sentry-release=4.3.1-c3,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=09ae9ef7db454907a4c2f70e36970f48,sentry-sample_rate=0',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '09ae9ef7db454907a4c2f70e36970f48-9bb79321657d68bb-0',
        },
      }
    )
    response = http.get(
      'https://swebbtv.se/api/v1/plugins/peertube-plugin-tv-streaming/public-settings',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          baggage:
            'sentry-environment=production,sentry-release=4.3.1-c3,sentry-public_key=02f15a9225124d5c853f4e8f2a62008e,sentry-trace_id=09ae9ef7db454907a4c2f70e36970f48,sentry-sample_rate=0',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '09ae9ef7db454907a4c2f70e36970f48-aa751efcf5179a03-0',
        },
      }
    )
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/101cfc14-22dc-46a3-aed4-459d8748717b-segments-sha256.json',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://swebbtv.se/lazy-static/avatars/7d7c893d-b760-4140-857d-867ec20c0c15.png',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://swebbtv.se/client/assets/images/default-avatar-account-48x48.png',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://swebbtv.se/static/thumbnails/fb93f9c8-6632-4711-972f-781cd86e22f4.jpg',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://swebbtv.se/static/thumbnails/08efa776-b69b-4d4e-9bfe-e031f655ca6d.jpg',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://swebbtv.se/static/thumbnails/86b810ea-6ab1-41ef-9260-bdc0ef653b83.jpg',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://swebbtv.se/static/thumbnails/8be0b5f9-901b-47fd-bf30-17464870c01b.jpg',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://swebbtv.se/static/thumbnails/ef0bd2a4-4f23-4264-bda8-857a0a587398.jpg',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(0.6)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/13028564-cfb8-4c99-a5c4-2f4e07d77be1-master.m3u8',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080.m3u8',
      {
        headers: {
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=0-1370',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=1371-3613659',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=3613660-5605741',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=5605742-6452808',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=6452809-7420938',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(0.5)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=7420939-8219487',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(5)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=11548364-12373092',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(2)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=9891000-10690460',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(0.9)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=8219488-9025751',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(3.6)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=9025752-9890999',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(4.5)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=18053969-19794318',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(3)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=16305727-18053968',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(0.5)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=10690461-11548363',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(1.5)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=12373093-14290799',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(10.5)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=14290800-16305726',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(1.5)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=19794319-21049436',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(15.9)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=21049437-22091039',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(4)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=22091040-22604504',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(7.1)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=27055658-27565554',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(3)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=24998673-25684357',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(36)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=33349729-34967701',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(31)
    response = http.get(
      'https://cdn.swebbtv.se/streaming-playlists-native/hls/7a8d33ef-2819-4486-a0a8-b78d27733ca8/625c0412-326a-4b14-8386-5ebf5b1c504b-1080-fragmented.mp4',
      {
        headers: {
          range: 'bytes=39543757-40000642',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
  })
}
