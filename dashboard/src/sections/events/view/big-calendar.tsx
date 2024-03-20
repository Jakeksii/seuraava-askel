/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import fi from 'date-fns/locale/fi'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import './big-calendar.css'
import { useCallback, useState } from 'react'

const locales = {
  'fi': fi,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
type Event = {
  _id: number
  title: string,
  start: Date,
  end: Date,
  allDay: boolean
}
type Props = {
  events: Event[]
}
const DnDCalendar = withDragAndDrop(Calendar)

export function BigCalendar (props: Props) {
  const [events, setEvents] = useState<Event[]>(props.events)

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }: EventInteractionArgs<Event>) => {
      let allDay = false
      if (droppedOnAllDaySlot) {
        allDay = true
      }
      setEvents((prev: any) => {
        const existing = prev.find((ev: { _id: number }) => ev._id === event._id) ?? {}
        const filtered = prev.filter((ev: { _id: number }) => ev._id !== event._id)
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs<Event>) => {
      setEvents((prev: any) => {
        const existing = prev.find((ev: { _id: number }) => ev._id === event._id) ?? {}
        const filtered = prev.filter((ev: { _id: number }) => ev._id !== event._id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setEvents]
  )
  return (
    <div>
      <DnDCalendar
        culture='fi'
        localizer={localizer}
        events={events}
        draggableAccessor={()=>true}
        onEventDrop={moveEvent as any}
        onEventResize={resizeEvent as any}
        resizable
        popup
        
        style={{ height: '80vh' }}
      />
    </div>
  )
}