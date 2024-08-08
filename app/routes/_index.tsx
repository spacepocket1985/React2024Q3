import type { MetaFunction } from '@remix-run/node';
import { SearchPage } from 'src/pages/SearchPage';

import { json, LoaderFunction } from '@remix-run/node';
import { getAllCharacters, getCharacter } from 'src/service/getData';

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const filter = url.searchParams.get('filter') || '';
  const page = Number(url.searchParams.get('pageNum')) || 1;
  const details = url.searchParams.get('details') || '';

  const data = await getAllCharacters(filter, page);
  let responseWithDetails = null;
  if (data && details) {
    const index = Number(details);
    if (index >= 0 && index <= data.сharacters.length) {
      const characterId = data.сharacters[index-1].id;

      responseWithDetails = await getCharacter(characterId);
    }
  }

  return json({data, responseWithDetails});
};

export const meta: MetaFunction = () => {
  return [
    { title: 'PotterDB API' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return <SearchPage />;
}
