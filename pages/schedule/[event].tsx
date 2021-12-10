import { format, isSameDay, parseISO } from 'date-fns';
import fetch from 'isomorphic-fetch'
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Metadata } from '../../components/Metadata';

interface Run {
  id: number;
  event: number;
  name: string;
  display_name: string;
  twitch_name: string;
  deprecated_runners: string;
  console: string;
  commentators: string;
  description: string;
  starttime: string;
  endttime: string;
  order: number;
  run_time: string;
  setup_time: string;
  coop: boolean;
  category: string;
  release_year: number;
  giantbomb_id: number | null;
  canonical_url: string;
  public: string;
  runners: number[];
}

interface ScheduleProps {
  runs: Run[]
  event: {
    id: number;
    short: string;
    name: string;
    hashtag: string;
    use_one_step_screening: boolean;
    receivername: string;
    targetamount: number;
    minimumdonation: number;
    paypalemail: string;
    paypalcurrency: string;
    datetime: string;
    timezone: string;
    locked: boolean;
    allow_donations: boolean;
    canonical_url: string;
    public: string;
    amount: number;
    count: number;
    max: number;
    avg: number;
  }
}

export default function Schedule({ runs, event }: ScheduleProps) {
  const runList = useMemo(() => runs.filter(({ order }) => order !== null).sort((a, b) => a.order - b.order), [runs]);
  
  return (
    <Container>
      <Metadata />
      <Header>
        <HeaderLogo />
        <Title>{event.name}</Title>
      </Header>
      <ScheduleContainer>
        <ScheduleList>
          {runList.map((run, index) => {
            const previousRun = runList[index - 1];
            const runStart = parseISO(run.starttime);

            const previousRunStart = previousRun && parseISO(previousRun.starttime);

            const isNewDate = previousRun === null || previousRun === undefined || !isSameDay(runStart, previousRunStart);

            return (
              <ScheduleSegment key={run.id}>
                {isNewDate && (
                  <DateSeparator>{format(runStart, 'EEEE, MMMM do')}</DateSeparator>
                )}
                <Run>
                  <div>
                    <RunInfoRow>{format(runStart, 'h:mm a')}</RunInfoRow>
                    <RunSubinfoRow>{run.run_time}</RunSubinfoRow>
                  </div>
                  <div>
                    <RunInfoRow>{run.display_name}</RunInfoRow>
                    {run.category && (<RunSubinfoRow>{run.category}</RunSubinfoRow>)}
                  </div>
                  <div>{run.deprecated_runners}</div>
                </Run>
              </ScheduleSegment>
            )
          })}
        </ScheduleList>
      </ScheduleContainer>
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

const ScheduleContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 0;
  align-self: stretch;
  flex-grow: 1;
  overflow-y: auto;
`;

const ScheduleList = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  background-color: rgba(255, 255, 255, 0.5);
`

const ScheduleSegment = styled.div`
  display: contents;
`;

const Run = styled.div`
  display: contents;

  & > div {
    color: #000;
    font-weight: 400;
    font-size: 1.25rem;
    padding: 0.5rem 0.5rem;
  }

  & + & > div {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

const DateSeparator = styled.div`
  position: sticky;
  top: 0;
  grid-column: 1 / -1;
  color: #fff;
  font-size: 2rem;
  padding: 0.5rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.75);
`;

const RunInfoRow = styled.div`
  & + & {
    margin-top: 0.5rem;
  }
`;

const RunSubinfoRow = styled(RunInfoRow)`
  font-size: 1rem;
`;