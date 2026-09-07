import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  grid = '',
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const MotionTag = motion[as]

  return (
    <MotionTag
      ref={ref}
      className={`${className} ${grid}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={isVisible || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut', delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </MotionTag>
  )
}
