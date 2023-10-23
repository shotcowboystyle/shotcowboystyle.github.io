import { useTimeAgo } from 'solidjs-use';

export function CurrentSessionStats() {
	const sessionStartedAt = sessionStorage.getItem('session-started-at');
	const timeAgo = useTimeAgo(new Date(sessionStartedAt!));

	return (
		<>
			<div class="stats self-center shadow">
				<div class="stat place-items-center">
					<div class="stat-title">You came to visit me</div>
					<div class="stat-value text-primary">{timeAgo()}</div>
					<div class="stat-desc">You're the best!</div>
				</div>
			</div>
		</>
	);
}
