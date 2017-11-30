export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';

export function SaveAccessToken(accessToken) {
    return {type: SAVE_ACCESS_TOKEN, accessToken}
}