import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import "../styles/header.scss";

export const Header = (props) => (
  <Navbar
    variant="dark"
    expand={false}
    className="container-fluid border-bottom custom-header"
  >
    <Navbar.Brand href="#">
      <img src="media/logo.svg" className="col" />
    </Navbar.Brand>
    {props.windowWidth >= 768 ? (
      <Tabs modelInfo={props.modelInfo} setModelInfo={props.setModelInfo} />
    ) : null}
    <Menu setModelInfo={props.setModelInfo} />
  </Navbar>
);

const Tabs = (props) => {
  const clsModels = "px-5 bg-white";
  const clsModelsSel = clsModels + " tab-selected";
  const clsModelInfo = "px-5 d-inline-block";
  const clsModelInfoSel = clsModelInfo + " tab-selected";

  return (
    <div className="col-9 tabs">
      <button
        className={props.modelInfo == -1 ? clsModelsSel : clsModels}
        onClick={() => props.setModelInfo(-1)}
      >
        Modelos
      </button>
      <p className={props.modelInfo != -1 ? clsModelInfoSel : clsModelInfo}>
        Ficha de modelo
      </p>
    </div>
  );
};

const Menu = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <button className="menu-open" onClick={() => setMenuOpen(true)}>
        <img src="./media/gray.svg" />
      </button>
      {menuOpen ? (
        <div className="menu shadow">
          <div className="menu-list">
            <button onClick={() => setMenuOpen(false)} className="menu-close">
              <p className="d-inline-block mx-2">Cerrar</p>
              <img src="./media/fill-1.svg" />
            </button>
            <div className="rectangle-1">
              <a
                href="#"
                className="d-block text-decoration-none"
                onClick={() => {
                  props.setModelInfo(-1);
                  setMenuOpen(false);
                }}
              >
                Modelos
              </a>
              <a href="#" className="d-block text-decoration-none">
                Servicios y Acessorios
              </a>
              <a href="#" className="d-block text-decoration-none">
                Financiación
              </a>
              <a href="#" className="d-block text-decoration-none">
                Reviews y Comunidad
              </a>
            </div>
            <div className="border-bottom mx-3" />
            <div className="rectangle-1">
              <a href="#" className="d-block text-decoration-none">
                Toyota Mobility Service
              </a>
              <a href="#" className="d-block text-decoration-none">
                Toyota Gazoo Racing
              </a>
              <a href="#" className="d-block text-decoration-none">
                Toyota Híbridos
              </a>
            </div>
            <div className="border-bottom mx-3" />
            <div className="rectangle-1">
              <a href="#" className="d-block text-decoration-none">
                Concesionarios
              </a>
              <a href="#" className="d-block text-decoration-none">
                Test Drive
              </a>
              <a href="#" className="d-block text-decoration-none">
                Contacto
              </a>
            </div>
            <div className="rectangle-2">
              <a href="#" className="d-block text-decoration-none">
                Actividades
              </a>
              <a href="#" className="d-block text-decoration-none">
                Servicios al Cliente
              </a>
              <a href="#" className="d-block text-decoration-none">
                Ventas Especiales
              </a>
              <a href="#" className="d-block text-decoration-none">
                Innovación
              </a>
              <a href="#" className="d-block text-decoration-none">
                Prensa
              </a>
              <a href="#" className="d-block text-decoration-none">
                Acerca de...
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
