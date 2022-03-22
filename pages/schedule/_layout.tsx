import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';
import { Metadata } from '../../components/Metadata';
import { Run, EventMetadata } from '../../utils/types';

export interface ScheduleLayoutProps {
  runs: Run[]
  event: EventMetadata;
}

const NoSSRScheduleView = dynamic(() => import('../../components/ScheduleView'), {
  ssr: false,
});

export default function ScheduleLayout({ runs, event }: ScheduleLayoutProps) {
  return (
    <Container>
      <Metadata title={event.name} description={runs.length ? `A speedrun marathon by PSR Diversity starting on ${format(parseISO(runs[0].starttime), 'EEEE, MMMM do')}.` : 'A speedrun marathon by PSR Diversity.'} />
      <Header>
        <HeaderLogo />
        <TitleContainer>
          <Title>{event.name}</Title>
          <Subtitle>All times are displayed in your local timezone.</Subtitle>
        </TitleContainer>
      </Header>
      <NoSSRScheduleView runs={runs} />
    </Container>
  )
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
  
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const TitleContainer = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 800px) {
    margin: 0;
  }
`;

const Title = styled.h1`
  font-size: 5rem;
  color: #fff;
  font-weight: 700;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

  @media screen and (max-width: 800px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.h3`
  margin: 1rem 0 0;
  font-size: 1.5rem;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  color: #fff;
  font-weight: 700;

  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`
