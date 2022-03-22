import fetch from 'isomorphic-fetch'
import React from 'react';
import ScheduleLayout, { ScheduleLayoutProps } from '../../components/ScheduleLayout';

export default function Schedule(props: ScheduleLayoutProps) {
  return <ScheduleLayout {...props} />
}

export async function getServerSideProps(_context) {
  const allEvents = await (await fetch(`https://psrdiversity.com/tracker/api/v1/search/?type=event`)).json();
  const activeEvents = allEvents.filter(item => !item.locked);
  const event = activeEvents.reduce((acc, item) => item.pk > acc.pk ? item : acc) ?? activeEvents[activeEvents.length - 1];
  const runsResponse = await fetch(`https://psrdiversity.com/tracker/api/v1/search/?type=run&event=${event.pk}`);

  return {
    props: {
      runs: (await runsResponse.json()).map(({ pk, fields }) => ({ ...fields, id: pk })),
      event: { ...event.fields, id: event.pk },
    },
  }
}
