export const metadata = {
  title: 'Farcaster Cartoon Airdrop Checker',
  description: 'Playful Farcaster + Base airdrop estimator'
};
export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin:0, fontFamily:"Inter, system-ui, sans-serif", background:"#FFF9F0" }}>
        {children}
      </body>
    </html>
  );
}
