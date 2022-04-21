import React, { useMemo } from 'react';
import styled from 'styled-components'
import { format, isSameDay, parseISO } from 'date-fns';
import { Run } from '../utils/types';

interface ScheduleViewProps {
  runs: Run[];
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ runs }) => {
  const runList = useMemo(() => {
    const sorted = runs.filter(({ order }) => order !== null).sort((a, b) => a.order - b.order);

    return sorted.map((run, index) => {
      const previousRun = sorted[index - 1];
      const runStart = parseISO(run.starttime);

      const previousRunStart = previousRun && parseISO(previousRun.starttime);

      const isNewDate = previousRun === null || previousRun === undefined || !isSameDay(runStart, previousRunStart);
      
      return {
        ...run,
        isNewDate,
        parsedStart: runStart,
      }
    });
  }, [runs]);

  return (
    <ScheduleContainer>
      <ScheduleList>
        {runList.map(run => (
          <React.Fragment key={run.id}>
            {run.isNewDate && (
              <DateSeparator>{format(run.parsedStart, 'EEEE, MMMM do')}</DateSeparator>
            )}
            <RunRow>
              <div>
                <RunInfoRow>{format(run.parsedStart, 'h:mm a')}</RunInfoRow>
                <RunSubinfoRow>{run.run_time}</RunSubinfoRow>
              </div>
              <div>
                <RunInfoRow>{run.display_name}</RunInfoRow>
                {run.category && (<RunSubinfoRow>{run.category}</RunSubinfoRow>)}
              </div>
              <RunnerList>{run.deprecated_runners}</RunnerList>
            </RunRow>
          </React.Fragment>
        ))}
      </ScheduleList>
    </ScheduleContainer>
  );
}

export default ScheduleView;

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
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 800px) {
    grid-template-columns: max-content 1fr;
  }
`

const RunRow = styled.div`
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
  background-color: #333;

  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

const RunInfoRow = styled.div`
  & + & {
    margin-top: 0.5rem;
  }
`;

const RunSubinfoRow = styled(RunInfoRow)`
  font-size: 1rem;
`;

const RunnerList = styled.div`
  @media screen and (max-width: 800px) {
    grid-column: 2;
    &&& {
      border-top: none;
    }
  }
`;