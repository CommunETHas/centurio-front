import React from 'react';
import { NodeEditor, FlumeConfig, Colors, Controls } from 'flume';

const config = new FlumeConfig();
config
  .addPortType({
    type: 'string',
    name: 'string',
    label: 'port',
    color: Colors.green,
    controls: [
      Controls.text({
        name: 'string',
        label: 'Text',
      }),
    ],
  })
  .addNodeType({
    type: 'cover',
    label: 'Cover',
    description: 'Cover description',
    inputs: (ports) => [ports.string()],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: 'token',
    label: 'Token',
    description: 'Token',
    inputs: (ports) => [ports.string()],
    outputs: (ports) => [ports.string()],
  });

const CoversAdministrationView = () => (
    <main className="relative mb-auto h-screen w-screen overflow-auto">
      <div className="mb-10 mt-10 mr-4 z-10 absolute inset-y-0 right-0 w-60 rounded-sm bg-secondary" />
      <div className="flex mb-10 mt-10 ml-4 z-10 absolute inset-y-0 left-0 bottom-0 h-8 w-80 rounded-sm">
        <button
          type="button"
          className="relative z-10 h-full w-full py-1 rounded-full mr-4"
        >
          <div className="absolute text-xs font-bold text-primary bg-secondary pt-1 h-full w-full bottom-0 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1">
            Chain
          </div>
          <div className="absolute bg-transparent focus:outline-none h-full w-full bottom-0 border border-white rounded-full transform translate-x-1 translate-y-1" />
        </button>
        <button
          type="button"
          className="relative z-10 h-full w-full py-1 rounded-full"
        >
          <div className="absolute text-xs font-bold text-primary bg-secondary pt-1 h-full w-full bottom-0 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1">
            Asset
          </div>
          <div className="absolute bg-transparent focus:outline-none h-full w-full bottom-0 border border-white rounded-full transform translate-x-1 translate-y-1" />
        </button>
      </div>
      <NodeEditor nodeTypes={config.nodeTypes} portTypes={config.portTypes} />
    </main>
  );

export default CoversAdministrationView;
