export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then((res) => {
      try {
        return res.json();
      } catch (err) {
        return err;
      }
    })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    } else {
      return;
    }

  })
}
