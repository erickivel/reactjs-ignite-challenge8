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
    ({ pageParam = null }) =>
      api.get(
        `/api/images${pageParam ? `?after=${pageParam?.data.after}` : ''}`
      ),
    {
      getNextPageParam: (lastPage, pages) => {
        // console.log(lastPage);
        return lastPage || null;
      },
    }
  );

  const formattedData = useMemo(() => {
    const unflattenedData = data?.pages.map(page => {
      return page.data.data.map(image => {
        return {
          title: image.title,
          description: image.description,
          url: image.url,
          ts: image.ts,
          id: image.id,
        };
      });
    });

    const flatData = unflattenedData?.flat();

    return flatData;
  }, [data]);

  console.log(formattedData);

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
          <Button onClick={() => fetchNextPage()} type="button">
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
