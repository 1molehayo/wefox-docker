/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Form } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { ReactComponent as LocationIcon } from 'assets/images/svgs/map.svg';
import IPost from 'models/Post';
import GenericObject from 'models/Generic';
import { DEFAULT_PROPS, MAP_OPTIONS } from 'utilities/constants';
import axios from 'axios';
import { notify } from 'utilities/toaster';
import ValidateForm from 'models/ValidateForm';

interface IGoogleMapForm {
  errors?: GenericObject;
  form: IPost;
  // eslint-disable-next-line no-unused-vars
  setErrors?: (val: GenericObject) => void;
  // eslint-disable-next-line no-unused-vars
  updateForm: (post: any) => void;
}

const GoogleMapForm = ({
  form,
  errors,
  setErrors,
  updateForm
}: IGoogleMapForm) => {
  const [address, setAddress] = React.useState<string>('');
  const inputRef = React.useRef<null | HTMLInputElement>(null);

  const getLocationFromLatLong = React.useCallback(async () => {
    if (form.id) {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${form?.lat},${form.long}&sensor=true&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`
        );

        setAddress(data?.results[0]?.formatted_address || '');
        if (inputRef.current !== null) {
          inputRef.current.value = data?.results[0]?.formatted_address;
        }
      } catch (error) {
        const err = error as Error;
        notify({
          type: 'error',
          message: err?.message
        });
      }
    }
  }, [form.id, form?.lat, form.long]);

  const initializeGoogleMapPlaces = React.useCallback(() => {
    if (inputRef.current) {
      const autoComplete = new window.google.maps.places.Autocomplete(
        inputRef?.current,
        MAP_OPTIONS
      );

      autoComplete.addListener('place_changed', async function () {
        const place = await autoComplete.getPlace();

        const long = place?.geometry?.location?.lng();
        const lat = place?.geometry?.location?.lat();
        const temp = { ...errors };

        if (lat && long) {
          setAddress(place?.formatted_address || '');
          updateForm((prevState: any) => {
            return {
              ...prevState,
              lat: `${lat}`,
              long: `${long}`
            };
          });
          temp.lat = false;
          temp.long = false;
        } else {
          temp.lat = true;
          temp.long = true;
        }

        if (setErrors) {
          setErrors(temp);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  React.useEffect(() => {
    initializeGoogleMapPlaces();
    getLocationFromLatLong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLocationFromLatLong]);

  const handleReset = React.useCallback(() => {
    const newForm: ValidateForm = {
      content: form.content,
      image_url: form.image_url,
      lat: form.lat,
      long: form.long,
      title: form.title
    };

    if (Object.values(newForm).every((item) => !item)) {
      if (inputRef.current !== null) {
        inputRef.current.value = '';
      }
    }
  }, [form]);

  React.useEffect(() => {
    handleReset();
  }, [handleReset]);

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
      className="autocomplete-dropdown-container mb-5"
      controlId="locationField"
    >
      <Form.Label className="form-label">
        Location <span className="color-red">*</span>
      </Form.Label>
      <Form.Control
        placeholder="Search Places ..."
        className="form-control"
        ref={inputRef}
        isInvalid={errors && (errors?.long || errors?.lat)}
      />

      {form.lat && form.long && (
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
            defaultZoom={DEFAULT_PROPS.zoom}
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
