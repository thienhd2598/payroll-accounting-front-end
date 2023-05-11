import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Spin } from 'antd';
import { useEffect, useRef } from 'react';

const GoogleMapModal = ({ location, setLocation }: any) => {
  const searchBox: any = useRef();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_API_TOKEN ?? '',
    libraries: ['places'],
  });

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setLocation({ ...location, center: pos });
      },
    );
    // setLocation({ ...location, center: { lat: latitude, lng: longitude } })
    return () => {
      setLocation({ ...location, center: { lat: 0, lng: 0 } });
    };
  }, []);

  const onMapLoad = () => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setLocation({ ...location, center: pos });
      },
    );
  };

  const onLoad = (ref: any) => (searchBox.current = ref);
  const onPlacesChanged = () => {
    console.log({ testPlace: searchBox?.current });
    console.log(
      'onPlacesChanged--------------',
      searchBox?.current?.getPlaces(),
    );
    if (!!searchBox?.current?.getPlaces()?.[0]) {
      setLocation({
        ...location,
        center: {
          lat: searchBox?.current?.getPlaces()?.[0].geometry.location.lat(),
          lng: searchBox?.current?.getPlaces()?.[0].geometry.location.lng(),
        },
      });
    }
  };

  const onMarkerDragEnd = (coord: any) => {
    const lat = coord.latLng.lat();
    const lng = coord.latLng.lng();
    console.log(lat, lng);
    setLocation({
      ...location,
      center: {
        lat: lat,
        lng: lng,
      },
    });
  };

  console.log({ location });

  return (
    <Spin spinning={!isLoaded}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: '60vh', width: '100%' }}
          center={location.center}
          zoom={location.zoom}
          onLoad={onMapLoad}
        >
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
            // bounds={location.bounds}
          >
            <input
              type="text"
              placeholder="Tìm địa điểm"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
              }}
            />
          </StandaloneSearchBox>
          <Marker
            key={0}
            position={location.center}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        </GoogleMap>
      )}
    </Spin>
  );
};

export default GoogleMapModal;
