import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import SimpleSortableItem from './components/SimpleSortableItem';

const ITEMS = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
];

const App: React.FC = () => {
  const [items, setItems] = useState(ITEMS);

  return (
    <div>
      <h1>Sortable List</h1>
      {/* <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]}> */}
      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over == null) {
            return;
          }
          if (active.id !== over.id) {
            setItems((items) => {
              const oldIndex = items.findIndex((item) => item.id === active.id);
              const newIndex = items.findIndex((item) => item.id === over.id);
              return arrayMove(items, oldIndex, newIndex);
            });
          }
        }}
      >
        <SortableContext items={items}>
          {items.map((item, index) => (
            <div       style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px', // アイテム間のマージンを追加
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease',
            }}>
              <div style={{marginRight: '10px', fontWeight: 'bold' }}>{index + 1}</div>
              <SimpleSortableItem key={item.id} item={item} />
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
