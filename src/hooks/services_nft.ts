import { fetcher } from '@/utils/swr';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export const useGetNftByHash = () => {
  const [items, setItems] = useState<Record<string, any>>({
    image: '',
    brand: '',
    name: '',
    description: '',
    price: '',
    usdPrice: '',
    tokenAddress: '',
    walletAddress: '',
    is_listed: false,
    attributes: [],
    royaltiesPercentage: '',
  });
  const [tokenAddress, setTokenAddress] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/v1/api/nft?tokenAddress=${tokenAddress}`,
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      if (Object.keys(_data).length) {
        const _transformed = [_data].map((item: any) => {
          const manifest = item?.splNftInfo?.data?.manifest;
          return {
            image: manifest?.image,
            brand: manifest?.collection?.family,
            name: manifest?.name,
            description: manifest?.description,
            price: item?.nftListings?.length
              ? item?.nftListings[0].solPrice
              : '',
            usdPrice: item?.nftListings?.length
              ? item?.nftListings[0].usdPrice
              : '',
            tokenAddress: item?.tokenAddress,
            walletAddress: item?.splNftInfo?.walletAddress,
            is_listed: item?.nftListings?.length,
            attributes:
              manifest?.attributes.map((item: any) => ({
                traitType: item.trait_type,
                value: item.value,
              })) || [],
            royaltiesPercentage: manifest?.seller_fee_basis_points / 100,
          };
        })[0];
        setItems(_transformed);
      }
    }
  }, [data]);

  return {
    setTokenAddress,
    data: items,
    loading: isValidating,
    refresh: mutate,
    error,
  };
};

export const useGetNftByHashV2 = () => {
  const [items, setItems] = useState<Record<string, any>>({
    image: '',
    brand: '',
    name: '',
    description: '',
    price: '',
    usdPrice: '',
    tokenAddress: '',
    walletAddress: '',
    is_listed: false,
    attributes: [],
    royaltiesPercentage: '',
  });
  const [tokenAddress, setTokenAddress] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/v2/api/nft?tokenAddress=${tokenAddress}`,
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      if (Object.keys(_data).length) {
        const _transformed = [_data].map((item: any) => {
          const manifest = item?.splNftInfo?.data?.manifest;
          return {
            image: manifest?.image,
            brand: manifest?.collection?.family,
            name: manifest?.name,
            description: manifest?.description,
            price: item?.nftListings?.length
              ? item?.nftListings[0].solPrice
              : '',
            usdPrice: item?.nftListings?.length
              ? item?.nftListings[0].usdPrice
              : '',
            tokenAddress: item?.tokenAddress,
            walletAddress: item?.splNftInfo?.walletAddress,
            is_listed: item?.nftListings?.length,
            attributes:
              manifest?.attributes.map((item: any) => ({
                traitType: item.trait_type,
                value: item.value,
              })) || [],
            royaltiesPercentage: manifest?.seller_fee_basis_points / 100,
          };
        })[0];
        setItems(_transformed);
      }
    }
  }, [data]);

  return {
    setTokenAddress,
    data: items,
    loading: isValidating,
    refresh: mutate,
    error,
  };
};

export const useGetNftTransactionsByHashV2 = () => {
  const [items, setItems] = useState<string[][]>([]);
  const [tokenAddress, setTokenAddress] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/v2/api/nft/transaction?tokenAddress=${tokenAddress}`,
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      const _transformed = _data.map((item: any) => {
        return [
          item?.recipientAddress ? 'Transfer' : 'Listing or Cancel',
          item?.senderAddress || '',
          item?.recipientAddress || '',
          item?.createdAt || '',
          item?.amountUsd || '',
        ];
      });
      console.log(_transformed);
      setItems(_transformed);
    }
  }, [data]);

  return {
    setTokenAddress,
    data: items,
    loading: isValidating,
    refresh: mutate,
    error,
  };
};
