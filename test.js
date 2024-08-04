import { group } from 'k6';
import getUser from './Scripts/api/getUser.js';
import getNameFromId from './Scripts/api/getNameFromId.js';
// Import other test scripts as needed

// export const options = {
//   stages: [
//       { duration: "30s", target: 10 }, // Ramp up to 10 VUs over 30 seconds
//       { duration: "1m", target: 10 },  // Stay at 10 VUs for 1 minute
//       { duration: "30s", target: 0 },  // Ramp down to 0 VUs over 30 seconds
//   ],
// };

export default function () {
  group('API Tests', function () {
    
    group('GetUser API', getUser);
    // group('GetNameFromIds API', getNameFromId);
    
  });
}
