export default function LoadingState() {
  return (
    <div class="animate-pulse space-y-4">
      <div class="h-4 bg-black/10 dark:bg-white/10 rounded w-3/4"></div>
      <div class="h-4 bg-black/10 dark:bg-white/10 rounded"></div>
      <div class="h-4 bg-black/10 dark:bg-white/10 rounded w-5/6"></div>
    </div>
  );
}