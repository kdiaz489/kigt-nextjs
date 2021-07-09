import { useState } from 'react';
import SettingToggle from '@/components/common/SettingToggle';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useNotification } from '@/context/notification';
import { useFetchedCharger } from '@/context/chargers';

const CurrentToggle = () => {
  const router = useRouter();
  const { id } = router.query;
  const { charger } = useFetchedCharger(id);
  const { enqueueSnackbar } = useNotification();

  const currentCharger = charger.charger ? charger.charger : charger;
  let currentReading =
    currentCharger['SERVER Get Current and Voltage Reading?'];

  const [toggle, setToggle] = useState(currentReading);
  console.log('Toggle =', toggle);
  const handleChange = async (event) => {
    try {
      let copy = { 'SERVER Get Current and Voltage Reading?': !toggle };
      let res = await axios.put(
        `/dashboard/chargers/updateCharger/${id}`,
        copy
      );
      setToggle((prev) => !prev);
    } catch (error) {
      enqueueSnackbar('Error updating transaction amount. Please try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <SettingToggle
        title='Save Current Data'
        name='checked'
        handleChange={handleChange}
        checked={toggle}
      />
    </>
  );
};

export default CurrentToggle;
