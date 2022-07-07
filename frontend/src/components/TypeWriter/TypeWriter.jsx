import { TypePhase, useTypeEffect } from './useTypeEffect'
import cn from 'classnames'
import './TypeWriter.css'

export default function TypeWriter(props) {
  const { typedSuperpower, selectedSuperpower, phase} =
    useTypeEffect(props.textArray)

  return (
    <span
      className={cn('typewriter', {
        ['end-cursor']: phase !== TypePhase.Deleting,
        ['blinking']: phase === TypePhase.Pausing,
      })}
      aria-label={selectedSuperpower}
    >
      {typedSuperpower}
    </span>

  )
}