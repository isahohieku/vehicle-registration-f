
const setToken = (data) => {
  localStorage.setItem('token', data);
}

const setUserData = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
}

const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
}

const getUserData = () => {
  return JSON.parse(localStorage.getItem('user'));
}

const emailValidator = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const numberValidator = (number) => {
  const re = /[+-]?([0-9]*[.])?[0-9]+/;
  return re.test(String(number))
}

export { setToken, getToken, setUserData, getUserData, emailValidator, numberValidator }