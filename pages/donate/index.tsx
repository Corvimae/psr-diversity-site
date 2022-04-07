import fetch from 'isomorphic-fetch'
import React from 'react';

export default function DonationPage() {
  return 'This page does not exist';
}

export async function getServerSideProps(_context) {
  const allEvents = await (await fetch(`https://psrdiversity.com/tracker/api/v1/search/?type=event`)).json();
  const activeEvents = allEvents.filter(item => !item.fields.locked && item.fields.allow_donations);

  if (activeEvents.length > 0) {
    return {
      redirect: {
        destination: `/tracker/ui/donate/${activeEvents[0].fields.short}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/tracker',
        permanent: false,
      },
    };
  }
}
