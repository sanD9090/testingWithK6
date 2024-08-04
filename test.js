import { group } from 'k6';
import getUser from './Scripts/api/getUser.js';
import getNameFromId from './Scripts/api/getNameFromId.js';
// Import other test scripts as needed

export default function () {
  group('API Tests', function () {
    group('GetUser API', getUser);
    group('GetNameFromIds API', getNameFromId);
    // Add groups for other APIs and call their respective test functions
    // group('GetProducts API', GetProducts);
    // group('Other API', OtherAPI);
  });
}
