import api from "./api";

export default {

  getClients:  function() {
    return api.get(`/api/client/all`);
  },

  createClient: function (data) {
    return api.post(`/api/client/create`, data);
  },
}