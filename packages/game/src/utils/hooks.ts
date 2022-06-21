
import { useState, useRef } from 'react';

export const useMutableState = (initialValue?: any) => {
    const [value, setValue] = useState<any>(initialValue);
    const valueRef = useRef(value);
    valueRef.current = value;

    return [valueRef, setValue] as const;
};
