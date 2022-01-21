import { checkMicPermission } from './micPermission';
import { checkGeoPermission } from './locationPermission';

export async function checkPermissions() {
  const micCheckResult = await checkMicPermission();
  const geoCheckResult = await checkGeoPermission();

  if (micCheckResult === 'granted' && geoCheckResult === 'granted') {
    return true;
  } else {
    return false;
  }
}
