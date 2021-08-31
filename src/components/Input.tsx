import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useDebouncedEffect } from '../hooks/useDebounceEffect'
import styles from '../styles/components/Input.module.css'
import { PreviewProps } from '../types/preview'

export const Input = () => {
  const { handleSetPreviewValues } = useContext(AppContext)
  const [inputValue, setInputValue] = useState('')
  
  useDebouncedEffect(() => {
    getPreviewValues(inputValue)
  }, [inputValue], 1000)

  function handleInputValue({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(currentTarget.value ?? '')
  }

  async function getPreviewValues(url: string) {
    try {
      const isUrl = isValidUrl(url)
      console.log(isUrl);
      //TODO: Fazer alguma validação quando isso for falso
      if (!isUrl) return;
      const { data } = await axios.post<PreviewProps>('/api/preview', { url })
      handleSetPreviewValues(data)
    } catch (error) {
      //TODO: Mostrar algum erro quando houver erro
      console.error('error')
    }
  }

  function isValidUrl(url: string) {
    return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url)
  }

  return (
    <input 
      type="text" 
      className={styles.input} 
      value={inputValue}
      onChange={handleInputValue}
    />
  )
}