/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site statique : pas de serveur, pas de base de données, pas de cookie.
  output: 'export',
  // Une URL par dossier, pour que /classement/ et /classement se comportent pareil.
  trailingSlash: true,
  images: {
    // L'optimiseur d'images de Next a besoin d'un serveur : en export statique,
    // les images sont optimisées en amont (WebP, 1200 px de large au maximum).
    unoptimized: true,
  },
};

export default nextConfig;
