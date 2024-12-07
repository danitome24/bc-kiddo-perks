# 🏗 KiddoPerks

**KiddoPerks** is a **task-based allowance** platform designed to teach children about responsibility, money management, and financial education, using **blockchain** to ensure transparency and traceability of rewards. Parents can register household and school tasks completed by their children, rewarding them with digital tokens that can be redeemed for family activities or rewards.

## Features

- **Task Registration**: Parents can create a list of tasks for their children, assigning a monetary or token value to each.
- **Digital Rewards**: Upon completing tasks, children earn digital tokens which can be redeemed for rewards or family activities.
- **Transparency and Traceability**: By using blockchain, all tasks and rewards are recorded immutably, ensuring transparency and trust.
- **Financial Education**: Through this system, children learn basic financial concepts, such as saving and responsible spending.

* **Family Dashboard**: Parents have access to a dashboard where they can track their children's progress and adjust tasks and rewards.

## Technologies

- **Blockchain**: Used to record completed tasks and rewards, ensuring transparency.
- **Smart Contracts**: Manage the reward system and creation of family tokens.
- **ScaffoldEth**: Framework used to build the user interface of the web platform.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/danitome24/bc-kiddo-perks.git
   ```

2. Install dependencies
   Navigate to the project directory and install the required dependencies:

```bash
cd bc-kiddo-perks
yarn install
```

## Set up environment variables

Ensure you have set the necessary environment variables for interacting with the blockchain (e.g., Infura API keys, contract addresses, etc.). Create a .env file in the root of the project and add the following information:

```
REACT_APP_INFURA_URL=<Your Infura URL>
REACT_APP_CONTRACT_ADDRESS=<Your Smart Contract Address>
REACT_APP_PRIVATE_KEY=<Your Wallet Private Key>
```

## Start the development server

Once the environment variables are set, you can start the development server to run the app locally:

```bash
yarn start
```

The app will be available at http://localhost:3000.

## Usage

1. **Register Tasks**: Parents can create tasks from the dashboard, assigning a token value to each.
2. **Complete Tasks**: Children mark tasks as completed, and the system validates them, awarding the corresponding tokens.
3. **View Rewards**: Children can see their accumulated tokens and redeem them for rewards defined by their parents.
4. **View History**: Parents can review the history of tasks and rewards through the dashboard.

## Smart Contracts

The system uses smart contracts to manage tasks, rewards, and tokens. Be sure to deploy and link the contracts properly on the blockchain for the functionalities to work.

## Deploying Smart Contracts

1. Compile and deploy contracts:

```bash
yarn chain
```

```bash
yarn deploy --reset
```

2. Configure contracts: Make sure the contracts are correctly set up to interact with the frontend.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch `git checkout -b feature/my-new-feature`.
3. Make your changes and ensure the code is well-tested.
4. Commit your changes `git commit -am 'Add new feature'`.
5. Push to the branch `git push origin feature/my-new-feature`.
6. Open a pull request describing the changes you've made.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
