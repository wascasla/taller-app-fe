import api from "./api";

export default {

  getRepairsByIdCar:  function(idCar) {
    return api.get(`/api/repair/${idCar}`);
  },

  createRepair: function (data) {
    return api.post(`/api/repair/create`, data);
  },
}