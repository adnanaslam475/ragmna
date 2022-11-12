import { useEffect, useRef } from "react";


export const handlePreventInput = (event, notAllowedCharacters) => {
    if (notAllowedCharacters.includes(event.key)) {
        return event.preventDefault();
    }
}
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
export default usePrevious;