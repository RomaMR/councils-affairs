import { useContext } from 'react';
import { CouncillorsContext } from "../../providers/councillorsProvider/CouncillorsProvider";

export default function useCouncillorsContext() {
  const context = useContext(CouncillorsContext);
  if (!context) {
    throw new Error('useCouncillorsContext must be used within CouncillorsContext');
  }
  return context;
}
