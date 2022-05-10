import React, {memo} from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useCallback } from "react"
import { Container } from "../../../node_modules/@material-ui/core/index"
import Api from "../../api-integrations/apicovid"
import { ContainerStyled } from "./style"
import Board from './components/Board'
import Panel from './components/Panel';

function Main(){
    const [data, setData] = useState({})
    const [country, setCountry] = useState('brazil')
    const updateAt = new Date().toLocaleDateString()
   

    const getCovidData = useCallback((country) => {
        Api.getCountry(country)
          .then(data => setData(data))
      }, [])
    
      useEffect(() => {    
        getCovidData(country)
      }, [getCovidData, country])

      const handlerChange = ({ target }) =>{
        const country  = target.value
        setCountry(country)
      }

    return (
        <ContainerStyled>
            <div className="mb-2">
              <Panel 
              data={data}
              updateAt = {updateAt}
              onChange = {handlerChange}
              country = {country}
              getCovidData = {getCovidData}
              />
            </div>
            <Board data={data} />
        </ContainerStyled>
    )
}

export default memo(Main)