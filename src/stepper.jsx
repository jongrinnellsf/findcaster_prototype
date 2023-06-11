import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Fragment } from 'react';
import './styles/App.css';
import './styles/cal.css';


import Skeleton from '@mui/material/Skeleton';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QuizPage from './QuizPage';
import { Link } from 'react-router-dom';

import CalendarHeatmap from 'react-calendar-heatmap';

const validContractAddresses = [
    '0xB01946eeb7869438aE899d086896A727279AF1E5',
    '0xe6aA64DD6C3dCe257567b3BB13bAaeE6779728e3',
    '0x805712508445AC8883C048B639D7eAdF33C1EE35',
    '0xdC01a54eD81923F96aF4CF8fC7dB2B00a9366714',
    '0x889AC78027Be87ccf795eb79201B6E246e907384',
    '0x510ceaeEB06965d92880d2b5936F4fD259539018',
    '0xb02B34c48138464888A477a6F0CC96d8Ce2Fe3F0',
    '0xB7261b7ba8f20FbC2EcA0f31F4D776838a9ADA29',
    '0xeD5FD5BDCb0E1e49ccfDfd17fD0e1C8975bB6A1B',
    '0x930B0dED8EBaC6f176EC3fa96426CA74153b2e74',
    '0xcf3a9cb9e5146EA7e9D9C20717eE33E737F96211',
    '0x652Ad79cB9996C5e5E3de2f19e63eB5ae8b51ea8',
    '0xc626b3B66c97e8fE114723C7a9c1E16D6F2306ea'
]





function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	const [apiResult, setApiResult] = useState(null);


  const [address, setAddress] = useState(null);  

	const [inputAddress, setInputAddress] = useState(''); // New state for the input address


  const handleLogoClick = () => {
    window.location.reload();
  };


  const fetchAddressData = async (address) => {
    // Request the user's Ethereum address from the wallet extension
    let addr = address;


    if (addr) {
      setAddress(addr);

		let tasksCompleted=0;

      var myHeaders = new Headers();
      myHeaders.append("X-API-KEY", "jgrinnell0_sk_82c9299c-2e9b-4bf4-b826-6f972e678a22_8ew0pamll0470zzn");
			// myHeaders.append("X-API-KEY", mySecret);
			
      myHeaders.append("accept", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };


fetch(`https://api.simplehash.com/api/v0/nfts/owners?chains=base-goerli&wallet_addresses=${addr}&limit=50`, requestOptions)
    .then(response => response.json())
    .then(result => {
        // Filter the NFTs by contract addresses
        const filteredNFTs = result.nfts.filter(nft => validContractAddresses.includes(nft.contract_address));
        setApiResult({ ...result, nfts: filteredNFTs });

    })
    .catch(error => console.log('error', error));
		
			




      





      
    } else {
    alert('you need to submit a valid 0x ethereum address');
    }
  };

		const handleFormSubmit = (e) => {
    e.preventDefault();  // Prevent the form from causing a page refresh
    fetchAddressData(inputAddress);
			    if (!/^0x[a-fA-F0-9]{40}$/.test(inputAddress)) {
        alert('Please enter a valid Ethereum address');
        return;
    }
  };
	
  return (

    
		<div>



        <div className="nav"> 
    <p className="app-title" onClick={handleLogoClick}>🔵 BASE CAMP NFTs</p>


      </div>

      {address ? (
      <div className="app">


      <Fragment>



          {address ? (
<p></p>

        ) 
					: (
          <div className="score-skeleton"><Skeleton sx={{ bgcolor: '#272E2B' }}  
  variant="rounded"
  height={400}/></div>

        )}




				
     <Box sx={{ width: '90%' }}>
  {/* <div className="heatmap">
		<h1 className="cb-blue">Your Base Transaction Heatmap</h1>
    <CalendarHeatmap
      startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
      endDate={new Date()}
      values={heatmapData}
      showWeekdayLabels={true}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        // return `color-github-${Math.min(value.count, 4) + 1}`;
				        return `color-github-${(value.count, 1)}`;

      }}
      titleForValue={(value) =>
        value ? `${value.date}: ${value.count} transactions` : null
      }
    />

  </div> */}
			 						<h1 className="cb-blue">Base Camp NFTs for {inputAddress.substring(0, 5)}...</h1>

    </Box>

				  <div className="app2">
{apiResult?.nfts?.filter(nft => nft.name !== null).map(nft => (
	<div className="nft" key={nft.id}>
        <img src={nft.previews.image_small_url} alt={nft.name} />
        <p>{nft.name}</p>
      </div>
    ))}
    
  </div>

    </Fragment></div>
      ) : (

        <div>
          <div className="header">
            <h2>Are you earning Base Camp NFTs, anon?</h2>
            <form onSubmit={handleFormSubmit}>
              <input 
                type="text" 
                value={inputAddress} 
                onChange={e => setInputAddress(e.target.value)} 
                placeholder="Enter your Ethereum address" 
              />
              <button className="app-connect-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
			
    )}
    </div>
		

  );

}
