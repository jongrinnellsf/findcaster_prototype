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
      <h3 className="weight">{user.body.displayName}</h3>

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
				<div className="fid ">fid: {user.body.id}</div>

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

	const [searchQuery, setSearchQuery] = useState('');



  const fetchUsersByInterest = async (interest) => {
    setAddress(null);
		setSelectedInterest(interest);  // Save the selected interest
  setSearchQuery(interest); // Set the search query

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
		  setSearchQuery(inputAddress); // Set the search query

  };


	return (
    <div>
      <div className="nav"> 
        <p className="app-title" onClick={handleLogoClick}> 🔍 Findcaster</p>
				<a className= "github" href="https://github.com/jongrinnellsf/findcaster_prototype" target="_blank" rel="noopener noreferrer">
        <img src="data:image/png;base64,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" alt="GitHub logo" style={{width: '25px', height: '25px'}} />
      </a>
      </div>

      {users.length ? ( // If users array is not empty
        <div className="app">
            <h1 className="fcpurple thin">Search results for '{searchQuery}' </h1>
          {selectedInterest === "dad" && <div className="noty"><div className="noty-text pad">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="fcpurple" href="https://zora.co/collect/eth:0x6a95180c60a721e6b041a5649a77a7b46902c07f"> dadcaster NFTs 🧢</a></div></div>}
          {selectedInterest === "purple" && <div className="noty"><div className="noty-text pad">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="fcpurple" href="https://purple.construction/"> purple NFTs 🟪</a></div></div>}
          {selectedInterest === "🔵" && <div className="noty"><div className="noty-text pad">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="fcpurple" href="https://zora.co/collect/eth:0xd4307e0acd12cf46fd6cf93bc264f5d5d1598792"> base, introduced NFTs 🔵</a></div></div>}

          <div className="parent">
            {users.map(user => (
              <UserCard key={user.body.id} user={user} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="header">
            <h2 className="weight">Findcaster</h2>
            <form onSubmit={handleFormSubmit}>
              <input 
                type="text" 
                value={inputAddress} 
                onChange={e => setInputAddress(e.target.value)} 
                placeholder="search for any user field, emoji, or 0x ethereum address" 
              />
              <button className="app-connect-button" type="submit">Submit</button>
            </form>
              <p className="smaller">Browse by term</p>
						<div className="buttongroup">
              <button className="app-connect-button" onClick={() => fetchUsersByInterest("NFT")}>🖼️ nfts</button>
						  <button className="app-connect-button" onClick={() => fetchUsersByInterest("music")}>🎶 music</button>
							<button className="app-connect-button" onClick={() => fetchUsersByInterest("dev")}>🛠️ devs</button>
						  <button className="app-connect-button" onClick={() => fetchUsersByInterest("purple")}>🟪 purple</button>
							<button className="app-connect-button" onClick={() => fetchUsersByInterest("🔵")}>🔵</button>
							<button className="app-connect-button" onClick={() => fetchUsersByInterest("dad")}>🧢 dads</button>
						
						</div>
						
          </div>
        </div>
      )}
    </div>
  );
}

