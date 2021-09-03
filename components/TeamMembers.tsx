import React from 'react';
import styled from 'styled-components';

export const TeamMembers: React.FC = () => (
  <Container>
    <Title>Team Members</Title>
    <MemberSelector>
      <MemberList />
      <SelectedMember>
        <SelectedMemberName>Todo</SelectedMemberName>
        <SelectedMemberDescription>Todo</SelectedMemberDescription>
      </SelectedMember>
    </MemberSelector>
  </Container>
);

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  color: #fff;
`;

const Title = styled.h2`
  width: max-content;
  text-align: center;
  margin: 1rem auto;
  padding: 1rem 2rem;
  font-size: 2rem;
  font-weight: 700;
  background-color: #fff;
  border-radius: 1000px;
  color: #000;
  box-shadow: 0px 0px 0.75rem 0.25rem rgba(0, 0, 0, 0.1);
`;

const MemberSelector = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: row;
  background-color: #4f4f4f;
  border-top: 1px solid #3d3d3d;
  box-shadow: inset 0px 0px 0.75rem 0.25rem rgba(0, 0, 0, 0.1);
`;

const MemberList = styled.ul`
  width: max-content;
  list-style: none;
  margin: 0;
  border-right: 1px solid #3d3d3d;
  overflow-x: hidden;
  overflow-y: auto;

  & li {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding: 1rem;

    &:active {
      background-color: #95bfce;
    }

    &:not(.active):hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    & img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }

    & span {
      margin-left: 1rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
    }

    &.active span {
      color: #053141;
    }
  }
`;

const SelectedMember = styled.div`
  min-width: 0;
  min-height: 400px;
  align-self: stretch;
  flex-grow: 1;
  padding: 1rem;
  background-color: #95bfce;
  color: #053141;  
`;

const SelectedMemberName = styled.h3`
  font-size: 3rem;
  font-weight: 700;
`;

const SelectedMemberDescription = styled.p`
  font-size: 3rem;
  font-weight: 700;
`;

