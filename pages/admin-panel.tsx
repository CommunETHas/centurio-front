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
          <div className="p-6 w-full h-2/3">
            <div className="px-3 py-2 bg-secondary w-full h-full rounded-lg">
              <span>Assets:</span>
              {assets.map((asset) => (
                <div
                  className="w-full"
                  onClick={() => assetClicked(asset)}
                  key={asset.address}
                >
                  <span className="cursor-pointer">{asset.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 w-full h-1/3">
            <div className="px-3 py-2 bg-secondary w-full h-full rounded-lg">
              <span>Chains:</span>
            </div>
          </div>
        </div>
        <div className="h-full w-3/5 border-secondary border rounded-lg">
          <ReactFlow elements={elements} onConnect={onConnect} />
        </div>
        <div className="p-6 h-full w-1/5">
          <div className="px-3 py-2 bg-secondary w-full h-full rounded-lg">
            <span>Protocols:</span>
            {protocols.map((protocol) => (
              <div
                className="w-full"
                onClick={() => protocolClicked(protocol)}
                key={protocol.address}
              >
                <span className="cursor-pointer">{protocol.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
