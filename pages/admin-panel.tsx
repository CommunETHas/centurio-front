import React, { ReactElement, useContext, useEffect, useState } from 'react';
import ReactFlow, { Elements, FlowElement, addEdge } from 'react-flow-renderer';
import {
  assets,
  protocols,
  Protocol,
  Assets,
} from '../api/fakeData/fakeAdminPanelData';
import HttpRequest from '../api/api';
import { EthContext } from '../contexts/EthContext';
import { EthContextType } from '../api/models/user';
import Image from 'next/image';
import Search from '../public/icons/search.svg';
import Token from '../api/models/token';
import Help from '../public/icons/help_black.svg';
import ImageWithFallBack from '../components/Image/ImageWithFallBack';
import { RecommendationCover } from '../api/models/cover';

export default function AdminPanel(): ReactElement {
  const [elements, setElements] = useState<Elements>([]);
  const onConnect = (params: any) =>
    setElements((els: any) => addEdge(params, els));
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [allCovers, setAllCovers] = useState<RecommendationCover[]>([]);
  const [filteredCovers, setFilteredCovers] = useState<RecommendationCover[]>(
    [],
  );

  const assetClicked = (asset: Token) => {
    const newAssetNode: FlowElement = {
      id: asset.address,
      position: { x: 450, y: 25 },
      data: { label: asset.name },
    };
    const newElementList = elements.concat(newAssetNode);
    setElements(newElementList);
  };

  const protocolClicked = (protocol: Protocol) => {
    const newProtocolNode: FlowElement = {
      id: protocol.address,
      position: { x: 650, y: 25 },
      data: { label: protocol.name },
      type: 'output',
    };

    const newElementList = elements.concat(newProtocolNode);
    setElements(newElementList);
  };

  const getTokens = async () => {
    try {
      const { data } = await HttpRequest.getTokens();
      setAllTokens(data);
      setFilteredTokens(data);
    } catch {
      console.log('error get tokens');
    }
  };

  const getCovers = async () => {
    try {
      const { data } = await HttpRequest.getCovers();
      setAllCovers(data);
      setFilteredCovers(data);
    } catch {
      console.log('error get tokens');
    }
  };

  const filterToken = (filter: string) => {
    setFilteredTokens(
      allTokens.filter(
        (token: Token) =>
          token.name.toLowerCase().indexOf(filter.toLowerCase()) != -1,
      ),
    );
  };

  const filterCover = (filter: string) => {
    setFilteredCovers(
      allCovers.filter(
        (cover: RecommendationCover) =>
          cover.name.toLowerCase().indexOf(filter.toLowerCase()) != -1,
      ),
    );
  };

  useEffect(() => {
    void getTokens();
    void getCovers();
  }, []);

  return (
    <div className="w-screen flex flex-grow bg-primary">
      <div className="h-full w-full relative">
        <div className="absolute left-0 z-10 h-full w-1/5 flex flex-col gap-3 pb-2">
          <div className="w-full h-2/3 relative flex flex-col">
            <span className="ml-1 text-secondary font-semibold">
              {'Assets:'}
            </span>
            <div className="flex-grow flex flex-col w-full relative rounded-r-lg bg-secondary container-scroll overflow-auto">
              <div className="fixed z-10 w-1/5">
                <div className="bg-secondary flex flex-row w-full items-center px-1 py-2 rounded-tr-lg">
                  <input
                    placeholder="search..."
                    className="bg-secondaryShadow rounded-lg w-full px-2 focus:outline-none"
                    onChange={(e) => filterToken(e.target.value)}
                  />
                  <div className="bg-secondaryShadow rounded-r-lg h-6 w-6 absolute right-1">
                    <Image
                      src={Search}
                      alt="help"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-grow flex-col w-full mt-10">
                {filteredTokens.map((token) => (
                  <div
                    className="w-full flex flex-row gap-x-2 mt-1 cursor-pointer"
                    onClick={() => assetClicked(token)}
                    key={token.address}
                  >
                    <div className="h-6 w-6 relative">
                      <ImageWithFallBack
                        src={token.logoUrl}
                        fallbackSrc={Help}
                        alt="unreconizedAssets"
                      />
                    </div>
                    <span className="font-semibold">{token.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-1/3 relative flex flex-col">
            <span className="ml-1 text-secondary font-semibold">Chain: </span>
            <div className="flex-grow relative">
              <div className="px-3 py-2 h-full relative rounded-r-lg bg-secondary" />
            </div>
          </div>
        </div>
        <div className="absolute right-0 h-full w-1/5 pb-2 z-10">
          <div className="pb-2 w-full h-full flex flex-col relative">
            <span className="ml-1 text-secondary font-semibold">
              {'Protocols:'}
            </span>
            <div className="flex flex-grow relative rounded-lg bg-secondary container-scroll overflow-auto">
              <div className="fixed z-10 w-1/5">
                <div className="bg-secondary flex flex-row w-full items-center px-1 py-2 rounded-tl-lg">
                  <input
                    placeholder="search..."
                    className="bg-secondaryShadow rounded-lg w-full px-2 focus:outline-none"
                    onChange={(e) => filterCover(e.target.value)}
                  />
                  <div className="bg-secondaryShadow rounded-r-lg h-6 w-6 absolute right-1">
                    <Image
                      src={Search}
                      alt="help"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-grow flex-col w-full mt-10 pl-2">
                {filteredCovers.map((cover) => (
                  <div
                    className="w-full flex flex-row gap-x-2 mt-1 cursor-pointer"
                    onClick={() => protocolClicked(cover)}
                    key={cover.address}
                  >
                    <div className="h-6 w-6 relative">
                      <ImageWithFallBack
                        src={cover.logoUrl}
                        fallbackSrc={Help}
                        alt="unreconizedProtocol"
                      />
                    </div>
                    <span className="font-semibold">{cover.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ReactFlow elements={elements} onConnect={onConnect} />
      </div>
    </div>
  );
}

// {protocols.map((protocol) => (
//   <div
//     className="w-full flex flex-row gap-x-2 mt-1 cursor-pointer"
//     onClick={() => protocolClicked(protocol)}
//     key={protocol.address}
//   >
//     <div className="h-6 w-6 content relative">
//       <Image
//         src={protocol.logoUrl}
//         alt="shield"
//         layout="fill"
//         objectFit="contain"
//       />
//     </div>
//     <span className="font-semibold">{protocol.name}</span>
//   </div>
// ))}
