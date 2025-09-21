import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  async function postTweet() {
    const res = await fetch("/api/tweet", { method: "POST" })
    const data = await res.json()
    alert(data.success ? "Tweet posted!" : "Error: " + JSON.stringify(data.error))
  }

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      {!session ? (
        <button onClick={() => signIn("twitter")}>
          Connect Twitter
        </button>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Signed in as {session.user?.name || "Twitter User"}</p>
          <button onClick={postTweet}>Post "hi"</button>
          <br /><br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  )
}
