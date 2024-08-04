import http from 'k6/http';
import { check, group, sleep } from 'k6';

// List of endpoints to test
const endpoints = [
    { name: 'GetUser', url: `${__ENV.BASE_URL}/api/Values/GetUser`, method: 'GET' },
    { name: 'GetNameFromIds', url: `${__ENV.BASE_URL}/api/Values/GetNameFromIds`, method: 'POST', payload: JSON.stringify(1) },
    // Add more endpoints as needed
];

// export const options = {
//     stages: [
//         { duration: '30s', target: 20 }, // ramp up to 20 users
//         { duration: '1m', target: 20 }, // stay at 20 users
//         { duration: '10s', target: 0 }, // scale down (optional)
//     ],
// };

export default function () {
    group('Endpoint Health Checks', function () {
        endpoints.forEach(endpoint => {
            let res;

            // Send request based on method
            if (endpoint.method === 'GET') {
                res = http.get(endpoint.url);
            } else if (endpoint.method === 'POST') {
                res = http.post(endpoint.url, endpoint.payload, { headers: { 'Content-Type': 'application/json' } });
            } else if (endpoint.method === 'PUT') {
                res = http.put(endpoint.url, endpoint.payload, { headers: { 'Content-Type': 'application/json' } });
            }

            // Check status code
            const result = check(res, {
                'status is 200': (r) => r.status === 200,
            });

            if (!result) {
                console.error(`Endpoint ${endpoint.name} failed with response: ${res.body}`);
            }
        });

        // Sleep for a while to simulate user think time
        sleep(1);
    });
}
