import {
  IKeyringAccountState,
  IWalletState,
  KeyringAccountType,
} from './types';

export const initialActiveHdAccountState: IKeyringAccountState = {
  address: '',
  balances: {
    ethereum: 0,
    syscoin: 0,
  },
  id: 0,
  isTrezorWallet: false,
  label: 'Account 1',
  xprv: '',
  xpub: '',
  isImported: false,
};

export const initialActiveImportedAccountState: IKeyringAccountState = {
  ...initialActiveHdAccountState,
  isImported: true,
};

export const initialActiveTrezorAccountState: IKeyringAccountState = {
  ...initialActiveHdAccountState,
  isTrezorWallet: true,
};

export const initialNetworksState = {
  syscoin: {
    57: {
      chainId: 57,
      label: 'Syscoin Mainnet',
      url: 'https://blockbook.elint.services/',
      default: true,
      currency: 'sys',
      apiUrl: '',
      explorer: 'https://blockbook.elint.services/',
      slip44: 57,
    },
    5700: {
      chainId: 5700,
      label: 'Syscoin Testnet',
      url: 'https://blockbook-dev.elint.services/',
      default: true,
      currency: 'tsys',
      apiUrl: '',
      explorer: '',
      slip44: 5700,
    },
  },
  ethereum: {
    1: {
      chainId: 1,
      url: 'https://rpc.ankr.com/eth',
      label: 'Ethereum Mainnet',
      default: true,
      currency: 'eth',
      explorer: 'https://etherscan.io/',
      apiUrl: 'https://api.etherscan.io/api',
    },
    137: {
      chainId: 137,
      currency: 'matic',
      default: true,
      label: 'Polygon Mainnet',
      url: 'https://polygon-rpc.com',
      apiUrl: 'https://api.polygonscan.com/api',
      explorer: 'https://polygonscan.com/',
    },
    80001: {
      chainId: 80001,
      currency: 'matic',
      default: true,
      label: 'Mumbai Testnet',
      url: 'https://endpoints.omniatech.io/v1/matic/mumbai/public',
      apiUrl: 'https://api-testnet.polygonscan.com/api',
      explorer: 'https://mumbai.polygonscan.com/',
    },
    57: {
      chainId: 57,
      currency: 'sys',
      default: true,
      label: 'Syscoin NEVM',
      url: 'https://rpc.syscoin.org',
      apiUrl: 'https://explorer.syscoin.org/api',
      explorer: 'https://explorer.syscoin.org/',
    },
    5700: {
      chainId: 5700,
      currency: 'tsys',
      default: true,
      label: 'Tanenbaum Testnet',
      url: 'https://rpc.tanenbaum.io',
      apiUrl: 'https://tanenbaum.io/api',
      explorer: 'https://tanenbaum.io/',
    },
  },
};

export const initialWalletState: IWalletState = {
  accounts: {
    [KeyringAccountType.HDAccount]: {
      [initialActiveHdAccountState.id]: initialActiveHdAccountState,
    },
    [KeyringAccountType.Imported]: {
      [initialActiveImportedAccountState.id]: initialActiveImportedAccountState,
    },
    [KeyringAccountType.Trezor]: {
      [initialActiveTrezorAccountState.id]: initialActiveTrezorAccountState,
    },
  },
  activeAccountId: 0,
  activeAccountType: KeyringAccountType.HDAccount,
  networks: initialNetworksState,
  activeNetwork: {
    chainId: 57,
    label: 'Syscoin Mainnet',
    url: 'https://blockbook.elint.services/',
    default: true,
    currency: 'sys',
  },
};
