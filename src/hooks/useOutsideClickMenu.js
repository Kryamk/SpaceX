import { useEffect, useRef } from "react";

export function useOutsideClickMenu(elementRef, btnRef, handler, attached = true) {

	useEffect(() => {
		if (!attached) return;

		const handleClick = (e) => {
			if (!elementRef.current || !btnRef.current) return;
			if (!elementRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
				handler();
			}
		};
		document.addEventListener("mousedown", handleClick);
		document.addEventListener("touchstart", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("touchstart", handleClick);
		};
	}, [elementRef, btnRef, handler, attached]);
}
