import { Navbar, Nav } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { BsBell } from 'react-icons/bs';
import styles from './Style';
import { useProfileUser } from '../../Context';
import { getAlertsBySector } from '../../Services/Axios/demandsServices';
import { APIUsers } from '../../Services/Axios/baseService';
import ViewAlertModal from '../ViewAlertModal';

const NavbarComp = () => {
  const {
    user, token, setToken, startModal,
  } = useProfileUser();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [alerts, setAlerts] = useState([]);

  const getAlertsApi = async () => {
    await getAlertsBySector(user?.sector, startModal)
      .then((response) => setAlerts(response))
      .catch((err) => {
        console.error(`An unexpected error ocourred while getting alerts. ${err}`);
      });
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      getAlertsApi();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    const logoutUser = () => {
      try {
        localStorage.clear();
        setToken(localStorage.getItem('@App:token'));
        APIUsers.defaults.headers = null;
      } catch (error) {
        startModal('Não foi possivel realizar o logout.');
        console.error(error);
      }
    };
    if (user.role === 'admin') {
      return (

        <Navbar expand="lg" variant="dark" clickfixed="top" fixed="top" style={styles.navbar}>
          <Navbar.Brand>
            <h1 style={styles.navbarText}>Logo</h1>
          </Navbar.Brand>
          { token && <Navbar.Toggle aria-controls="navbar-police" />}
          { token
            && (
              <Navbar.Collapse id="navbar-police">
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/cadastro" style={styles.navbarText}>
                    Cadastro
                  </Nav.Link>
                  <Nav.Link as={Link} to="/usuarios" style={styles.navbarText}>
                    Usuários
                  </Nav.Link>
                  <Nav.Link as={Link} to="/setores" style={styles.navbarText}>
                    Setores
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cliente" style={styles.navbarText}>
                    Novo cliente
                  </Nav.Link>
                  <Nav.Link as={Link} to="/clientes" style={styles.navbarText}>
                    Clientes
                  </Nav.Link>
                  <Nav.Link as={Link} to="/categorias" style={styles.navbarText}>
                    Categorias
                  </Nav.Link>
                  <Nav.Link as={Link} to="/demanda" style={styles.navbarText}>
                    Criar Demandas
                  </Nav.Link>
                  <Nav.Link as={Link} to="/demandas" style={styles.navbarText}>
                    Demandas
                  </Nav.Link>
                  <Nav.Link as={Link} to="/estatisticas" style={styles.navbarText}>
                    Estatísticas
                  </Nav.Link>
                  <Nav.Link as={Link} to="/caracteristicas" style={styles.navbarText}>
                    Caracteristicas
                  </Nav.Link>
                  <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => { handleShow(); getAlertsApi(); }}>
                    <BsBell />
                  </Navbar.Brand>
                  <ViewAlertModal
                    show={show}
                    handleClose={handleClose}
                    alerts={alerts}
                  />
                  <Navbar.Brand as={Link} to="/login" onClick={logoutUser}>
                    <FiLogOut />
                  </Navbar.Brand>
                </Nav>
              </Navbar.Collapse>
            )}
        </Navbar>
      );
    }
    return (

      <Navbar expand="lg" variant="dark" clickfixed="top" fixed="top" style={styles.navbar}>
        <Navbar.Brand>
          <h1 style={styles.navbarText}>Logo</h1>
        </Navbar.Brand>
        { token && <Navbar.Toggle aria-controls="navbar-police" />}
        { token
          && (
            <Navbar.Collapse id="navbar-police">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/cliente" style={styles.navbarText}>
                  Novo cliente
                </Nav.Link>
                <Nav.Link as={Link} to="/clientes" style={styles.navbarText}>
                  Clientes
                </Nav.Link>
                <Nav.Link as={Link} to="/categorias" style={styles.navbarText}>
                  Categorias
                </Nav.Link>
                <Nav.Link as={Link} to="/demanda" style={styles.navbarText}>
                  Criar Demandas
                </Nav.Link>
                <Nav.Link as={Link} to="/demandas" style={styles.navbarText}>
                  Demandas
                </Nav.Link>
                <Navbar.Brand onClick={() => handleShow()}>
                  <BsBell />
                </Navbar.Brand>
                <ViewAlertModal
                  show={show}
                  handleClose={handleClose}
                  alerts={alerts}
                />
                <Navbar.Brand as={Link} to="/login" onClick={logoutUser}>
                  <FiLogOut />
                </Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          )}
      </Navbar>
    );
  }
  return (
    <Navbar expand="lg" variant="dark" clickfixed="top" fixed="top" style={styles.navbar}>
      <Navbar.Brand>
        <h1 style={styles.navbarText}>Logo</h1>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavbarComp;
