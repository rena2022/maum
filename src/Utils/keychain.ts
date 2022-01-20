import * as Keychain from 'react-native-keychain';

export async function saveToken(service: string, token: string) {
  await Keychain.setGenericPassword(service, token, { service });
}

export async function getToken(service: string) {
  const tokenObj: false | Keychain.UserCredentials =
    await Keychain.getGenericPassword({
      service,
    });
  if (tokenObj) return tokenObj.password;
}

export async function resetToken(service: string) {
  await Keychain.resetGenericPassword({ service });
}
