/** @type {import('next').NextConfig} */
const nextConfig = {
  // Les pages publiques restent générées statiquement et ne posent aucun cookie.
  // Seules les routes de /admin et /api/admin tournent côté serveur : le mot de
  // passe ne doit jamais atteindre le navigateur.
  // Une URL par dossier, pour que /classement/ et /classement se comportent pareil.
  trailingSlash: true,
  images: {
    // L'optimiseur d'images de Next a besoin d'un serveur : en export statique,
    // les images sont optimisées en amont (WebP, 1200 px de large au maximum).
    unoptimized: true,
  },
};

export default nextConfig;
