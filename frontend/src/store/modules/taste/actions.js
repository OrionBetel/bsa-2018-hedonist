import httpService from '@/services/common/httpService';
import normalizerService from '@/services/common/normalizerService';

export default {
    fetchTastes: (context) => {
        return new Promise((resolve, reject) => {
            httpService.get('/tastes')
                .then(function (res) {
                    let transformedTastes = normalizerService.normalize(res.data);
                    context.commit('SET_TASTES', transformedTastes);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
        });
    },
    fetchMyTastes: (context) => {
        return new Promise((resolve, reject) => {
            httpService.get('/tastes/my')
                .then(function (res) {
                    let transformedUserTastes = normalizerService.normalize(res.data);
                    context.commit('SET_MY_TASTES', transformedUserTastes);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
        });
    },
    addMyTaste: (context, taste) => {
        return new Promise((resolve, reject) => {
            httpService.post('/tastes/my', {
                taste_id: taste.id
            })
                .then(function (res) {
                    context.commit('ADD_MY_TASTE', taste);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
        });
    },
    deleteMyTaste: (context, id) => {
        return new Promise((resolve, reject) => {
            httpService.delete('/tastes/my/' + id)
                .then(function (res) {
                    context.commit('DELETE_MY_TASTE', id);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
        });
    },
    addCustomTaste: (context, name) => {
        return new Promise((resolve, reject) => {
            httpService.post('/tastes/custom', {
                name: name
            })
                .then(function (res) {
                    let taste = res.data.data;
                    context.commit('ADD_CUSTOM_TASTE', taste);
                    resolve(taste);
                }).catch(function (err) {
                    reject(err);
                });
        });
    },
    deleteCustomTaste: (context, id) => {
        return new Promise((resolve, reject) => {
            httpService.delete('/tastes/custom/' + id)
                .then(function (res) {
                    context.commit('DELETE_CUSTOM_TASTE', id);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
        });
    },
    getTasteAutocomplete: (context, query) => {
        return new Promise((resolve, reject) => {
            httpService.get('/tastes/autocomplete?query=' + query)
                .then(function (res) {
                    resolve(res.data.data);
                }).catch(function (err) {
                    reject(err);
                });
        });
    }
};
