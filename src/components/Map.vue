<template>
    <div>
        <gmap-map :center="center"
                  :zoom="12"
                  style="width:100%;  height: 400px;">
            <gmap-marker :key="index"
                         v-for="(m, index) in markers"
                         :position="m.position"
                         @click="center=m.position"></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
    export default {
        name: "GoogleMap",
        data() {
            return {
                center: { lat: 1.363409, lng: 103.807126},
                markers: [],
                places: [],
                currentPlace: null
            };
        },
        props: {
            lat: Number,
            lng: Number
        },

        mounted() {
            this.geolocate();
            this.markers.push({ position: { lat: this.lat, lng: this.lng } });
        },

        methods: {
            // receives a place object via the autocomplete component
            setPlace(place) {
                this.currentPlace = place;
            },
            addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                }
            },
            geolocate: function () {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            },

        }
    };
</script>