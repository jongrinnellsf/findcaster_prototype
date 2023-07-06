import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Fragment } from 'react';
import './styles/App.css';
// import './fc.png';
// import './es.png';
import axios from 'axios';

function UserCard({ user }) {
  const shortAddress = user.connectedAddress 

  return (
    <div className="users">
			<img src={user.body.avatarUrl || 'src/fc.png'} alt={user.body.username} />
      <h3>{user.body.displayName}</h3>

      <p>{user.body.bio}</p>
			<div className="logo-wrap">
					<a href={`https://warpcast.com/${user.body.username}`} target="_blank" rel="noopener noreferrer">
<img className="i" src='https://www.farcaster.xyz/icon.png' alt="Farcaster logo" />

        </a>

      {shortAddress && 
					<a href={`https://etherscan.io/address/${user.connectedAddress}`} target="_blank" rel="noopener noreferrer">
<img className="i" src='https://cdn-images-1.medium.com/v2/resize:fit:176/1*MxpMgwpR-_fXBou_ftL4qg@2x.png' alt="Etherscan logo" />

        </a>
      }
		<span className="cb-blue fid">fid: {user.body.id}</span>

				</div>
    </div>
  );
}

export default function App() {
  const [value, setValue] = useState(0);
	const [selectedInterest, setSelectedInterest] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const fetchUsersByInterest = async (interest) => {
    setAddress(null);
		setSelectedInterest(interest);  // Save the selected interest

    try {
      const response = await axios.get(`https://searchcaster.xyz/api/profiles?q=${interest}`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [apiResult, setApiResult] = useState(null);
  const [users, setUsers] = useState([]);
  const [address, setAddress] = useState(null);  
  const [inputAddress, setInputAddress] = useState(''); // New state for the input address

  const handleLogoClick = () => {
    window.location.reload();
  };

  const fetchUsersByBio = async (bio) => {
    try {
      const response = await axios.get(`https://searchcaster.xyz/api/profiles?q=${bio}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

	
  const handleFormSubmit = (e) => {
    e.preventDefault();  // Prevent the form from causing a page refresh
    fetchUsersByBio(inputAddress);
  };

	return (
    <div>
      <div className="nav"> 
        <p className="app-title" onClick={handleLogoClick}> Findcaster</p>
      </div>

      {users.length ? ( // If users array is not empty
        <div className="app">
            <h1 className="cb-blue">Search results</h1>
          {selectedInterest === "dad" && <div className="noty"><div className="noty-text pad">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="cb-blue" href="https://zora.co/collect/eth:0x6a95180c60a721e6b041a5649a77a7b46902c07f"> dadcaster NFTs 🧢</a></div></div>}
          {selectedInterest === "purple" && <div className="noty"><div className="noty-text pad">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="cb-blue" href="https://purple.construction/"> purple NFTs 🟪</a></div></div>}
          {selectedInterest === "🔵" && <div className="noty"><div className="noty-text pad">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="cb-blue" href="https://zora.co/collect/eth:0xd4307e0acd12cf46fd6cf93bc264f5d5d1598792"> base, introduced NFTs 🔵</a></div></div>}

          <div className="parent">
            {users.map(user => (
              <UserCard key={user.body.id} user={user} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="header">
            <h2 className="Findcaster">Findcaster</h2>
            <form onSubmit={handleFormSubmit}>
              <input 
                type="text" 
                value={inputAddress} 
                onChange={e => setInputAddress(e.target.value)} 
                placeholder="search for any user, user field, or emoji" 
              />
              <button className="app-connect-button" type="submit">Submit</button>
            </form>
              <p className="smaller">Browse by term</p>
						<div className="buttongroup">
              <button className="app-connect-button" onClick={() => fetchUsersByInterest("NFT")}>🖼️ nfts</button>
						  <button className="app-connect-button" onClick={() => fetchUsersByInterest("music")}>🎶 music</button>
						  <button className="app-connect-button" onClick={() => fetchUsersByInterest("purple")}>🟪 purple</button>
							<button className="app-connect-button" onClick={() => fetchUsersByInterest("🔵")}>🔵</button>
							<button className="app-connect-button" onClick={() => fetchUsersByInterest("dad")}>🧢 dads</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

