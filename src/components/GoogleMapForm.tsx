/* eslint-disable @typescript-eslint/no-unused-vars */
import IPost from 'models/Post';
import React from 'react';
import { Form } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { ReactComponent as LocationIcon } from 'assets/images/svgs/map.svg';

interface IGoogleMapForm {
  form: IPost;
  // eslint-disable-next-line no-unused-vars
  updateForm: (data: IPost) => void;
}

const GoogleMapForm = ({ form, updateForm }: IGoogleMapForm) => {
  const [address, setAddress] = React.useState<string>('');
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const options = {
    componentRestrictions: { country: 'ng' },
    fields: [
      'address_components',
      'geometry',
      'icon',
      'name',
      'formatted_address',
      'place_id',
      'plus_code'
    ],
    types: ['establishment']
  };

  const defaultProps = {
    center: {
      lat: 6.445944600000001,
      lng: 3.437407
    },
    zoom: 10
  };

  React.useEffect(() => {
    if (inputRef.current) {
      const autoComplete = new window.google.maps.places.Autocomplete(
        inputRef?.current,
        options
      );

      autoComplete.addListener('place_changed', async function () {
        const place = await autoComplete.getPlace();

        const long = place?.geometry?.location?.lng();
        const lat = place?.geometry?.location?.lat();

        if (lat && long) {
          updateForm({ ...form, lat: `${lat}`, long: `${long}` });
          setAddress(place?.formatted_address || '');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface IProps {
    text?: string;
    lat?: number;
    lng?: number;
  }

  const AnyReactComponent = <PROPS extends IProps>({
    text,
    // eslint-disable-next-line no-unused-vars
    lat,
    // eslint-disable-next-line no-unused-vars
    lng
  }: PROPS): JSX.Element => (
    <div className="autocomplete-pin">
      <LocationIcon width={80} height="100%" />
      <p className="autocomplete-pin-text">{text}</p>
    </div>
  );

  return (
    <Form.Group
      className="autocomplete-dropdown-container mb-3"
      controlId="locationField"
    >
      <Form.Label className="form-label">Location</Form.Label>
      <Form.Control
        placeholder="Search Places ..."
        className="form-control"
        ref={inputRef}
      />

      {inputRef.current && inputRef.current.value && form.lat && form.long && (
        <div className="autocomplete-map">
          <GoogleMapReact
            key={new Date().getTime()}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAP_KEY || ''
            }}
            defaultCenter={{
              lat: parseFloat(form.lat),
              lng: parseFloat(form.long)
            }}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={parseFloat(form.lat)}
              lng={parseFloat(form.long)}
              text={address}
            />
          </GoogleMapReact>
        </div>
      )}
    </Form.Group>
  );
};

export default GoogleMapForm;
