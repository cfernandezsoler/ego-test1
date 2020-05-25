import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "../styles/libraries/carousel-styles.css";
import "../styles/modelinfo.scss";

export const ModelInfo = (props) => {
  let [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://challenge.agenciaego.tech/models/" + props.modelID
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

  if (data === null) return null;

  const clsModelInfoDiv =
    props.windowWidth >= 768 ? "container-fluid w-75" : "container-fluid";
  return (
    <div className={clsModelInfoDiv}>
      <ModelIntro
        description={data.description}
        name={data.name}
        photo={data.photo}
        title={data.title}
      />
      <ModelFeatures
        model_features={data.model_features}
        windowWidth={props.windowWidth}
      />
      <ModelHighlights
        model_highlights={data.model_highlights}
        windowWidth={props.windowWidth}
      />
    </div>
  );
};

const ModelIntro = (props) => (
  <div className="row py-5 mi-intro">
    <img
      src={`https://challenge.agenciaego.tech${props.photo}`}
      className="col"
    />
    <div className="col">
      <h3>{props.name}</h3>
      <h2 className="mb-md-2 pb-3">{props.title}</h2>
      <p>{props.description}</p>
    </div>
  </div>
);

const ModelFeatures = (props) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1550 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1550, min: 1150 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1150, min: 700 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      arrows={props.windowWidth >= 768}
      infinite={true}
      className="py-5"
      showDots={true}
    >
      {props.model_features.map((item, i) => (
        <div key={`carousel${i}`} className="custom-carousel">
          <img src={`https://challenge.agenciaego.tech${item.photo}`} />
          <div className="my-3 mx-md-1">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

const ModelHighlights = (props) => (
  <div className="py-5">
    {props.model_highlights.map((item, i) => {
      const elementInfo = (
        <div className="col-lg-6">
          <div className="m-xl-5">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </div>
      );
      const elementPhoto = (
        <div className="col-lg-6 mb-3">
          <img
            src={`https://challenge.agenciaego.tech${item.image}`}
            className="img-fluid"
          />
        </div>
      );

      return i % 2 == 0 && props.windowWidth >= 992 ? (
        <div key={`mhighlights${i}`} className="row py-5 mi-highlights">
          {elementInfo}
          {elementPhoto}
        </div>
      ) : (
        <div key={`mhighlights${i}`} className="row py-5 mi-highlights">
          {elementPhoto}
          {elementInfo}
        </div>
      );
    })}
  </div>
);
