import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ProfileSidebarComponent from '../../Components/ProfileSidebarComponent';
import {
  Main, RightBox,
} from './Style';
import { getClients } from '../../Services/Axios/clientServices';

const ClientProfileScreen = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputCpf, setInputCpf] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [officeOption, setOfficeOption] = useState('');
  const [policeStationOption, setPoliceStationOption] = useState('');
  const { id } = useParams();

  const getClientFromApi = async () => {
    getClients(`clients/${id}`)
      .then((response) => {
        const { data } = response;
        setInputName(data.name);
        setInputEmail(data.email);
        setInputCpf(data.cpf);
        setInputPhone(data.phone);
        setInputCity(data.city);
        setOfficeOption(data.office);
        setPoliceStationOption(data.policeStation);
      });
  };

  useEffect(() => {
    getClientFromApi();
  }, []);

  if (!localStorage.getItem('@App:token')) {
    return <Redirect to="/login" />;
  }

  return (
    <Main>
      <ProfileSidebarComponent
        sidebarTitle="Perfil do Cliente"
        sidebarList={[inputName, inputCpf,
          inputCity, officeOption, policeStationOption]}
        sidebarFooter={[inputEmail, inputPhone]}
      />
      <RightBox />
    </Main>

  );
};

export default ClientProfileScreen;
