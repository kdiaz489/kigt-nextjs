import { useState } from 'react';
import SettingToggle from '@/components/common/SettingToggle';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useNotification } from '@/context/notification';
import { useFetchedCharger } from '@/context/chargers';

const TemperatureToggle = () => {
  const router = useRouter();
  const { id } = router.query;
  const { charger } = useFetchedCharger(id);
  const { enqueueSnackbar } = useNotification();

  const currentCharger = charger.charger ? charger.charger : charger;
  let currentReading = currentCharger['SERVER Get Temperature Reading?'];

  const [toggle, setToggle] = useState(currentReading);
  const handleChange = async (event) => {
    try {
      let copy = { 'SERVER Get Temperature Reading?': !toggle };
      let res = await axios.put(`/chargers/updateCharger/${id}`, copy);
      setToggle((prev) => !prev);
    } catch (error) {
      enqueueSnackbar('Error enabling temperature data. Please try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <SettingToggle
        title='Save Temperature Data'
        name='checked'
        handleChange={handleChange}
        checked={toggle}
      />
    </>
  );
};

export default TemperatureToggle;
