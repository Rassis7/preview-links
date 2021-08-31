import React, { createContext, useCallback, useState } from "react";
import { PreviewProps } from '../types/preview';

interface AppContextProps {
  previewItems: PreviewProps
  handleSetPreviewValues: (params: PreviewProps) => void
}
export const AppContext = createContext({} as AppContextProps)

interface AppContextProviderProps {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [previewItems, setPreviewItems] = useState<PreviewProps>({})

  const handleSetPreviewValues = useCallback((params: PreviewProps) => {
    setPreviewItems((values) => ({...values, ...params}))
  },[setPreviewItems])

  return (
    <AppContext.Provider value={{previewItems, handleSetPreviewValues}}>
      {children}
    </AppContext.Provider>
  )
}