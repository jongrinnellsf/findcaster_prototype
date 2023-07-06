# FindCaster

FindCaster is a web application created with React.js. The application connects to the Searchcaster API and provides a comprehensive way to look for user profiles in Farcaster based on their bio or interests. 

## Main Features

1. **Profile Search**: Users can search for any user, user field, or emoji using the search box provided. On submission of the search query, the application fetches all the relevant user profiles that match the search query from the Searchcaster API.

2. **Browse by term**: Besides the manual search feature, the application also provides buttons to fetch users by predefined terms like "Music", "NFTs", and "Purple".

3. **Profile Display**: The search results are displayed as individual user cards, each containing the user's display name, bio, and links to their Warpcast and Etherscan profiles. 

## UserCard

The UserCard component takes a user object as props and returns a user card displaying the user's information. Each user card contains:

- The user's avatar (or a default image if none exists)
- The user's display name
- The user's bio
- Links to their Warpcast and Etherscan profiles, represented by their respective logos

## Installation

1. Clone the repository
2. Navigate to the project directory and run `npm install`
3. Run the app in development mode using `npm start`
4. Open `http://localhost:3000` to view the app in the browser

## Dependencies

- React.js
- Axios
- PropTypes

Please note that the application fetches data from the Searchcaster API and as such, will need internet connectivity to function properly.

## Contributing

Pull requests are welcome. Please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
