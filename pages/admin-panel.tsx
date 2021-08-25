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

export default function AdminPanel(): ReactElement {
  const [elements, setElements] = useState<Elements>([]);
  const onConnect = (params: any) =>
    setElements((els: any) => addEdge(params, els));
  const [allTokens, setAllTokens] = useState<Token[]>([]);

  const assetClicked = (asset: Token) => {
    const newAssetNode: FlowElement = {
      id: asset.address,
      position: { x: 250, y: 25 },
      data: { label: asset.name },
    };
    const newElementList = elements.concat(newAssetNode);
    setElements(newElementList);
  };

  const protocolClicked = (protocol: Protocol) => {
    const newProtocolNode: FlowElement = {
      id: protocol.address,
      position: { x: 250, y: 25 },
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
    } catch {
      console.log('error get tokens');
    }
  };

  useEffect(() => {
    void getTokens();
  }, []);

  return (
    <div className="w-screen h-full bg-primary">
      <div className="h-full w-full relative">
        <div className="absolute flex flex-row w-full h-full z-40">
          <div className="h-full w-1/5 flex flex-col gap-3 pl-2 pb-2">
            <div className="w-full h-2/3 relative flex flex-col">
              <span className="text-secondary font-semibold">Assets: </span>
              <div className="flex-auto relative">
                <div className="absolute w-full h-full -right-1 -bottom-1 bg-secondaryShadow border border-secondary rounded-lg" />
                <div className="px-3 py-2 h-full relative rounded-lg bg-secondary flex flex-col">
                  <div className="w-full flex flex-row relative items-center">
                    <input
                      placeholder="search..."
                      className="bg-secondaryShadow rounded-lg w-full px-2 my-1 focus:outline-none"
                    />
                    <div className="bg-secondaryShadow rounded-r-lg h-6 w-6 absolute right-0">
                      <Image
                        src={Search}
                        alt="help"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <div className="bg-ternary w-full overflow-hidden">
                    <div className="flex flex-col">
                      {allTokens.map((token) => (
                        <div
                          className="w-full flex flex-row gap-x-2 mt-1 cursor-pointer"
                          onClick={() => assetClicked(token)}
                          key={token.address}
                        >
                          <div className="h-6 w-6 content relative">
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
              </div>
            </div>
            <div className="w-full h-1/3 relative flex flex-col">
              <span className="text-secondary font-semibold">Chain: </span>
              <div className="flex-auto relative">
                <div className="absolute w-full h-full -right-1 -bottom-1 bg-secondaryShadow border border-secondary rounded-lg" />
                <div className="px-3 py-2 h-full relative rounded-lg bg-secondary" />
              </div>
            </div>
          </div>
          <div className="h-full w-3/5" />
          <div className="h-full w-1/5 relative pr-3 pb-2">
            <div className="w-full h-full relative flex flex-col">
              <span className="text-secondary font-semibold">Assets: </span>
              <div className="flex-auto relative">
                <div className="absolute w-full h-full -right-1 -bottom-1 bg-secondaryShadow border border-secondary rounded-lg" />
                <div className="px-3 py-2 h-full relative rounded-lg bg-secondary" />
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
