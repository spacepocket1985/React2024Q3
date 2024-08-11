export async function getServerSideProps(): Promise<{
  redirect: {
      destination: string;
      permanent: boolean;
  };
}> {
  return {
    redirect: {
      destination: '/SearchPage',
      permanent: false, 
    },
  };
}

export default function Home(): null {
  return null;
}
