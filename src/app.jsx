import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Fragment } from 'react';
import './styles/App.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import { ethers } from 'ethers';

const provider = new ethers.providers.AlchemyProvider("homestead", import.meta.env.VITE_MY_SECRET);


function UserCard({ user }) {
    const shortAddress = user.connectedAddress

    return (
        <div className="users">
            <img src={user.body.avatarUrl || 'https://framerusercontent.com/images/t9D85wTGZz6NlDcwkdk7BlwEvuw.svg'} alt={user.body.username} />
            <h3 className="weight">{user.body.displayName}</h3>
						
            <p>{user.body.bio}</p>
            <div className="logo-wrap">
                <a href={`https://warpcast.com/${user.body.username}`} target="_blank" rel="noopener noreferrer">
                    <img className="i" src='https://framerusercontent.com/images/t9D85wTGZz6NlDcwkdk7BlwEvuw.svg' alt="Warpcast logo" />

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
    const [errorMessage, setErrorMessage] = useState(null);

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
            // Check if the bio input is an ENS name, resolve it to an address
            if (bio.includes('.eth')) {
                bio = await provider.resolveName(bio);
            }

            // If the resolved address is null, don't make the request
            if (bio === null) {
                setErrorMessage("No matching ENS found. It may exist, but it's not a connected address in Farcaster");
                setUsers([]);
                return;
            }

            const response = await axios.get(`https://searchcaster.xyz/api/profiles?q=${bio}`);
            setUsers(response.data);
            setErrorMessage(null); // Reset the error message
        } catch (error) {
            console.log(error);
            setErrorMessage("An error occurred while fetching data.");
        }
    }




    const handleFormSubmit = (e) => {
        e.preventDefault();  // Prevent the form from causing a page refresh
        fetchUsersByBio(inputAddress);
        setSearchQuery(inputAddress); // Set the search query
        setInputAddress('');

    };


    return (
        <div>
            <div className="nav">
                <p className="app-title" onClick={handleLogoClick}> 👀 Findcaster</p>
                <a className="github" href="https://github.com/jongrinnellsf/findcaster_prototype" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />

                </a>
            </div>

            {users.length ? ( // If users array is not empty

                <div className="app">
                    <form className="shell" onSubmit={handleFormSubmit}>
                        <input
                            className="shell-text"
                            type="text"
                            value={inputAddress}
                            onChange={e => setInputAddress(e.target.value)}
                            placeholder="search for any user field, emoji, or ENS"
                        />
                        <button className="app-connect-button" type="submit">Submit</button>
                    </form>

                    <div><h1 className="fcpurple pad thin">Search results for <span className="white">'{searchQuery}' </span></h1>
                        {selectedInterest === "dad" && <div className="pad thin">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="fcpurple" href="https://zora.co/collect/eth:0x6a95180c60a721e6b041a5649a77a7b46902c07f"> dadcaster NFTs 🧢</a></div>}
                        {(selectedInterest === "purple" || searchQuery === "🟪") && <div className="pad thin">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="fcpurple" href="https://purple.construction/"> purple NFTs 🟪</a></div>}


                        {(selectedInterest === "🔵" || searchQuery === "base") && <div className="pad thin">These casters tend to own <a target="_blank" rel="noopener noreferrer" className="fcpurple" href="https://zora.co/collect/eth:0xd4307e0acd12cf46fd6cf93bc264f5d5d1598792"> Base, Introduced NFTs 🔵</a></div>}
                    </div>


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
                                placeholder="search for any user field, emoji, or ENS"
                            />
                            <button className="app-connect-button" type="submit">Submit</button>
                        </form>
                        {errorMessage && <div className="smaller">{errorMessage}</div>}

                        <p className="smaller">Browse by term</p>
                        <div className="buttongroup">
                            <button className="app-connect-button" onClick={() => fetchUsersByInterest("NFT")}>🖼️ nfts</button>
                            <button className="app-connect-button" onClick={() => fetchUsersByInterest("music")}>🎶 music</button>
                            <button className="app-connect-button" onClick={() => fetchUsersByInterest("dev")}>🛠️ devs</button>
													  <button className="app-connect-button" onClick={() => fetchUsersByInterest("founder")}>👩🏽‍💻 founders</button>

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

