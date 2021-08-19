interface Chain {
  id: number;
  name: string;
}

export interface Assets {
  address: string;
  name: string;
  logoUrl: string;
}

export interface Protocol {
  address: string;
  name: string;
  logoUrl: string;
}

export const chain: Chain[] = [
  {
    id: 1,
    name: 'Ethereum',
  },
  {
    id: 2,
    name: 'Polygon',
  },
  {
    id: 3,
    name: 'Kovan',
  },
];

export const assets: Assets[] = [
  {
    address: '0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3b',
    name: 'NXM',
    logoUrl: 'https://etherscan.io/token/images/nxm_32.png',
  },
  {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    name: 'DAI',
    logoUrl: 'https://etherscan.io/token/images/MCDDai_32.png',
  },
  {
    address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    name: 'Curve DAO Token',
    logoUrl: 'https://etherscan.io/token/images/Curvefi_32.png',
  },
];

export const protocols: Protocol[] = [
  {
    address: '0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3c',
    name: 'Balancer V2',
    logoUrl: 'https://app.nexusmutual.io/logos/balancer.svg',
  },
  {
    address: '0x6b175474e89094c44da98b954eedeac495271d1f',
    name: 'Crypto.com',
    logoUrl: 'https://app.nexusmutual.io/logos/crypto-com.svg',
  },
  {
    address: '0xD533a949740bb3306d119CC777fa900bA034cd92',
    name: 'Alpha Homora V2',
    logoUrl: 'https://app.nexusmutual.io/logos/alpha-homora.jpg',
  },
];
