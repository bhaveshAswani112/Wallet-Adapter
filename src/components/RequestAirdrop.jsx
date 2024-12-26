import { useContext, useState, useEffect } from "react";
import { WalletContext } from "../ConnectionContext";

const RequestAirdrop = () => {
  const [sol, setSol] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const { wallet, connection } = useContext(WalletContext);
  const [balance, setBalance] = useState();

  const handleChange = (e) => {
    setSol(e.target.value);
  };

  const fetchBalance = async () => {
    try {
      const data = await connection.getBalance(wallet.publicKey);
      setBalance(data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const requestdrop = async () => {
    try {
      setIsLoading(true);
      await connection.requestAirdrop(wallet.publicKey, sol * 1000000000);
      alert("Airdropped " + sol + " SOL to " + wallet.publicKey.toBase58());
      // Fetch the updated balance after the airdrop
      await fetchBalance();
    } catch (error) {
      console.error(error);
      alert("Error in dropping.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the balance when the component mounts
    fetchBalance();
  }, [wallet.publicKey]);

  return (
    <>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Enter the number of sol"
        value={sol}
      />
      <button onClick={requestdrop} disabled={loading}>
        {loading ? "Requesting..." : "Request Airdrop"}
      </button>

      <div>
        {balance ? `You have ${(balance / 1000000000)} SOL` : "Fetching balance..."}
      </div>
    </>
  );
};

export default RequestAirdrop;
