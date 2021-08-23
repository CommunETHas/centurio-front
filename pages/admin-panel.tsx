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
import ShieldLogo from '../public/logo_shield_variant_ternary.png';
import Search from '../public/icons/search.svg';

export default function AdminPanel(): ReactElement {
  const [elements, setElements] = useState<Elements>([]);
  const onConnect = (params: any) => setElements((els) => addEdge(params, els));

  const assetClicked = (asset: Assets) => {
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

  return (
    <div className="w-screen bg-primary flex-grow">
      <div className="flex flex-row w-full h-full">
        <div className="h-full w-1/5 flex flex-col">
          <div className="px-6 pb-10 w-full h-2/3">
            <span className="font-semibold text-secondary">Assets:</span>
            <div className="w-full h-full rounded-lg relative">
              <div className="absolute w-full h-full -right-1 -bottom-1 bg-secondaryShadow border border-secondary rounded-lg" />
              <div className="px-3 py-2 h-full relative rounded-lg bg-secondary">
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
                {assets.map((asset) => (
                  <div
                    className="w-full flex flex-row gap-x-2 mt-1 cursor-pointer"
                    onClick={() => assetClicked(asset)}
                    key={asset.address}
                  >
                    <div className="h-6 w-6 content relative">
                      <Image
                        src={asset.logoUrl}
                        alt="shield"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span className="font-semibold">{asset.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-6 pb-10 w-full h-1/3">
            <span className="font-semibold text-secondary">Chains:</span>
            <div className="bg-secondary w-full h-full rounded-lg relative">
              <div className="absolute w-full h-full -right-1 -bottom-1 bg-secondaryShadow border border-secondary rounded-lg" />
              <div className="px-3 py-2 h-full relative rounded-lg bg-secondary"></div>
            </div>
          </div>
        </div>
        <div className="h-full w-3/5 border-secondary border rounded-lg">
          <ReactFlow elements={elements} onConnect={onConnect} />
        </div>
        <div className="px-6 pb-10 h-full w-1/5">
          <span className="font-semibold text-secondary">Protocols:</span>
          <div className="w-full h-full rounded-lg relative">
            <div className="absolute w-full h-full -right-1 -bottom-1 bg-secondaryShadow border border-secondary rounded-lg" />
            <div className="px-3 py-2 h-full relative rounded-lg bg-secondary">
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
              {protocols.map((protocol) => (
                <div
                  className="w-full flex flex-row gap-x-2 mt-1 cursor-pointer"
                  onClick={() => protocolClicked(protocol)}
                  key={protocol.address}
                >
                  <div className="h-6 w-6 content relative">
                    <Image
                      src={protocol.logoUrl}
                      alt="shield"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <span className="font-semibold">{protocol.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
