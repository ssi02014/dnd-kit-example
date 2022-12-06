import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import DnDList from './components/DnDList';
import DnDItem from './components/DnDItem';

function App() {
  const [items, setItems] = useState<any>([
    {
      id: 'aa',
      value: '123',
    },
    {
      id: 'bb',
      value: '456',
    },
    {
      id: 'cc',
      value: '789',
    },
    {
      id: 'dd',
      value: '101112',
    },
    {
      id: 'ee',
      value: '12312dawdaw',
    },
    {
      id: 'ff',
      value: 'httpawdawdHDw/900x900',
    },
    {
      id: 'gg',
      value: 'hawdawdawdlash.com/-vr0gMUM6Fk/900x900',
    },
    {
      id: 'hh',
      value: 'awdawd',
    },
  ]);

  const onChange = (items: any) => {
    setItems(items);
  };

  return (
    <>
      <GlobalStyle />
      <DnDList
        items={items}
        onChange={onChange}
        renderItem={(item: any) => (
          <DnDItem key={item.id} id={item.id} value={item.value} />
        )}
      />
    </>
  );
}

const Wrapper = styled.div`
  width: 800px;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export default App;
