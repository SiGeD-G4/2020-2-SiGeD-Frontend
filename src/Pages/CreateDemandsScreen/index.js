import React, { useEffect, useState } from 'react';
import Main from './Style';
import SectorDropdown from '../../Components/SectorDropdown';
import CategoryDiv from '../../Components/AddCategoryComponent';
import RightBoxComponent from '../../Components/RightBoxComponent';
import { createDemand } from '../../Services/Axios/demandsServices';
import { validateProcess } from '../../Utils/validations';
import DemandsDescription from '../../Components/DemandsDescription';
import SelectedCategories from '../../Components/SelectedCategories';
import UserDropdown from '../../Components/UserDropdown';
import { getClients } from '../../Services/Axios/clientServices';

const CreateDemandsScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [process, setProcess] = useState('');
  const [valid, setValid] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [clients, setClients] = useState([]);
  const currentUser = 'marcelino';
  const [sector, setSector] = useState('');
  // const [selectedClient, setSelectedClient] = useState();

  const getClientsFromApi = async () => {
    await getClients('clients')
      .then((response) => setClients(response.data));
    // .then((response) => setSelectedClient(response.data[0]));
  };

  useEffect(() => {
    getClientsFromApi();
  }, []);

  const pushCategory = (category) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  useEffect(() => {
    if (!name || !description || !validateProcess(process)) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [name, description, process]);

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  const submit = () => {
    if (valid) {
      createDemand(name, description, process, selectedCategories, currentUser, sector);
      alert('Demanda criada com sucesso!');
      setProcess('');
      setDescription('');
      setName('');
    }
  };

  const cancel = () => {
    setName('');
    setProcess('');
    setDescription('');
    setSelectedCategories([]);
  };

  return (
    <Main>
      <DemandsDescription
        name={name}
        setName={setName}
        process={process}
        setProcess={setProcess}
        description={description}
        setDescription={setDescription}
        submit={submit}
        cancel={cancel}
      />
      {/* Começa aki */}
      <RightBoxComponent>
        <UserDropdown
          clients={clients}
        />
        <SectorDropdown
          setSector={setSector}
          sector={sector}
        />
        <CategoryDiv
          selectedCategories={selectedCategories}
          pushCategory={pushCategory}
        />
        <SelectedCategories
          selectedCategories={selectedCategories}
        />
      </RightBoxComponent>
    </Main>
  );
};

export default CreateDemandsScreen;
