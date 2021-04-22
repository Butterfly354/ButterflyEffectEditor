import React, { useState, createContext } from 'react';
import { groupDictionary } from './backend/SmartUndoManager/SmartUndoManager';

export const GroupContext = createContext();

export const GroupProvider = (props) => {
  const [groupDict, setGroupDict] = useState(groupDictionary);

  return (
    <GroupContext.Provider value={[groupDict, setGroupDict]}>
      {props.children}
    </GroupContext.Provider>
  );
};
