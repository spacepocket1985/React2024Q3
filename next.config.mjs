/** @type {import('next').NextConfig} */  
const nextConfig = {  
  distDir: './dist',  
  images: {  
    remotePatterns: [  
      {  
        protocol: 'https',  
        hostname: '**.wikia.nocookie.net', 
        port: '', 
        pathname: '/**', 
      },  
    ],  
  }, 
  typescript: {
    ignoreBuildErrors: true,
  }, 

};  

export default nextConfig;