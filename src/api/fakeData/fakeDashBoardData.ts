import DashboardData from '../models/cover';

const data: DashboardData = {
  count: 0,
  recommendations: [
    {
      cover: {
        name: 'Aave',
        address: '0x000',
        type: 'protocol',
        supportedChains: ['ethereum'],
        logo: 'https://app.nexusmutual.io/logos/aavev2.svg',
      },
      reasoning: [
        {
          token: 'Tusd',
          logoUrl:
            'https://centurio.blob.core.windows.net/asset/0x0000000000085d4780B73119b644AE5ecd22b376.png',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        },
        {
          token: 'KAKA',
          logoUrl:
            'https://centurio.blob.core.windows.net/asset/0x0000852600CEB001E08e00bC008be620d60031F2.png',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        },
      ],
    },
  ],
  unsuportedTokens: [
    {
      name: 'USD',
      address: '0x00000000008943c65cAf789FFFCF953bE156f6f8',
      symbol:
        'https://centurio.blob.core.windows.net/asset/0x00000000008943c65cAf789FFFCF953bE156f6f8.png',
      owner: 'string',
      logoUrl: 'test'
    },
    {
      name: 'eAAve',
      address: '0x00000000008943c65cAf789FFFCF953bE156f6f8',
      symbol:
        'https://centurio.blob.core.windows.net/asset/0x00A79FF8fff20331B9DF63fC6f92eb7D9991C223.png',
      owner: 'string',
      logoUrl: 'test'
    },
    {
      name: 'Chtoken',
      address: '0x00000000008943c65cAf789FFFCF953bE156f6f8',
      symbol:
        'https://centurio.blob.core.windows.net/asset/0x009a7c8B62Ec98f734FdE06904Def69E95898726.png',
      owner: 'string',
      logoUrl: 'test'
    },
    {
      name: 'Ikkk',
      address: '0x00000000008943c65cAf789FFFCF953bE156f6f8',
      symbol:
        'https://centurio.blob.core.windows.net/asset/0x00B7db6B4431e345eee5cc23D21E8dbC1d5cADA3.png',
      owner: 'string',
      logoUrl: 'test'
    },
    {
      name: 'LTOP',
      address: '0x00000000008943c65cAf789FFFCF953bE156f6f8',
      symbol:
        'https://centurio.blob.core.windows.net/asset/0x00D270d9A41886A8E6E433911AE2F7D257b60051.png',
      owner: 'string',
      logoUrl: 'test'
    },
  ],
};

export default data;
