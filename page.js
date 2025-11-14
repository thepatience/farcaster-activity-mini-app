import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkAll() {
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
      });
      const data = await r.json();
      setResult(data);
    } catch (e) {
      setResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth:760, margin:"24px auto", padding:20 }}>
      <header style={{ display:"flex", gap:16, alignItems:"center" }}>
        <div style={{ width:80, height:80, borderRadius:20, background:"#FFD166", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>
          🎉
        </div>
        <div>
          <h1 style={{ margin:0, fontSize:28 }}>Farcaster Airdrop Fun Checker</h1>
          <p style={{ margin:0, color:"#6b6b6b" }}>Cartoon-style estimator — checks points, age, Base activity & airdrop potential.</p>
        </div>
      </header>

      <section style={{ marginTop:20, padding:16, borderRadius:12, background:"#FFF3E0", boxShadow:"0 6px 18px rgba(0,0,0,0.06)" }}>
        <label style={{ display:"block", fontWeight:600, marginBottom:8 }}>Wallet address (0x...)</label>
        <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="0x..." style={{ width:"100%", padding:12, borderRadius:10, border:"2px dashed #FFB703", fontSize:16 }} />

        <div style={{ display:"flex", gap:12, marginTop:12 }}>
          <button onClick={checkAll} disabled={loading} style={{ flex:1, padding:12, borderRadius:12, fontWeight:700, background:"#06D6A0", border:"none" }}>
            {loading ? "Checking..." : "Check All"}
          </button>
          <button onClick={()=>{ setAddress(""); setResult(null); }} style={{ padding:12, borderRadius:12, background:"#FFD166", border:"none" }}>Reset</button>
        </div>

        <small style={{ display:"block", marginTop:8, color:"#9E6F21" }}>Note: This is an estimator. For real airdrops, follow official project rules.</small>
      </section>

      {result && (
        <section style={{ marginTop:20 }}>
          {result.error ? (
            <div style={{ padding:16, borderRadius:12, background:"#FFE5E5" }}>Error: {result.error}</div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div style={{ padding:12, borderRadius:12, background:"#E6F9F2" }}>
                <h3>Farcaster Profile</h3>
                <p><strong>Username:</strong> {result.farcaster.username}</p>
                <p><strong>Joined:</strong> {result.farcaster.createdAt}</p>
                <p><strong>Age:</strong> {result.farcaster.age}</p>
                <p><strong>Casts:</strong> {result.farcaster.casts}</p>
                <p><strong>Followers:</strong> {result.farcaster.followers}</p>
                <p><strong>Points:</strong> {result.farcaster.points}</p>
              </div>

              <div style={{ padding:12, borderRadius:12, background:"#EDE7F6" }}>
                <h3>Base Activity</h3>
                <p><strong>Tx count:</strong> {result.base.txCount}</p>
                <p><strong>Volume (approx):</strong> {result.base.volume}</p>
                <p><strong>Wallet age:</strong> {result.base.walletAge}</p>
                <p><strong>Smart Wallet:</strong> {result.base.smartWallet ? "Yes" : "No"}</p>
                <p><strong>Potential:</strong> {result.base.potential}</p>
              </div>

              <div style={{ gridColumn:"1 / -1", padding:12, borderRadius:12, background:"#FFF7E6" }}>
                <h3>Overall Airdrop Potential</h3>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:120, height:120, borderRadius:999, background:"#FFB6C1", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:800 }}>
                    {result.overall.score}%
                  </div>
                  <div>
                    <p style={{ margin:0, fontWeight:700 }}>{result.overall.label}</p>
                    <p style={{ margin:0, color:"#6b6b6b" }}>{result.overall.explanation}</p>
                  </div>
                </div>

                <div style={{ marginTop:12 }}>
                  <h4>Breakdown</h4>
                  <ul>
                    <li>Account age contribution: {Math.round(result.breakdown.age*100)}%</li>
                    <li>Activity contribution: {Math.round(result.breakdown.activity*100)}%</li>
                    <li>Base onchain contribution: {Math.round(result.breakdown.onchain*100)}%</li>
                    <li>Followers: {Math.round(result.breakdown.followers*100)}%</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
