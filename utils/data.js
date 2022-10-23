
  
  const getRandomUser = () => {
    userData[Math.floor(Math.random() * userData.length)];
  };
  
  module.exports = {
    getRandomUser,
  };
  