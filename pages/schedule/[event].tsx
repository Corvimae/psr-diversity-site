import fetch from 'isomorphic-fetch'
import React from 'react';
import ScheduleLayout, { ScheduleLayoutProps } from '../../components/ScheduleLayout';

export default function Schedule(props: ScheduleLayoutProps) {
  return <ScheduleLayout {...props} />
}

export async function getServerSideProps(context) {
  const runsResponse = await fetch(`https://psrdiversity.com/tracker/api/v1/search/?type=run&event=${context.query.event}`);
  const eventResponse = await fetch(`https://psrdiversity.com/tracker/api/v1/search/?type=event&id=${context.query.event}`);

  return {
    props: {
      runs: (await runsResponse.json()).map(({ pk, fields }) => ({ ...fields, id: pk })),
      event: (await eventResponse.json()).map(({ pk, fields }) => ({ ...fields, id: pk }))[0],
    },
  }
}
