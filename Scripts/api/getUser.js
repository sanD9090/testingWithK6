import http from "k6/http";
import { check, group, fail } from "k6";
import { Trend } from "k6/metrics";

// Define a trend metric to track response time
let responseTimeTrend = new Trend("response_time");

// Define the expected response keys
const expectedKeys = ["id", "name", "city"];

// Test options for load testing


export default function () {
    group("GetUser API", function () {
        let res = http.get(`${__ENV.BASE_URL}/api/Values/GetUser`);

        // Track the response time
        responseTimeTrend.add(res.timings.duration);

        // Check status code and response content
        const result = check(res, {
            "status is 200": (r) => r.status === 200,
            "response contains Id": (r) => r.json("id") === 1,
            "response contains Name": (r) => r.json("name") === "Sandeep",
            "response contains City": (r) => r.json("city") === "HYD",
            "response has no extra fields": (r) => {
                const responseKeys = Object.keys(r.json());
                return (
                    responseKeys.length === expectedKeys.length &&
                    responseKeys.every((key) => expectedKeys.includes(key))
                );
            },
            "response time is less than 500ms": (r) => r.timings.duration < 500,
        });

        // Log error if the check fails
        if (!result) {
            console.error(`Request failed with response: ${res.body}`);
            fail(`Test failed with response: ${res.body}`);
        }
    });
}
