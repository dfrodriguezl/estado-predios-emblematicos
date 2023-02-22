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
  NUMERO_ETAPAS_CUMPLIDAS: string
}

const urlConsultaEstados = "https://geoportal.ant.gov.co/servidor/rest/services/PrediosEmblematicos/Mapa_Predios_Emblem%C3%A1ticos/MapServer/0/query?";

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined"

const IndexPage: React.FC<PageProps> = () => {
  const [numMaxEtapas, setNumMaxEtapas] = React.useState<number[]>([]);
  const [numEtapasCumplidas, setNumEtapasCumplidas] = React.useState<number>(0);
  let queryParameters;
  let id_predio;

  if (isBrowser) {
    queryParameters = new URLSearchParams(window.location.search);
    id_predio = queryParameters.get('id_predio');
  }
 

  const params = {
    where: "id_predio=" + id_predio,
    outFields: "id_predio,nombre_predio,numero_etapas,numero_etapas_cumplidas",
    returnGeometry: false,
    f: "json"
  }

  React.useEffect(() => {
    axios.get<Respuesta>(urlConsultaEstados, {
      params: params
    }).then((response) => {
      setNumMaxEtapas(Array.from(Array(Number(response.data.features[0].attributes.NUMERO_ETAPAS)).keys()))
      setNumEtapasCumplidas(Number(response.data.features[0].attributes.NUMERO_ETAPAS_CUMPLIDAS));
    })
  }, [])

  return (
    <main style={pageStyles}>
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
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
