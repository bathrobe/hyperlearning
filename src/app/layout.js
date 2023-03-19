import { AuthProvider } from 'src/components/AuthProvider';
import createClient from 'src/lib/supabase-server';

import 'src/styles/globals.css';

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-3xl px-4 py-8">
          <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
