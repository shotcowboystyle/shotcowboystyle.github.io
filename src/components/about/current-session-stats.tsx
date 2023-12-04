// import { timeSince } from '@/utils/date';
// import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

// export const CurrentSessionStats = component$(() => {
// 	const timeAgo = useSignal('0 minutes');

// 	useVisibleTask$(({ cleanup }) => {
// 		const update = () => {
// 			const sessionStartedAt = sessionStorage.getItem('session-started-at');
// 			timeAgo.value =
// 				(sessionStartedAt && timeSince(new Date(sessionStartedAt))) || 'Error checking time frame';
// 		};
// 		const id = setInterval(update, 60000);
// 		cleanup(() => clearInterval(id));
// 	});

// 	return (
// 		<>
// 			<div class="stats self-center shadow">
// 				<div class="stat place-items-center">
// 					<div class="stat-title">You came to visit me</div>
// 					<div class="stat-value text-primary">{timeAgo}</div>
// 					<div class="stat-desc">You're the best!</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// });
