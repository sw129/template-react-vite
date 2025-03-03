import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

type TooltipTemplateProps = {
  content: ReactNode
  children: ReactNode
  targetRef: RefObject<HTMLDivElement | null>
}

type TooltipTemplate = RefObject<{
  showTooltip: () => void
  hideTooltip: () => void
}>

const TooltipTemplate = ({
  children,
  content,
  ...props
}: TooltipTemplateProps,
  ref: TooltipTemplate,
) => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  // Рассчитываем позицию тултипа
  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX + rect.width / 2,
      })
    }
  }

  // Обновляем позицию при изменении размеров или прокрутке
  useEffect(() => {
    if (isVisible) {
      updatePosition()
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition)
    }
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  }, [isVisible])

  const showTooltip = useCallback(() => {
    updatePosition()
    setIsVisible(true)
  }, [])

  const hideTooltip = useCallback(() => {
    setIsVisible(false)
  }, [])

  useImperativeHandle(ref, () => {
    return {
      showTooltip,
      hideTooltip,
    }
  }, [showTooltip, hideTooltip])

  return (
    <div
      {...props}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby="tooltip-content"
      >
        {children}
      </div>

      {isVisible && (
        <div
          id="tooltip-content"
          role="tooltip"
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 1000,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {content}
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '5px',
              borderStyle: 'solid',
              borderColor: 'transparent transparent rgba(0, 0, 0, 0.8) transparent',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default TooltipTemplate
