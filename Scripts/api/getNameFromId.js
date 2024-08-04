import http from 'k6/http';
import { check, group, sleep } from 'k6';

 

export default function () {
    group('GetNameFromIds API', function () {
        const url = `${__ENV.BASE_URL}/api/Values/GetNameFromIds`;

        const testCases = [
            { id: 1, expectedName: 'Sandeep' },
            { id: -1, expectedName: 'Lund' },
        ];

        testCases.forEach(testCase => {
            const payload = JSON.stringify(testCase.id);
            const params = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            let res = http.post(url, payload, params);

            // Check status code and response content
            const result = check(res, {
                'status is 200': (r) => r.status === 200,
                'response contains correct Name': (r) => r.json('name') === testCase.expectedName,
            });

            if (!result) {
                console.error(`Request with Id ${testCase.id} failed with response: ${res.body}`);
            }

            // Sleep for a while to simulate user think time
            sleep(1);
        });
    });
}
