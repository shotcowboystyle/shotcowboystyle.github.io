import type { JSX } from 'solid-js';

export type SolidWrapperProps = {
	children?: JSX.Element;
};

export function SolidWrapper(props: SolidWrapperProps) {
	return <>{props.children}</>;
}
