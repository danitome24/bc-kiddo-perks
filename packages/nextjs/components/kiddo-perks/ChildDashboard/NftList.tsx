import React from "react";
import Image from "next/image";

interface NftItem {
  id: string;
  image: string;
  name: string;
  description: string;
  cost: number; // Cost in KDO tokens
  isMinted: boolean; // Indicates if the NFT is already minted by the user
  canBeMinted: boolean; // Determines if the user has enough tokens to mint
}

interface NftListProps {
  availableNfts: NftItem[];
  onMint: (nftId: string) => void; // Callback to handle NFT minting
}

export const NftList: React.FC<NftListProps> = ({ availableNfts, onMint }) => {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-secondary">Available NFTs</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {availableNfts.map(nft => (
          <div key={nft.id} className="flex items-center bg-base-200 rounded-lg shadow-md p-4">
            <Image
              width={20}
              height={20}
              src={nft.image}
              alt={nft.name}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-primary font-semibold text-md">{nft.name}</h3>
              <p className="text-neutral text-sm">{nft.description}</p>
              <div className="mt-2">
                <span className="badge badge-secondary">Cost: {nft.cost} KDO</span>
              </div>
            </div>
            <div className="ml-4">
              {nft.isMinted ? (
                <button className="btn btn-disabled btn-success">Minted</button>
              ) : nft.canBeMinted ? (
                <button className="btn btn-primary btn-sm" onClick={() => onMint(nft.id)}>
                  Mint
                </button>
              ) : (
                <button className="btn btn-disabled btn-sm">Cannot Mint</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
