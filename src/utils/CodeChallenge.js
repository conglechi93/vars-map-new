import pkceChallenge from 'pkce-challenge'


function createChallange () {
  const challenge = pkceChallenge(128);
  return challenge;
}
 

export { createChallange };