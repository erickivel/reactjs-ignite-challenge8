import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = null }) => {
      return api.get('/api/images', {
        params: {
          after: pageParam || '',
        },
      });
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.data.after ? lastPage.data.after : undefined;
      },
    }
  );

  const formattedData = useMemo(() => {
    const unflattenedData = data?.pages.map(page => {
      return page.data.data.flat(image => {
        return {
          ...image,
        };
      });
    });

    const flatData = unflattenedData?.flat();

    return flatData;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button mt="2.5rem" onClick={() => fetchNextPage()} type="button">
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
