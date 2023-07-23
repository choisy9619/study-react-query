import { create } from 'zustand';

import { type IAlertMessage } from '@/interfaces';

export const useAlertMessage = create<IAlertMessage>((set) => ({
    alertMessage: '',
    setAlertMessage: (alertMessage) => set({ alertMessage }),
}));
