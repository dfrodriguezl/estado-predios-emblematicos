import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import axios from "axios"

const pageStyles = {
  color: "#232129",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64
}

const circleStyle: React.CSSProperties = {
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  background: '#00ff00',
  border: '3px solid #000',
  display: 'inline-block',
  marginRight: '5%',
  textAlign: 'center'
}

const textCircleStyle = {
  margin: 'auto',
  lineHeight: '50px',
  fontWeight: 'bolder'
}

const circleStyleRed: React.CSSProperties = {
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  background: '#ff0000',
  border: '3px solid #000',
  display: 'inline-block',
  marginRight: '5%',
  textAlign: 'center'
}

type Respuesta = {
  features: Feature[]
}

type Feature = {
  attributes: Predio
}

type Predio = {
  ID_PREDIO: number,
  NOMBRE_PREDIO: string,
  NUMERO_ETAPAS: string,
  NUMERO_ETAPAS_CUMPLIDAS: string,
  NUMERO_ETAPAS_2: string,
  NUMERO_ETAPAS_CUMPLIDAS_2: string,
  NUMERO_ETAPAS_3: string,
  NUMERO_ETAPAS_CUMPLIDAS_3: string,
  ACCIONES_PROC_1: string,
  ACCIONES_PROC_2: string
  ACCIONES_PROC_3: string
}

const urlConsultaEstados = "https://geoportal.ant.gov.co/hosted/rest/services/PrediosEmblematicos/MapaPrediosEmblematicos/MapServer/0/query?";

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined"

const IndexPage: React.FC<PageProps> = () => {
  const [nombreProcedimiento, setNombreProcedimiento] = React.useState<string>("");
  const [numMaxEtapas, setNumMaxEtapas] = React.useState<number[]>([]);
  const [numEtapasCumplidas, setNumEtapasCumplidas] = React.useState<number>(0);
  const [nombreProcedimiento2, setNombreProcedimiento2] = React.useState<string>("");
  const [numMaxEtapas2, setNumMaxEtapas2] = React.useState<number[]>([]);
  const [numEtapasCumplidas2, setNumEtapasCumplidas2] = React.useState<number>(0);
  const [nombreProcedimiento3, setNombreProcedimiento3] = React.useState<string>("");
  const [numMaxEtapas3, setNumMaxEtapas3] = React.useState<number[]>([]);
  const [numEtapasCumplidas3, setNumEtapasCumplidas3] = React.useState<number>(0);
  let queryParameters;
  let id_predio;

  if (isBrowser) {
    queryParameters = new URLSearchParams(window.location.search);
    id_predio = queryParameters.get('id_predio');
  }
 

  const params = {
    where: "id_predio=" + id_predio,
    outFields: "id_predio,nombre_predio,numero_etapas,numero_etapas_cumplidas,acciones_proc_1,numero_etapas_2,numero_etapas_cumplidas_2,acciones_proc_2,numero_etapas_3,numero_etapas_cumplidas_3,acciones_proc_3",
    returnGeometry: false,
    f: "json"
  }

  React.useEffect(() => {
    axios.get<Respuesta>(urlConsultaEstados, {
      params: params
    }).then((response) => {
      // console.log("DATA", response.data);
      setNombreProcedimiento(response.data.features[0].attributes.ACCIONES_PROC_1);
      setNumMaxEtapas(Array.from(Array(Number(response.data.features[0].attributes.NUMERO_ETAPAS)).keys()));
      setNumEtapasCumplidas(Number(response.data.features[0].attributes.NUMERO_ETAPAS_CUMPLIDAS));

      if(response.data.features[0].attributes.NUMERO_ETAPAS_CUMPLIDAS_2 !== null){
        setNombreProcedimiento2(response.data.features[0].attributes.ACCIONES_PROC_2);
        setNumMaxEtapas2(Array.from(Array(Number(response.data.features[0].attributes.NUMERO_ETAPAS_2)).keys()));
        setNumEtapasCumplidas2(Number(response.data.features[0].attributes.NUMERO_ETAPAS_CUMPLIDAS_2));
      } 

      if(response.data.features[0].attributes.NUMERO_ETAPAS_CUMPLIDAS_3 !== null){
        setNombreProcedimiento3(response.data.features[0].attributes.ACCIONES_PROC_3);
        setNumMaxEtapas3(Array.from(Array(Number(response.data.features[0].attributes.NUMERO_ETAPAS_3)).keys()));
        setNumEtapasCumplidas3(Number(response.data.features[0].attributes.NUMERO_ETAPAS_CUMPLIDAS_3));
      }
    })
  }, [])

  return (
    <main style={pageStyles}>
      <h3>{nombreProcedimiento}</h3>
      {numMaxEtapas.map((etapa, i) => {
          if(i < numEtapasCumplidas ){
            return (<div style={circleStyle} key={i} >
              <p style={textCircleStyle}>{etapa+1}</p>
            </div>)
          } else {
            return (<div style={circleStyleRed} key={i} >
              <p style={textCircleStyle}>{etapa+1}</p>
            </div>)
          }  
        })}
        {nombreProcedimiento2 !== "" ? 
        <React.Fragment>
          <h3>{nombreProcedimiento2}</h3>
          {numMaxEtapas2.map((etapa, i) => {
          if(i < numEtapasCumplidas2 ){
            return (<div style={circleStyle} key={i} >
              <p style={textCircleStyle}>{etapa+1}</p>
            </div>)
          } else {
            return (<div style={circleStyleRed} key={i} >
              <p style={textCircleStyle}>{etapa+1}</p>
            </div>)
          }  
        })}
        </React.Fragment> : null}
        {nombreProcedimiento3 !== "" ? 
        <React.Fragment>
          <h3>{nombreProcedimiento3}</h3>
          {numMaxEtapas3.map((etapa, i) => {
          if(i < numEtapasCumplidas3 ){
            return (<div style={circleStyle} key={i} >
              <p style={textCircleStyle}>{etapa+1}</p>
            </div>)
          } else {
            return (<div style={circleStyleRed} key={i} >
              <p style={textCircleStyle}>{etapa+1}</p>
            </div>)
          }  
        })}
        </React.Fragment> : null}
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
