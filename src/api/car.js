import api from "./api";

export default {

  getCarsByIdClient:  function(idClient) {
    return api.get(`/api/car/${idClient}`);
  },

  createCar: function (data) {
    return api.post(`/api/car/create`, data);
  },
}