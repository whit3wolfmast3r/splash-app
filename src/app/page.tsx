export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Splash App is Live!</h1>
      <p className="opacity-70 text-lg">Go to <span className="text-blue-400 font-mono">/test</span> in the URL bar to see a profile.</p>
    </main>
  );
}