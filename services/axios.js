import axios from 'axios';

export const GetPlatos = async (Plato) => {
    console.log(Plato)
    return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=f876f842ee604610b4ca54f02051426a&query=${Plato}`,{})
    .then(async(res) => {
        console.log(res.data.results)
        return res.data.results   
    })
    .catch(() => {
      throw "error" 
    });
};

export const getPlatoByID = async (id) => {
    console.log(id);
    return axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=f876f842ee604610b4ca54f02051426a`,{})  
    .then(function(res){
        return res.data  
    })
    .catch(() => {
        throw "Error" 
    });
};

export const enterLogin = async (user) => {
    console.log(user)
    return axios.post(`http://challenge-react.alkemy.org`, {
        ...user
      })
      .then(() => {
        return true   
      })
      .catch(() => {
        throw "error" 
      });
  };

