import dynamic from 'next/dynamic';
import fetch from 'isomorphic-fetch'
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Metadata } from '../../components/Metadata';
import { Run, EventMetadata } from '../../utils/types';

export interface ScheduleProps {
  runs: Run[]
  event: EventMetadata;
}

const NoSSRScheduleView = dynamic(() => import('../../components/ScheduleView'), {
  ssr: false,
});

export default function Schedule({ runs, event }: ScheduleProps) {
  return (
    <Container>
      <Metadata />
      <Header>
        <HeaderLogo />
        <Title>{event.name}</Title>
      </Header>
      <NoSSRScheduleView runs={runs} />
    </Container>
  )
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

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`;


const Header = styled.header`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
`;

const HeaderLogo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url("/images/logo.png");
  background-size: contain;
`;

const Title = styled.h1`
  margin-left: 2rem;
  font-size: 5rem;
  color: #fff;
  font-weight: 700;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`;
