export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
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

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem('token', data.token);
  })
}
