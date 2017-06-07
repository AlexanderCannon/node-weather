const getUser = (id, callback) => {
  let user= {
    id,
    name: 'Johnsoon'
  }
  setTimeout(()=> {
     callback(user);
  }, 2000);
};

getUser(1, (user)=> {
  console.log(user);
});