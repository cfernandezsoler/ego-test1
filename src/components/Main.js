import React, { useEffect, useState } from "react";
import "../styles/main.scss";

export const Main = (props) => {
  let [data, setData] = useState([]);
  let [filter, setFilter] = useState("");
  let [sort, setSort] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://challenge.agenciaego.tech/models"
        );
        if (!response.ok) throw Error(response.statusText);

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const clsMainDiv =
    props.windowWidth >= 768 ? "container-fluid w-75" : "container-fluid";
  return (
    <div className={clsMainDiv}>
      <h1 className="py-5 main-title">Descubrí todos los modelos</h1>
      <div>
        <div className="row border-bottom pb-2 mx-1">
          {props.windowWidth >= 1350 ? (
            <Filters filter={filter} setFilter={setFilter} />
          ) : (
            <FilterList filter={filter} setFilter={setFilter} />
          )}
          {props.windowWidth < 1350 ? <div className="col" /> : null}
          <SortList
            isDesktop={props.windowWidth >= 1350}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {data.length > 0 ? (
          <ModelList
            filter={filter}
            sort={sort}
            data={data}
            setModelInfo={props.setModelInfo}
          />
        ) : null}
      </div>
    </div>
  );
};

const Filters = (props) => {
  const clsBtnSelected = "mx-3 border-0 btn-filter";
  const clsBtnUnselected = "mx-3 border-0 bg-white btn-filter";

  return (
    <div className="col-9">
      <h3 className="d-inline-block mr-3 filter-title">Filtrar por</h3>
      <button
        className={props.filter === "" ? clsBtnSelected : clsBtnUnselected}
        onClick={() => props.setFilter("")}
      >
        Todos
      </button>
      <button
        className={props.filter === "Autos" ? clsBtnSelected : clsBtnUnselected}
        onClick={() => props.setFilter("Autos")}
      >
        Autos
      </button>
      <button
        className={
          props.filter === "Pickups y Comerciales"
            ? clsBtnSelected
            : clsBtnUnselected
        }
        onClick={() => props.setFilter("Pickups y Comerciales")}
      >
        Pickups y Comerciales
      </button>
      <button
        className={
          props.filter === "SUVs y Crossovers"
            ? clsBtnSelected
            : clsBtnUnselected
        }
        onClick={() => props.setFilter("SUVs y Crossovers")}
      >
        SUVs y Crossovers
      </button>
    </div>
  );
};

const FilterList = (props) => {
  const [filterListOpen, setFilterListOpen] = useState(false);
  const filterValues = [
    "",
    "Autos",
    "Pickups y Comerciales",
    "SUVs y Crossovers",
  ];
  const filterText = [
    <p>Todos</p>,
    <p>Autos</p>,
    <p>Pickups y Comerciales</p>,
    <p>SUVs y Crossovers</p>,
  ];

  return (
    <div className="col-5 p-0">
      <button
        onClick={() => setFilterListOpen(!filterListOpen)}
        className="sort-button"
      >
        Filtrar por
        <img
          src={
            filterListOpen ? "./media/close-list.svg" : "./media/open-list.svg"
          }
          className="ml-2"
        />
        {filterListOpen ? (
          <div className="sort-list sort-left">
            {filterValues.map((value, i) => (
              <button
                onClick={() => {
                  props.setFilter(value);
                  setFilterListOpen(false);
                }}
                className={
                  props.filter === value
                    ? "border-bottom sort-selected"
                    : "border-bottom"
                }
              >
                {filterText[i]}
              </button>
            ))}
          </div>
        ) : null}
      </button>
    </div>
  );
};

const SortList = (props) => {
  const [sortListOpen, setSortListOpen] = useState(false);
  const sortValues = [
    "",
    "lowerPriceFirst",
    "higherPriceFirst",
    "newestFirst",
    "oldestFirst",
  ];
  const sortText = [
    <p>Nada</p>,
    <p>
      De <b>menor</b> a <b>mayor</b> precio
    </p>,
    <p>
      De <b>mayor</b> a <b>menor</b> precio
    </p>,
    <p>
      Más <b>nuevos</b> primero
    </p>,
    <p>
      Más <b>viejos</b> primero
    </p>,
  ];
  const clsDiv =
    "col" + (props.isDesktop ? " " : "-5 ") + "d-flex justify-content-end p-0";
  return (
    <div className={clsDiv}>
      <button
        onClick={() => setSortListOpen(!sortListOpen)}
        className="sort-button"
      >
        Ordenar por
        <img
          src={
            sortListOpen ? "./media/close-list.svg" : "./media/open-list.svg"
          }
          className="ml-2"
        />
        {sortListOpen ? (
          <div className="sort-list sort-right">
            {sortValues.map((value, i) => (
              <button
                onClick={() => {
                  props.setSort(value);
                  setSortListOpen(false);
                }}
                className={
                  props.sort === value
                    ? "border-bottom sort-selected"
                    : "border-bottom"
                }
              >
                {sortText[i]}
              </button>
            ))}
          </div>
        ) : null}
      </button>
    </div>
  );
};

const ModelList = (props) => {
  let models = props.data;

  if (models.length < 1) return null;

  const filterModels = (filterOption) => {
    if (filterOption != "")
      models = models.filter((item) => item.segment === filterOption);
  };

  const sortModels = (sortOption) => {
    if (sortOption === "lowerPriceFirst")
      models.sort((a, b) => a.price - b.price);
    else if (sortOption === "higherPriceFirst")
      models.sort((a, b) => b.price - a.price);
    else if (sortOption === "newestFirst")
      models.sort((a, b) => b.year - a.year);
    else if (sortOption === "oldestFirst")
      models.sort((a, b) => a.year - b.year);
    else models.sort((a, b) => a.id - b.id);
  };

  filterModels(props.filter);
  sortModels(props.sort);

  return (
    <div className="row text-center py-5">
      {models.map((item) => (
        <Model
          key={"model" + item.id}
          id={item.id}
          name={item.name}
          year={item.year}
          price={new Intl.NumberFormat().format(item.price)}
          thumb={item.thumbnail}
          photo={item.photo}
          setModelInfo={props.setModelInfo}
        />
      ))}
    </div>
  );
};

const Model = (props) => (
  <div className="col py-5 model">
    <h1>{props.name}</h1>
    <p>
      {props.year} | $ {props.price}
    </p>
    <img
      src={`https://challenge.agenciaego.tech${props.photo}`}
      width="268"
      height="132"
      className="d-block m-auto py-2"
    />
    <button
      onClick={() => props.setModelInfo(props.id)}
      className="btn-showmodel"
    >
      Ver Modelo
    </button>
  </div>
);
