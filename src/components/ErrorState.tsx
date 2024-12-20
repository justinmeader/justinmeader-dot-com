export default function ErrorState({ message }: { message: string }) {
  return (
    <div class="text-center py-8">
      <div class="text-red-600 dark:text-red-400 font-semibold mb-2">Error loading content</div>
      <div class="text-sm opacity-75">{message}</div>
    </div>
  );
}