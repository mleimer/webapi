"use client";

import {useEffect, useState} from "react";

export default function Location() {

    let [coordinates, setCoordinates] = useState<GeolocationCoordinates>();
    let [error, setError] = useState<GeolocationPositionError>();
    useEffect(() => {
        if ('geolocation' in navigator) {
            const watchId = navigator.geolocation.watchPosition(({coords}) => {
                    setCoordinates(coords);
                }, (err) => setError(err), {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 60_000,
                }
            )
            return () => navigator.geolocation.clearWatch(watchId)
        }
        return () => {
        }
    }, []);

    return (
        <div>
            <div>Your location is</div>
            <div>{JSON.stringify(coordinates, null, 2)}</div>
            {error ?
                (<div>
                    <div>There has been an error</div>
                    <div>{JSON.stringify(error, null, 2)}</div>
                </div>) : null
            }
        </div>
    );
}
