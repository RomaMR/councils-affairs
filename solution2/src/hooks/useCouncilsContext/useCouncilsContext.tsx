import { useContext } from 'react';
import { CouncilsContext } from "../../providers/councilsProvider/CouncilsProvider";

export default function useCouncilsContext() {
  const context = useContext(CouncilsContext);
  if (!context) {
    throw new Error('useCouncilsContext must be used within CouncilsContext');
  }
  return context;
}
