import React, { useCallback, useMemo } from 'react'
import { remote } from 'electron'
import os from 'os'
import { FiX, FiMinus, FiMaximize2, FiSquare } from 'react-icons/fi'

import { Container, WindowActions, MacActionButton, DefaultActionButton } from './styles'
import { useConfig } from '../../hooks/useConfig'

const Header: React.FC = () => {
  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.close()
  }, [])

  const handleMaximize = useCallback(() => {
    const window = remote.getCurrentWindow()

    const { width: currentWidth, height: currentHeight } = window.getBounds()

    const { width: maxWidth, height: maxHeight } = remote.screen.getPrimaryDisplay().workAreaSize

    const isMaximized = (currentWidth === maxWidth && currentHeight === maxHeight)

    if (!isMaximized) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }, [])

  const handleMinimize = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.minimize()
  }, [])

  const handleFullScreen = useCallback(() => {
    const window = remote.getCurrentWindow()
    if (window.isFullScreen()) {
      return window.setFullScreen(false)
    }
    return window.setFullScreen(true)
  }, [])

  const useMacOSWindowActionButtons = useConfig('useMacOSWindowActionButtons')

  const shouldUseMacOSWindowActions = useMemo(() => {
    return useMacOSWindowActionButtons || os.platform() === 'darwin'
  }, [useMacOSWindowActionButtons])

  return (
    <Container>
      <strong>Rocket Redis</strong>

      {shouldUseMacOSWindowActions ? (
        <WindowActions position="left">
          <MacActionButton color="close" onClick={handleCloseWindow}>
            <FiX />
          </MacActionButton>
          <MacActionButton color="minimize" onClick={handleMinimize}>
            <FiMinus />
          </MacActionButton>
          <MacActionButton color="maximize" onClick={handleFullScreen}>
            <FiMaximize2 />
          </MacActionButton>
        </WindowActions>
      ) : (
        <WindowActions position="right">
          <DefaultActionButton onClick={handleMinimize}>
            <FiMinus />
          </DefaultActionButton>
          <DefaultActionButton onClick={handleMaximize}>
            <FiSquare />
          </DefaultActionButton>
          <DefaultActionButton onClick={handleCloseWindow}>
            <FiX />
          </DefaultActionButton>
        </WindowActions>
      )}
    </Container>
  )
}

export default Header
