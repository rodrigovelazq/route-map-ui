import http from '../../utils/http'
import polyline from "@mapbox/polyline";

const state = () => ({
    status: '',
    error: null,
    infoWindowPos: null,
    infoWinOpen: false,
    primero: true,
    recorrido: [],
    infoOptions: {
        content: '',
        pixelOffset: {
            width: 0,
            height: -35
        }
    },
    markers: []
})

const getters = {
    infoWindowPos: state => state.infoWindowPos,
    infoWinOpen: state => state.infoWinOpen,
    recorrido: state => state.recorrido,
    infoOptions: state => state.infoOptions,
    markers: state => state.markers,
}

const actions = {
    traceRoute({commit, dispatch, getters}) {
        commit('routeRequested')
        console.log(getters.markers)
        const origin = getters.markers[0].position;
        const destination = getters.markers[1].position;
        http.post('/getRoute', {origin, destination}).then(resp => {
            let {routes} = resp.data;
            let myPath = []
            for (let i = 0; i < routes.length; i++) {
                let legs = routes[i].legs;
                for (let j = 0; j < legs.length; j++) {
                    let steps = legs[j].steps;
                    for (let k = 0; k < steps.length; k++) {
                        myPath.push(...polyline.decode(steps[k].polyline.points))
                    }
                }
            }
            let recorrido = [];
            for (const val of myPath) {
                recorrido.push({lat: val[0], lng: val[1]});
            }
            commit('routeRequestedSucceeded', recorrido)
        }).catch(err => {
            dispatch('snackbar/showError', 'Ocurrio un error al momento de recuperar las Rutas', {root: true});
            commit('routeRequestedFailed', err)
        });
    },
}

const mutations = {
    routeRequestedSucceeded(state, recorrido) {
        state.status = 'mapa_route_requested_succeeded';
        state.recorrido = recorrido;
    },
    routeRequested(state) {
        state.status = 'mapa_route_requested';
    },
    routeRequestedFailed(state, error) {
        state.status = 'mapa_route_requested_failed';
        state.error = error;
    },
    addMarker(state, value) {
        state.status = 'mapa_add_marker';

        const lat = value.latLng.lat();
        const lng = value.latLng.lng();

        if (state.primero) {
            if (state.markers.length === 0) {
                state.markers = [{position:{lat, lng}, infoText: '<strong>Marker 1</strong>'}];
            } else {
                state.markers[0] = {position:{lat, lng}, infoText: '<strong>Marker 1</strong>'};
            }
        } else {
            if (state.markers.length === 1) {
                state.markers.push({position:{lat, lng}, infoText: '<strong>Marker 2</strong>'});
            } else {
                state.markers[1] = {position:{lat, lng}, infoText: '<strong>Marker 2</strong>'};
            }
        }
        state.recorrido = [];
        state.primero = !state.primero;
    },

    toggleInfoWindow(state, {marker, index}) {
        state.infoWindowPos = marker.position;
        state.infoOptions.content = marker.infoText;
        if (state.currentMidx == index) {
            state.infoWinOpen = !this.infoWinOpen;
        }
        else {
            state.infoWinOpen = true;
            state.currentMidx = index;
        }
    },

    setInfoWinOpen(state, value) {
        state.status = 'mapa_set_info_win_open'
        state.infoWinOpen = value;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
