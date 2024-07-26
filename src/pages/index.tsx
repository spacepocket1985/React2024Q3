export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/SearchPage',
      permanent: false, 
    },
  };
}

export default function Home() {
  return null;
}
