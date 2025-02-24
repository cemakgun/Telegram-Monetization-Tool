/**
 * Root Page Component
 * The main entry point for the application's content
 * Renders the Home component within the root layout
 */

import Home from './Home';

/**
 * Page Component
 * Serves as the container for the main content
 * Uses the App Router pattern from Next.js 14
 */
export default function Page() {
  return (
    <main>
      <Home />
    </main>
  );
}
