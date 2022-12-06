import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import SortableList from './components/SortableList';
import SortableItem from './components/SortableItem';

interface Items {
  id: number | string;
  value: string;
}
function App() {
  const [items, setItems] = useState<Items[]>([
    { id: 'aa', value: 'aa' },
    { id: 'bb', value: 'bb' },
    { id: 'cc', value: 'cc' },
    { id: 'dd', value: 'dd' },
    { id: 'ee', value: 'ee' },
    { id: 'ff', value: 'ff' },
    { id: 'gg', value: 'gg' },
    { id: 'hh', value: 'hh' },
    { id: 'ii', value: 'ii' },
    { id: 'jj', value: 'jj' },
  ]);

  const onChange = (items: any) => {
    setItems(items);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <SortableList
          items={items}
          onChange={onChange}
          renderItem={(item: Items) => (
            <SortableItem id={item.id}>{item.value}</SortableItem>
          )}
        />
      </Wrapper>
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
