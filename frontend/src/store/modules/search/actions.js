import httpService from '@/services/common/httpService';
import router from '@/router';
import LocationService from '@/services/location/locationService';
import mapSettingsService from '@/services/map/mapSettingsService';
import { KIEV_LATITUDE, KIEV_LONGITUDE } from '@/services/location/positions';

export default {
    updateStateFromQuery: ({commit, dispatch}, query) => {
        dispatch('setLoadingState', true);
        if(query.name) commit('SET_SEARCH_PLACE', query.name);
        if(query.page) commit('SET_PAGE', query.page);

        let categoryId = parseInt(query.category);

        if(query.category) {
            commit('SET_SEARCH_PLACE_CATEGORY', {id: categoryId, name: ''});
            dispatch('category/fetchCategoryTags', categoryId, {root:true});
        }
        if (query.tags) {
            let tagArray = query.tags.split(',').map(tagId => parseInt(tagId));
            commit('SET_SELECTED_TAGS', tagArray);
        }
        if (query.features) {
            let featureArray = query.features.split(',').map(featureId => parseInt(featureId));
            commit('SET_SELECTED_FEATURES', featureArray);
        }
        if(query.location) {
            let location = query.location.split(',');
            commit('SET_SEARCH_CITY', {center: location});
            commit('SET_CURRENT_POSITION', {
                latitude: location[1],
                longitude: location[0]
            });
        } else {
            return LocationService.getUserLocationData()
                .then(coordinates => {
                    let city = {center: [coordinates.lng, coordinates.lat]};
                    commit('SET_SEARCH_CITY', city);
                    commit('SET_CURRENT_POSITION', {
                        latitude: coordinates.lat,
                        longitude: coordinates.lng
                    });
                })
                .catch(() => {
                    dispatch('setLocationAvailable', false);
                    let city = {center: [KIEV_LONGITUDE, KIEV_LATITUDE]};
                    commit('SET_SEARCH_CITY', city);
                });
        }
        return Promise.resolve();
    },
    selectSearchCity: ({commit}, city) => {
        commit('SET_SEARCH_CITY', city);
    },

    selectSearchCategory: ({commit, dispatch}, item) => {
        commit('SET_SEARCH_PLACE_CATEGORY', item);
        commit('DELETE_SEARCH_PLACE');
        dispatch('category/fetchCategoryTags', item.id, {root: true});
    },

    selectSearchPlace: ({commit, dispatch}, searchPlace) => {
        commit('SET_SEARCH_PLACE', searchPlace);
        commit('DELETE_SEARCH_PLACE_CATEGORY');
        dispatch('category/deleteCategoryTags', null, {root: true});
    },

    loadCategories({context , commit}, name) {
        return httpService.get('/places/categories/search?name=' + name + '&limit=')
            .then(result => Promise.resolve(result.data.data))
            .catch(error => Promise.reject(error));
    },

    updateQueryFilters({state, dispatch}, params) {
        dispatch('setLoadingState', true);
        let location = state.currentPosition.longitude + ',' + state.currentPosition.latitude;
        let tags = state.selectedTags.join();
        let features = state.selectedFeatures.join();
        if (state.city.longitude && state.city.latitude) {
            location = state.city.longitude + ',' + state.city.latitude;
        }
        let query = {
            category: state.placeCategory && state.placeCategory.id,
            tags,
            features,
            page: state.page,
            name: state.place,
            location: location,
            ...state.filters
        };
        Object.keys(query).map((param) => { //convert bool to int, remove empty
            if (query[param] === true) {
                query[param] = 1;
            }
            if (!query[param]) {
                delete query[param];
            }
        });

        if(
            params === undefined ||
            params.redirect === undefined ||
            params.redirect !== false
        ) {
            router.push({
                name: 'SearchPlacePage',
                query
            });
        }
        dispatch('place/fetchPlaces', query, {root:true}).then(() => {
            dispatch('setLoadingState', false);
        });
    },

    setCurrentPosition: ({commit}, currentPosition) => {
        commit('SET_CURRENT_POSITION', currentPosition);
    },

    setLocationAvailable: ({commit}, locationAvailable) => {
        commit('SET_LOCATION_AVAILABLE', locationAvailable);
    },

    setLoadingState: ({commit}, isLoading) => {
        commit('SET_LOADING_STATE', isLoading);
    },

    setFilters: ({commit, dispatch}, filters) => {
        commit('SET_FILTERS', filters);
        dispatch('updateQueryFilters');
    },

    initFilters: ({commit}) => {
        let query = router.currentRoute.query;
        let filters = {
            checkin: !!query['checkin'],
            saved: !!query['saved'],
            top_rated: !!query['top_rated'],
            top_reviewed: !!query['top_reviewed'],
            recommended: !!query['recommended'],
            opened: !!query['opened']
        };

        commit('SET_FILTERS', filters);
    },

    mapInitialization: ({commit}) => {
        commit('MAP_INIT', true);
    },

    loadPlaces(context, filters) {
        return httpService.get('/places/autocomplete/search?filter[name]=' + filters.name + '&filter[polygon]=' + filters.polygon)
            .then( result => Promise.resolve(result.data.data))
            .catch( error  => Promise.reject(error));
    },

    addSelectedTag: ({commit}, tagId) => {
        commit('ADD_SELECTED_TAG', tagId);
    },

    deleteSelectedTag: ({commit}, tagId) => {
        commit('DELETE_SELECTED_TAG', tagId);
    },

    addSelectedFeature: ({commit}, featureId) => {
        commit('ADD_SELECTED_FEATURE', featureId);
    },

    deleteSelectedFeature: ({commit}, featureId) => {
        commit('DELETE_SELECTED_FEATURE', featureId);
    },

    clearSelectedTags: ({commit}) => {
        commit('CLEAR_SELECTED_TAGS');
    }
};