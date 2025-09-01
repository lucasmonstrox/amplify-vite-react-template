/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@aws-amplify/ui-react"],
  },
  // Configuração para o Amplify
  trailingSlash: false,
  // Desabilitar otimização de imagens se não estiver usando
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
